import { Video } from 'expo-av';
import { useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { BehaviorSubject } from "rxjs";
import { currentIndex } from "./Weekl";

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
      onTouchStart={() => ref.current.pauseAsync()}
      onTouchEnd={() => ref.current.playAsync()}
      onPlaybackStatusUpdate={(e) => e.didJustFinish?currentIndex.increment():currentProgress.set(e.positionMillis/e.durationMillis)}
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