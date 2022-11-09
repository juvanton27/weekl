import React, { useContext, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { BehaviorSubject } from "rxjs";

import Weekl from "../widgets/Weekl/Weekl";

const { width, height } = Dimensions.get('window');

const Feed = (props) => {
    const [currentWeekl, setCurrentWeekl] = useState(0);

    return (
        <View style={styles.container}>
            <ScrollView
                style={{ height }}
                snapToInterval={height}
                decelerationRate='fast'
                showsVerticalScrollIndicator={false}
                onMomentumScrollEnd={(e) => setCurrentWeekl(e.nativeEvent.contentOffset.y/height)}
            >
                {[0, 1].map((id, index) => (
                    <Weekl key={id} user_id={id} visible={currentWeekl===index}/>
                ))}
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