import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { BehaviorSubject, concatMap, delay, from, map, of, timeInterval, timeout } from 'rxjs';
import Conversations from './pages/Conversations';
import Feed from './pages/Feed';
import Profil from './pages/Profil';
import { isLoggedIn } from './services/auth.service';
import Authentication from './pages/Authentication';
import Loading from './pages/Loading';
import SnackBar from './utils/SnackBar';

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

export const snackbar = new BehaviorSubject({ type: undefined, message: undefined });
export const currentSnackbar = {
  set: ({ type, message }) => snackbar.next({ type, message }),
  onSnackbar: () => snackbar.asObservable(),
}
export default function App() {
  const [page, setPage] = useState(2);
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [snackbarState, setSnackbarState] = useState({ type: undefined, message: undefined });

  const onMomentumScrollEnd = (e) => {
    currentPageIndex.set(e.nativeEvent.contentOffset.x / width)
  }

  useEffect(() => {
    currentPageIndex.onPageIndex().subscribe(i => setPage(i));
    // Subscribe to log status change
    currentIsLogged.onIsLogged().subscribe(i => setLoggedIn(i));
    // Verify if logged on init
    isLoggedIn().subscribe(i => currentIsLogged.set(i));
    // Error handeling
    currentSnackbar.onSnackbar().pipe(
      concatMap(({ type, message }) => from(new Promise(resolve => resolve(setSnackbarState({ type, message }))))),
      map(() => new Promise(resolve => resolve(setTimeout(() => setSnackbarState({ type: undefined, message: undefined }), 3000)))),
    ).subscribe();
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
              <Profil own={true} />
              <Feed />
              <Profil />
            </ScrollView>
      }
      <View style={styles.snack}>
        <SnackBar type={snackbarState.type} message={snackbarState.message} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height,
    width
  },
  snack: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: 9 / 10 * width,
    margin: 20,
  }
});
