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

const Weekl = ({ user_id, w_index, scrollToNextWeekl, scrollToPreviousWeekl }) => {
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
  const [storiesState, setStoriesState] = useState([]);

  // Goes to the first story of the day clicked
  const handleDayClick = (d) => {
    const story = storiesState.find(s => isSameDay(d.date, new Date(s.date)));
    if (story) currentIndex.set(storiesState.indexOf(story));
  }

  // Goes to next or previous story in the weekl
  const handleWeeklClick = (e) => {
    if (e.nativeEvent.locationX >= 75) {
      if (index.getValue() < storiesState.length)
        currentIndex.increment();
    } else {
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
        if (i !== -1) scrollToNextWeekl();
        else scrollToPreviousWeekl();
      }
    }
  }

  useEffect(() => {
    // Set current stories of the weekl
    findAllActiveStoriesByUserId(user_id).subscribe(s => {
      currentStories.set(s);
      currentStory.set(s[index.getValue()]);
    });
    // Set current story id on weekl index change
    currentIndex.onIndex().subscribe({
      next: i => set(i),
      error: err => currentSnackbar.set({ type: 'ERROR', message: err.message })
    });
    currentStories.onStories().subscribe(setStoriesState);
  }, []);

  return (
    <View>
      <TouchableHighlight onLongPress={() => { }} onPress={handleWeeklClick}>
        <Day visible={isVisible()} currentStory={currentStory} />
      </TouchableHighlight>
      <WeeklInfo user_id={user_id} visible={isVisible()} currentStories={currentStories} currentStory={currentStory} handleDayClick={handleDayClick} />
    </View>
  )
}

export default Weekl;