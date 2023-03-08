import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Animated } from "react-native";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { currentSnackbar } from "../../App";
import { findUserById } from "../../services/users.service";
import { capFirstLetter, isSameDay } from "../../utils/utils";
import { currentProgress } from "./Day";

const { width, height } = Dimensions.get('window');

// Sets the label of the days on a Weekl
const today = new Date();
const days = [
  { date: new Date(today.getTime() - (86400000 * 6)) },
  { date: new Date(today.getTime() - (86400000 * 5)) },
  { date: new Date(today.getTime() - (86400000 * 4)) },
  { date: new Date(today.getTime() - (86400000 * 3)) },
  { date: new Date(today.getTime() - (86400000 * 2)) },
  { date: new Date(today.getTime() - (86400000 * 1)) },
  { date: new Date(today.getTime()) },
]

/**
 * Handle the width of the progress bar
 * @param {*} progress the progress from 0 to 1
 * @param {*} storyToCompare the progressbar of a given story
 * @param {*} props the props of main component {visible, video}
 * @param {*} length the length of the stories in the current weekl
 * @returns 0 if not played yet, [0...99] if currently playing, 100 if already played/passed
 */
const handleProgressBar = (progress, storyToCompare, visible, story, length) => {
  if (!isNaN(progress) && visible && new Date(story?.date).getTime() >= new Date(storyToCompare.date).getTime()) {
    if (story?.uid === storyToCompare.uid)
      return progress * width / (length * 1.5);
    if (new Date(story?.date).getTime() > new Date(storyToCompare.date).getTime())
      return width / (length * 1.5);
  }
  return 0;
}

/**
 * Component that contains all the informations of a weekl
 * such as the user, the progress of the video, the number of video, etc.
 * @param {*} user_id the id of the user
 * @param {*} visible if the weekl is visible on screen
 * @param {*} handleDayClick function the handle a day click by the user (parent function)
 * @param {*} currentStories the current stories that contains the weekl
 * @param {*} currentStory the current story that is currently playing in the weekl
 * @returns 
 */
const WeeklInfo = ({ user_id, visible, handleDayClick, currentStories, currentStory }) => {
  const [user, setUser] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [story, setStory] = useState(undefined);
  const [stories, setStories] = useState([]);
  const length = stories?.filter(s => isSameDay(new Date(s.date), new Date(story?.date))).length;

  useEffect(() => {
    findUserById(user_id).subscribe({
      next: u => setUser(u),
      error: () => currentSnackbar.set({ type: 'ERROR', message: 'User not found' })
    });
    currentStories.onStories().subscribe(setStories);
    currentStory.onStory().subscribe(setStory);
    currentProgress.onProgress().subscribe(setProgress);
  }, []);

  return (
    <LinearGradient
      style={styles.container}
      colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
    >
      <Image
        style={styles.picture}
        source={user?.picture ? { uri: user?.picture } : require('../../assets/pictures/default.jpg')}
        resizeMode='cover'
      />
      <View style={styles.infos}>
        <Text style={styles.username}>@{user?.username}</Text>
        <View style={styles.barContainer}>
          {
            stories.filter(s => isSameDay(new Date(s.date), new Date(story?.date))).map((s, i) =>
              <View key={i} style={{ ...styles.bar, width: width / (length * 1.5) }}>
                <Animated.View style={{ ...styles.progress, width: handleProgressBar(progress, s, visible, story, length) }}></Animated.View>
              </View>
            )
          }
        </View>
        <ScrollView
          style={styles.days}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {
            days.map((d, index) => (
              <View
                key={index}
                style={{ ...styles.bubble, backgroundColor: isSameDay(new Date(story?.date), d.date) ? 'white' : 'rgba(255,255,255,0.5)' }}
                onTouchEnd={() => { handleDayClick(d) }}
              >
                <Text>{isSameDay(new Date(story?.date), d.date) ?
                  capFirstLetter(d.date.toLocaleDateString('fr-FR', { weekday: 'long' })) :
                  d.date.toLocaleDateString('fr-FR', { weekday: 'narrow' })}
                </Text>
              </View>
            ))
          }
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height: height / 6,
    bottom: 0,
    padding: 20,
    paddingBottom: 50,
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  picture: {
    width: 75,
    height: 75,
    borderRadius: 45,
    marginHorizontal: 5,
    zIndex: 2
  },
  infos: {
    flex: 1,
    justifyContent: 'space-between',
  },
  username: {
    // margin: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  barContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
  },
  bar: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 45,
    margin: 5,
  },
  progress: {
    backgroundColor: 'white',
    borderRadius: 45,
    height: 1,
  },
  days: {
    flexWrap: 'nowrap',
    flexDirection: "row",
    overflow: 'visible',
    marginVertical: 5,
  },
  bubble: {
    margin: 5,
    padding: 10,
    borderRadius: 45,
    height: 34,
    minWidth: 34,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default WeeklInfo;