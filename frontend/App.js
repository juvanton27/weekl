import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { BehaviorSubject } from 'rxjs';
import Conversations from './pages/Conversations';
import Feed from './pages/Feed';
import Profil from './pages/Profil';
import { isLoggedIn } from './services/auth.service';
import Authentication from './pages/Authentication';
import Loading from './pages/Loading';

const { width, height } = Dimensions.get('window');

export const pageIndex = new BehaviorSubject(2);
const currentPageIndex = {
  set: i => pageIndex.next(i),
  onPageIndex: () => pageIndex.asObservable()
}
const isLogged = new BehaviorSubject(undefined);
export const currentIsLogged = {
  set: i => isLogged.next(i),
  onIsLogged: () => isLogged.asObservable()
}
export default function App() {
  const [page, setPage] = useState(2);
  const [loggedIn, setLoggedIn] = useState(undefined);

  const onMomentumScrollEnd = (e) => {
    currentPageIndex.set(e.nativeEvent.contentOffset.x / width)
  }

  useEffect(() => {
    currentPageIndex.onPageIndex().subscribe(i => setPage(i));
    // Subscribe to log status change
    currentIsLogged.onIsLogged().subscribe(i => setLoggedIn(i));
    // Verify if logged on init
    isLoggedIn().subscribe(i => currentIsLogged.set(i));
  }, []);

  return (
    <View style={styles.container}>
      {
        // Loading screen
        loggedIn === undefined ?
          <Loading></Loading>
          :
          // Authentication screen
          loggedIn === false ?
            <Authentication></Authentication>
            :
            // App screen
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
      }
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
