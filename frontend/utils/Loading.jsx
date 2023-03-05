import { library } from "@fortawesome/fontawesome-svg-core";
import * as weekl from '@fortawesome/free-brands-svg-icons/faWeebly';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";

library.add(weekl.faWeebly);

const { width, height } = Dimensions.get('window');

/**
 * Component that displays a loading screen
 * @returns 
 */
const Loading = () => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={weekl.faWeebly} size={60} />
      <ActivityIndicator style={{ position: 'absolute', bottom: 50 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Loading;