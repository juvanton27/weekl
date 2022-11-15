import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import End from "../widgets/Weekl/FeedEnd";
import { BehaviorSubject } from "rxjs";

import Weekl, { currentIndex } from "../widgets/Weekl/Weekl";
import { currentProgress } from "../widgets/Weekl/Day";

const { width, height } = Dimensions.get('window');


export const weeklIndex = new BehaviorSubject(0);
export const currentWeeklIndex = {
  increment: () => weeklIndex.next(weeklIndex.getValue() + 1),
  decrement: () => weeklIndex.next(weeklIndex.getValue() - 1),
  set: (v) => weeklIndex.next(v),
  onWeeklIndex: () => weeklIndex.asObservable(),
}

const Feed = (props) => {
  const [weeklIndexState, setWeeklIndexState] = useState(0);
  let _feedview = useRef();

  const scrollToNextWeekl = () => {
    _feedview.current.scrollTo({ y: (weeklIndex.getValue()+1)*height });
  }

  const onMomentumScrollEnd = (e) => {
    if (e.nativeEvent.contentOffset.y / height !== weeklIndexState) {
      currentProgress.set(0);
      currentIndex.set(0);
      currentWeeklIndex.set(e.nativeEvent.contentOffset.y / height);
    }
  }

  useEffect(() => {
    currentWeeklIndex.onWeeklIndex().subscribe(i => {
      setWeeklIndexState(i);
    });
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView
        ref={_feedview}
        style={{ height }}
        snapToInterval={height}
        decelerationRate='fast'
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {[0, 1, 2, 3].map((id, index) => (
          <Weekl key={id} user_id={id} index={index} scrollToNextWeekl={scrollToNextWeekl} />
        ))}
        <End />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
});

export default Feed;