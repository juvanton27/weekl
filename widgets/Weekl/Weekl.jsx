import { useEffect, useState } from "react";
import { Dimensions, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { BehaviorSubject } from "rxjs";
import { getActiveStoriesByUser } from "../../services/stories.service";
import { isSameDay } from "../../utils/utils";

import Day from "./Day";
import Info from "./Info";

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
  const [currentStory, setCurrentStory] = useState(stories[0])

  const handleDayClick = (d) => {
    const story = stories.find(s => isSameDay(d.date, s.date));
    if (story) currentIndex.set(stories.indexOf(story));
  }

  useEffect(() => {
    currentIndex.onIndex().subscribe(i => i<=stories.length?setCurrentStory(stories[i]):props.scrollToNextWeekl());
  }, []);

  return (
    <View>
      <TouchableHighlight onLongPress={() => { }} onPress={(e) => {
        if (e.nativeEvent.locationX >= 75) {
          if (index.getValue() < stories.length - 1)
            currentIndex.increment();
        } else {
          if (index.getValue() > 0)
            currentIndex.decrement();
        }
      }}>
        <Day user={props.user_id} video={currentStory} visible={props.visible} />
      </TouchableHighlight>
      <Info video={currentStory} user={props.user_id} visible={props.visible} handleDayClick={handleDayClick} stories={stories} />
    </View>
  )
}

export default Weekl;