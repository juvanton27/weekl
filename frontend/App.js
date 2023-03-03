import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { BehaviorSubject, concatMap, from, map } from 'rxjs';
import { auth } from './firebase';
import Authentication from './pages/Authentication';
import Conversations from './pages/Conversations';
import Feed from './pages/Feed';
import Loading from './pages/Loading';
import Profil from './pages/Profil';
import SnackBar from './utils/SnackBar';

const { width, height } = Dimensions.get('window');

export const pageIndex = new BehaviorSubject(0);
const currentPageIndex = {
  set: i => pageIndex.next(i),
  onPageIndex: () => pageIndex.asObservable()
}

export const snackbar = new BehaviorSubject({ type: undefined, message: undefined });
export const currentSnackbar = {
  set: ({ type, message }) => snackbar.next({ type, message }),
  onSnackbar: () => snackbar.asObservable(),
}
export default function App() {
  const [onStart, setOnStart] = useState(true);
  const [page, setPage] = useState(0);
  const [snackbarState, setSnackbarState] = useState({ type: undefined, message: undefined });

  const onMomentumScrollEnd = (e) => {
    currentPageIndex.set(e.nativeEvent.contentOffset.x / width)
  }

  useEffect(() => {
    if(onStart) {
      setTimeout(() => setOnStart(false), 2000);
    }
    currentPageIndex.onPageIndex().subscribe(setPage);
    // Error handeling
    currentSnackbar.onSnackbar().pipe(
      concatMap(({ type, message }) => from(new Promise(resolve => resolve(setSnackbarState({ type, message }))))),
      map(() => new Promise(resolve => resolve(setTimeout(() => setSnackbarState({ type: undefined, message: undefined }), 3000)))),
    ).subscribe();
  }, []);

  return (
    <View style={styles.container}>
      {
        onStart && !auth.currentUser ?
          <Loading /> :
          // Authentication screen
          !auth.currentUser ?
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
              keyboardShouldPersistTaps='always'
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
    width,
  },
  snack: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: 9 / 10 * width,
    margin: 20,
  }
});
