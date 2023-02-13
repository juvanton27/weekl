import { useEffect, useState } from "react";
import { Dimensions, TouchableHighlight, View } from "react-native";
import { BehaviorSubject } from "rxjs";
import { currentSnackbar } from "../../App";
import { weeklIndex } from "../../pages/Feed";
import { findAllActiveStoriesByUserId } from "../../services/stories.service";
import { isSameDay } from "../../utils/utils";

import Day from "./Day";
import WeeklInfo from "./Info";

const { width, height } = Dimensions.get('window');

// Index of the weekl
const index = new BehaviorSubject(0);
export const currentIndex = {
  increment: () => index.next(index.getValue() + 1),
  decrement: () => index.next(index.getValue() - 1),
  set: (v) => index.next(v),
  onIndex: () => index.asObservable(),
}

const Weekl = ({ user_id, w_index, scrollToNextWeekl }) => {
  // Stories contained in the current weekl
  const stories = new BehaviorSubject([]);
  const currentStories = {
    set: s => stories.next(s),
    onStories: () => stories.asObservable()
  }

  // Current story in the current weekl
  const story = new BehaviorSubject(undefined);
  const currentStory = {
    set: s => story.next(s),
    onStory: () => story.asObservable()
  }

  // Goes to the first story of the day clicked
  const handleDayClick = (d) => {
    const story = stories.value?.find(s => isSameDay(d.date, new Date(s.date)));
    if (story) currentIndex.set(stories.value?.indexOf(story));
  }

  // Goes to next or previous story in the weekl
  const handleWeeklClick = (e) => {
    if (e.nativeEvent.locationX >= 75) {
      if (index.getValue() < stories.value?.length)
        currentIndex.increment();
    } else {
      if (index.getValue() > 0)
        currentIndex.decrement();
    }
  }

  // Checks if weekl displayed on screen
  const isVisible = () => {
    return weeklIndex.getValue() === w_index;
  }

  // Set new story based on index
  const set = (i) => {
    if (isVisible()) {
      if (stories.value[i]) {
        currentStory.set(stories.value[i]);
      } else {
        scrollToNextWeekl();
      }
    }
  }

  useEffect(() => {
    // Set current stories of the weekl
    findAllActiveStoriesByUserId(user_id).subscribe(s => {
      currentStories.set(s);
      currentIndex.set(index.value);
    });
    // Set current story id on weekl index change
    currentIndex.onIndex().subscribe({
      next: i => set(i),
      error: err => currentSnackbar.set({ type: 'ERROR', message: err.message })
    });
  }, []);

  return (
    <View>
      <TouchableHighlight onLongPress={() => { }} onPress={handleWeeklClick}>
        <Day visible={isVisible()} currentStory={currentStory} />
      </TouchableHighlight>
      <WeeklInfo user_id={user_id} visible={isVisible()} stories={stories} currentStory={currentStory} handleDayClick={handleDayClick} />
    </View>
  )
}

export default Weekl;