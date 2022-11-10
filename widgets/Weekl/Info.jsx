import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getActiveStoriesByUser } from "../../services/stories.service";
import { getUserById } from "../../services/users.service";
import { currentProgress } from "../Day";
import Weekl from "./Weekl";

const { width, height } = Dimensions.get('window');

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

const isSameDay = (date1, date2) => {
  return date1?.getFullYear() === date2?.getFullYear() &&
    date1?.getMonth() === date2?.getMonth() &&
    date1?.getDate() === date2?.getDate();
}

const capFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);;
}

const Info = (props) => {
  const user = getUserById(props.user);
  const [p, setP] = useState(0);

  useEffect(() => {
    currentProgress.onProgress().subscribe(pro => setP(pro));
  }, [])

  return (
    <LinearGradient
      style={styles.container}
      colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
    >
      <Image
        style={styles.picture}
        source={require('../../assets/pictures/01.jpeg')}
        resizeMode='cover'
      />
      <View style={styles.infos}>
        <Text style={styles.username}>@{user?.username}</Text>
        <View style={styles.bar}>
          <View style={{ ...styles.progress, width: !isNaN(p) && props.visible ? p * width / 1.5 : 0, height: 1 }}></View>
        </View>
        <ScrollView
          style={styles.days}
          horizontal
        >
          {
            days.map((d, index) => (
              <View
                key={index}
                style={{ ...styles.bubble, backgroundColor: isSameDay(props.video?.date, d.date) ? 'white' : 'rgba(255,255,255,0.5)' }}
                onTouchEnd={() => {props.handleDayClick(d)}}
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
    justifyContent: 'space-between'
  },
  username: {
    margin: 5,
    color: 'white',
    fontWeight: 'bold'
  },
  bar: {
    width: width / 1.5,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 45,
    margin: 5,
  },
  progress: {
    backgroundColor: 'white',
    borderRadius: 45
  },
  days: {
    flexWrap: 'nowrap',
    flexDirection: "row",
    overflow: 'visible'
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

export default Info;