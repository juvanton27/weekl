import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import Conversations from './pages/Conversations';
import Feed from './pages/Feed';
import Profil from './pages/Profil';

const { width, height } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentOffset={{ x: width * 2 }}
        snapToInterval={width}
        decelerationRate='fast'
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Conversations />
        <Profil />
        <Feed />
        <Profil />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
