import React, { useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

import Weekl, { currentIndex } from "../widgets/Weekl/Weekl";

const { width, height } = Dimensions.get('window');


const Feed = (props) => {
  const [currentWeekl, setCurrentWeekl] = useState(0);
  let _feedview = useRef();

  const scrollToNextWeekl = () => {
    _feedview.current.scrollTo({ y: height });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={_feedview}
        style={{ height }}
        snapToInterval={height}
        decelerationRate='fast'
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {setCurrentWeekl(e.nativeEvent.contentOffset.y / height); currentIndex.set(0)}}
      >
        {[0, 1].map((id, index) => (
          <Weekl key={id} user_id={id} visible={currentWeekl === index} scrollToNextWeekl={scrollToNextWeekl} />
        ))}
        {/* Add special page saying all is seen and should subscribe to more people */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  text: {
    width,
    height,
  }
});

export default Feed;