import { Video } from 'expo-av';
import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { BehaviorSubject } from "rxjs";
import { pageIndex } from '../../App';
import { currentIndex, story } from "./Weekl";

const { width, height } = Dimensions.get('window');

export const progress = new BehaviorSubject(0);
export const currentProgress = {
  set: (p) => progress.next(p),
  onProgress: () => progress.asObservable(),
}

const Day = ({ visible, currentStory }) => {
  const ref = useRef();
  const [video, setVideo] = useState(undefined);

  const onPlaybackStatusUpdate = (e) => {
    if (e.didJustFinish) {
      currentIndex.increment()
    } else {
      currentProgress.set(e.positionMillis / e.durationMillis)
    }
  }

  const tempVideoSource = (video) => {
    console.log(video);
    switch (video) {
      case '../assets/videos/01.mp4': return require('../../assets/videos/01.mp4');
      case '../assets/videos/02.mp4': return require('../../assets/videos/02.mp4');
      case '../assets/videos/03.mp4': return require('../../assets/videos/03.mp4');
      case '../assets/videos/04.mp4': return require('../../assets/videos/04.mp4');
      case '../assets/videos/05.mp4': return require('../../assets/videos/05.mp4');
      case '../assets/videos/06.mp4': return require('../../assets/videos/06.mp4');
      case '../assets/videos/07.mp4': return require('../../assets/videos/07.mp4');
      default: return require('../../assets/videos/01.mp4');
    }
  }

  useEffect(() => {
    currentStory?.onStory().subscribe(
      story => setVideo(tempVideoSource(story?.video))
    )
  }, [])

  return (
    <Video
      ref={ref}
      style={styles.container}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      source={video}
      resizeMode='cover'
      shouldPlay={visible && pageIndex.getValue() === 2}
      positionMillis={0}
      onTouchStart={() => ref.current.pauseAsync()}
      onTouchEnd={() => ref.current.playAsync()}
      onPlaybackStatusUpdate={onPlaybackStatusUpdate}
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