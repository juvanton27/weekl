import { createRef, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { BehaviorSubject, concatMap, from, map } from 'rxjs';
import { auth } from './firebase';
import Authentication from './pages/Authentication';
import Conversations from './pages/Conversations';
import Feed from './pages/Feed';
import Profil from './pages/Profil';
import Loading from './utils/Loading';
import SnackBar from './utils/SnackBar';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as magnify from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const { width, height } = Dimensions.get('window');

library.add(magnify.faMagnifyingGlass);

const toolbar = [
  { title: 'Conversations', ref: createRef() },
  { title: 'Profil', ref: createRef() },
  { title: 'Weekl', ref: createRef() },
];

const Tab = forwardRef(({ item, onItemPress }, ref) => {
  return (
    <Pressable activeOpacity={false} onPress={onItemPress}>
      <View ref={ref}>
        <Text style={{ color: 'black', fontSize: 50 / toolbar.length, fontWeight: '800', textTransform: 'uppercase' }}>{item.title}</Text>
      </View>
    </Pressable>
  )
});

const Indicator = ({ measures, scrollX }) => {
  const inputRange = toolbar.map((_, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(m => m.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(m => m.x),
    extrapolate: 'clamp'
  });
  return (
    <Animated.View style={{ position: 'absolute', height: 4, width: indicatorWidth, backgroundColor: 'black', bottom: -10, left: 0, transform: [{ translateX }] }} />
  )
}

const Tabs = ({ scrollX, data, onItemPress }) => {
  const [measures, setMeasures] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    const m = [];
    data.forEach(({ ref }) => {
      ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({ x, y, width, height });
          if (m.length === data.length) setMeasures(m);
        }
      );
    })
  });

  return (
    <View style={{width: '87%'}}>
      <View ref={containerRef} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
        {data.map((item, index) => (
          <Tab key={index} item={item} ref={item.ref} onItemPress={() => { onItemPress(index) }} />
        ))}
      </View>
      {measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} />}
    </View>
  )
}

export const pageIndex = new BehaviorSubject(2);
const currentPageIndex = {
  set: i => pageIndex.next(i),
  onPageIndex: () => pageIndex.asObservable()
}

export const snackbar = new BehaviorSubject({ type: undefined, message: undefined });
export const currentSnackbar = {
  set: ({ type, message }) => snackbar.next({ type, message }),
  onSnackbar: () => snackbar.asObservable(),
}

/**
 * This component will first display a loading screen
 * If the user isn't logged it redirect to the authentication screen
 * If the user is logged it redirect the user to it's feed
 * @returns 
 */
export default function App() {
  const [onStart, setOnStart] = useState(true);
  const [page, setPage] = useState(2);
  const [snackbarState, setSnackbarState] = useState({ type: undefined, message: undefined });
  const ref = useRef();

  // Toolbar handeling
  const scrollX = useRef(new Animated.Value(0)).current;
  const onItemPress = useCallback(itemIndex => {
    ref?.current?.scrollTo({ x: itemIndex * width })
  })

  const onMomentumScrollEnd = (e) => {
    currentPageIndex.set(e.nativeEvent.contentOffset.x / width)
  }

  useEffect(() => {
    if (onStart) {
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
            <View>
              <Animated.ScrollView
                ref={ref}
                contentOffset={{ x: width * 2 }}
                snapToInterval={width}
                decelerationRate='fast'
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={onMomentumScrollEnd}
                keyboardShouldPersistTaps='always'
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: false }
                )}
              >
                <Conversations />
                <Profil own={true} />
                <Feed />
                <Profil />
              </Animated.ScrollView>
              <View style={{ position: 'absolute', top: 60, width, flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <Tabs scrollX={scrollX} data={toolbar} onItemPress={onItemPress} />
                <Pressable style={{width: '13%'}}>
                  <FontAwesomeIcon icon={magnify.faMagnifyingGlass} size={20} />
                </Pressable>
              </View>
            </View>
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
