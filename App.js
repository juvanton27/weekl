import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { BehaviorSubject } from 'rxjs';
import Conversations from './pages/Conversations';
import Feed from './pages/Feed';
import Profil from './pages/Profil';

const { width, height } = Dimensions.get('window');

export const pageIndex = new BehaviorSubject(2);
const currentPageIndex = {
  set: i => pageIndex.next(i),
  onPageIndex: () => pageIndex.asObservable()
}
export default function App() {
  const [page, setPage] = useState(2);

  const onMomentumScrollEnd = (e) => {
    currentPageIndex.set(e.nativeEvent.contentOffset.x / width)
  }

  useEffect(() => {
    currentPageIndex.onPageIndex().subscribe(i=>setPage(i));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentOffset={{ x: width * 2 }}
        snapToInterval={width}
        decelerationRate='fast'
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
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
