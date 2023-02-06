import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getUserById } from "../../services/users.service";
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
const handleProgressBar = (progress, storyToCompare, props, length) => {
  if (!isNaN(progress) && props.visible && props.video?.date.getTime() >= storyToCompare.date.getTime()) {
    if (props.video?.id === storyToCompare.id)
      return progress * width / (length * 1.5)
    if (props.video?.date.getTime() > storyToCompare.date.getTime())
      return width / (length * 1.5)
  }
  return 0;
}

const WeeklInfo = (props) => {
  const user = getUserById(props.user);
  const [progress, setProgress] = useState(0);
  const length = props.stories.filter(s => isSameDay(s.date, props.video?.date)).length;

  useEffect(() => {
    currentProgress.onProgress().subscribe(progress => setProgress(progress));
  }, []);

  return (
    <LinearGradient
      style={styles.container}
      colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
    >
      <Image
        style={styles.picture}
        source={{uri: user?.picture}}
        resizeMode='cover'
      />
      <View style={styles.infos}>
        <Text style={styles.username}>@{user?.username}</Text>
        <View style={styles.barContainer}>
          {props.stories.filter(s => isSameDay(s.date, props.video?.date)).map((s, i) =>
            <View key={i} style={{ ...styles.bar, width: width / (length * 1.5) }}>
              <View style={{ ...styles.progress, width: handleProgressBar(progress, s, props, length) }}></View>
            </View>
          )}
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
                style={{ ...styles.bubble, backgroundColor: isSameDay(props.video?.date, d.date) ? 'white' : 'rgba(255,255,255,0.5)' }}
                onTouchEnd={() => { props.handleDayClick(d) }}
              >
                <Text>{isSameDay(props.video?.date, d.date) ?
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