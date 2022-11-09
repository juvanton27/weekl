import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

import Weekl from "../widgets/Weekl/Weekl";

const { width, height } = Dimensions.get('window');

const Feed = (props) => {
    return (
        <View style={styles.container}>
            <ScrollView
                style={{ height }}
                snapToInterval={height}
                decelerationRate='fast'
                showsVerticalScrollIndicator={false}
            >
                {[0, 1].map((id) => (
                    <Weekl key={id} user_id={id} />
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