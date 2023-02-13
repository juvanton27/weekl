import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { BehaviorSubject } from "rxjs";
import End from "../widgets/Weekl/FeedEnd";

import { currentSnackbar } from "../App";
import { findAllActiveUserIds } from "../services/stories.service";
import { currentProgress } from "../widgets/Weekl/Day";
import Weekl, { currentIndex } from "../widgets/Weekl/Weekl";

const { width, height } = Dimensions.get('window');


export const weeklIndex = new BehaviorSubject(0);
export const currentWeeklIndex = {
  increment: () => weeklIndex.next(weeklIndex.getValue() + 1),
  decrement: () => weeklIndex.next(weeklIndex.getValue() - 1),
  set: (v) => weeklIndex.next(v),
  onWeeklIndex: () => weeklIndex.asObservable(),
}

const Feed = () => {
  const [weeklIndexState, setWeeklIndexState] = useState(0);
  const [users, setUsers] = useState([]);
  let _feedview = useRef();

  const scrollToNextWeekl = () => {
    _feedview.current.scrollTo({ y: (weeklIndex.getValue() + 1) * height });
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
    findAllActiveUserIds().subscribe({
      next: res => setUsers(res), 
      error: err => {
        currentSnackbar.set({ type: 'ERROR', message: err.message })
      }
    })
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
        {users?.map((id, index) => (
          <Weekl key={id} user_id={id} w_index={index} scrollToNextWeekl={scrollToNextWeekl} />
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