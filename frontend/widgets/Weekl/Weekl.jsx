import { useEffect, useState } from "react";
import { Dimensions, TouchableHighlight, View } from "react-native";
import { BehaviorSubject } from "rxjs";
import { weeklIndex } from "../../pages/Feed";
import { getActiveStoriesByUser } from "../../services/stories.service";
import { isSameDay } from "../../utils/utils";

import Day from "./Day";
import WeeklInfo from "./Info";

const { width, height } = Dimensions.get('window');

const index = new BehaviorSubject(0);
export const currentIndex = {
  increment: () => index.next(index.getValue() + 1),
  decrement: () => index.next(index.getValue() - 1),
  set: (v) => index.next(v),
  onIndex: () => index.asObservable(),
}

const Weekl = (props) => {
  const stories = getActiveStoriesByUser(props.user_id);
  const [currentStory, setCurrentStory] = useState(stories[0]);

  const handleDayClick = (d) => {
    const story = stories.find(s => isSameDay(d.date, s.date));
    if (story) currentIndex.set(stories.indexOf(story));
  }

  const handleWeeklClick = (e) => {
    if (e.nativeEvent.locationX >= 75) {
      if (index.getValue() < stories.length)
        currentIndex.increment();
    } else {
      if (index.getValue() > 0)
        currentIndex.decrement();
    }
  }

  const isVisible = () => {
    return weeklIndex.getValue() === props.index;
  }

  useEffect(() => {
    currentIndex.onIndex().subscribe(i => {
      if(isVisible()) {
        if (stories[i]) {
          setCurrentStory(stories[i]);
        } else {
          props.scrollToNextWeekl();
        }
      }
    });
  }, []);

  return (
    <View>
      <TouchableHighlight onLongPress={() => { }} onPress={handleWeeklClick}>
        <Day user={props.user_id} video={currentStory} visible={isVisible()} />
      </TouchableHighlight>
      <WeeklInfo video={currentStory} user={props.user_id} visible={isVisible()} handleDayClick={handleDayClick} stories={stories} />
    </View>
  )
}

export default Weekl;