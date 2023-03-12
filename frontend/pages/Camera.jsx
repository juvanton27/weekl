import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BlurView } from 'expo-blur';
import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Dimensions, Easing, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { concatMap, from, map, of } from "rxjs";
import { currentModalVisible } from "./Profil";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const { width, height } = Dimensions.get('screen');

library.add(faArrowRotateLeft, faClose);

const CameraPost = ({ }) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = useState(Camera.requestCameraPermissionsAsync());
  const [visible, setVisible] = useState(false);
  const [photo, setPhoto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const cameraRef = useRef();

  const toggleCameraType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  }

  const takeAPicture = () => {
    if (!photo) {
      of(setIsLoading(true)).pipe(
        concatMap(() => from(cameraRef.current.takePictureAsync())),
        map(setPhoto)
      ).subscribe(() => setIsLoading(false));
    } else {
      setPhoto(undefined);
    }
  }

  const dblTap = Gesture.Tap().numberOfTaps(2).onStart(() => toggleCameraType())

  useEffect(() => {
    currentModalVisible.onModalVisible().subscribe(setVisible);
  }, []);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="fullScreen"
      onRequestClose={() => currentModalVisible.set(false)}
    >
      <GestureDetector gesture={dblTap}>
        {
          !photo ?
            <Camera ref={cameraRef} style={styles.camera} type={type} /> :
            <Image style={styles.camera} source={{ uri: photo.uri }} />
        }
      </GestureDetector>
      <View style={{ position: 'absolute', height, width, alignItems: 'center' }}>

        {/* Top component */}
        <View style={{ height: '35%' }}>
          <BlurView
            intensity={30}
            tint='light'
            style={{ width: "100%", height: "100%" }}
          >

          </BlurView>
        </View>

        {/* Camera cadran */}
        <View style={{ width: '85%', aspectRatio: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }}>
            <View style={{ flex: 1, marginEnd: 125, marginBottom: 100, borderTopStartRadius: 20, borderLeftWidth: 5, borderTopWidth: 5, borderColor: 'white' }} />
            <View style={{ flex: 1, marginStart: 125, marginBottom: 100, borderTopRightRadius: 20, borderRightWidth: 5, borderTopWidth: 5, borderColor: 'white' }} />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginEnd: 125, marginTop: 100, borderBottomLeftRadius: 20, borderLeftWidth: 5, borderBottomWidth: 5, borderColor: 'white' }} />
            <View style={{ flex: 1, marginStart: 125, marginTop: 100, borderBottomRightRadius: 20, borderBottomWidth: 5, borderRightWidth: 5, borderColor: 'white' }} />
          </View>
        </View>

        {/* Bottom component */}
        <View style={{ flex: 1, width, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          {/* Left component */}
          <View style={{ backgroundColor: 'black', height: '30%', aspectRatio: 1, borderRadius: 20, borderWidth: 2, borderColor: 'white' }}>

          </View>
          {/* Middle component */}
          <View style={{ aspectRatio: 1, height: '60%', borderRadius: 90, overflow: "hidden", backgroundColor: "transparent" }}>
            <Pressable onPress={takeAPicture}>
              <BlurView
                intensity={30}
                tint='light'
                style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}
              >
                {
                  isLoading ? <ActivityIndicator /> :
                    !photo ?
                      <Text style={{ fontSize: 50, color: 'rgba(255,255,255,0.6)' }}>+</Text> :
                      <FontAwesomeIcon icon={faArrowRotateLeft} color={'rgba(255,255,255,0.6)'} size={20} />
                }
              </BlurView>
            </Pressable>
          </View>
          {/* Right component */}
          <View style={{ aspectRatio: 1, height: '30%', borderRadius: 90, overflow: "hidden", backgroundColor: "transparent" }}>
            <Pressable onPress={() => { currentModalVisible.set(false) }}>
              <BlurView
                intensity={30}
                tint='light'
                style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}
              >
                <FontAwesomeIcon icon={faClose} color='rgba(255,255,255,0.6)' />
              </BlurView>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  camera: {
    flex: 1
  },
});


export default CameraPost;