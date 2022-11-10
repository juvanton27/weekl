import { createContext, useContext, useRef } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Video } from 'expo-av';
import { BehaviorSubject } from "rxjs";

const { width, height } = Dimensions.get('window');

export const progress = new BehaviorSubject(0);
export const currentProgress = {
  set: (p) => progress.next(p),
  onProgress: () => progress.asObservable(),
}

const Day = (props) => {
  const ref = useRef();
  return (
    <Video
      ref={ref}
      style={styles.container}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      source={props.video?.video}
      resizeMode='cover'
      shouldPlay={props.visible}
      positionMillis={0}
      isLooping
      onTouchStart={() => ref.current.pauseAsync()}
      onTouchEnd={() => ref.current.playAsync()}
      onPlaybackStatusUpdate={(e) => currentProgress.set(e.positionMillis/e.durationMillis)}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
});

export default Day;