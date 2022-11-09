import { useEffect, useState } from "react";
import { Dimensions, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { BehaviorSubject } from "rxjs";
import { getActiveStoriesByUser } from "../../services/stories.service";

import Day from "../Day";
import Info from "./Info";

const { width, height } = Dimensions.get('window');

const index = new BehaviorSubject(0);
const currentIndex = {
  increment: () => index.next(index.getValue() + 1),
  decrement: () => index.next(index.getValue() - 1),
  onIndex: () => index.asObservable(),
}

const Weekl = (props) => {
  const stories = getActiveStoriesByUser(props.user_id);
  const [currentStory, setCurrentStory] = useState({})

  useEffect(() => {
    currentIndex.onIndex().subscribe(i => setCurrentStory(stories[i]));
  }, [])

  return (
    <View>
      <TouchableHighlight onLongPress={() => {}} onPress={(e) => {
        if (e.nativeEvent.locationX >= 75) {
          if (index.getValue() < stories.length - 1)
            currentIndex.increment();
        } else {
          if (index.getValue() > 0)
            currentIndex.decrement();
        }
      }}>
        <Day user={props.user_id} video={currentStory} visible={props.visible}/>
      </TouchableHighlight>
      <Info />
    </View>
  )
}

export default Weekl;