import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BlurView } from 'expo-blur';
import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Dimensions, Easing, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { catchError, concatMap, from, map, of } from "rxjs";
import { currentModalVisible } from "./Profil";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { manipulateAsync } from "expo-image-manipulator";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { uploadPicture } from "../services/posts.service";

const { width, height } = Dimensions.get('screen');

library.add(faArrowRotateLeft, faClose, faArrowRight);

const CameraPost = ({refresh}) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = useState(Camera.requestCameraPermissionsAsync());
  const [visible, setVisible] = useState(false);
  const [photo, setPhoto] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const cameraRef = useRef();

  const toggleCameraType = () => {
    console.log("oui");
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  }

  const takeAPicture = () => {
    if (!photo) {
      of(setIsLoading(true)).pipe(
        concatMap(() => from(cameraRef.current.takePictureAsync())),
        concatMap((photo) => from(manipulateAsync(
          photo.uri,
          [{
            crop: {
              height: photo.width * 85 / 100,
              width: photo.width * 85 / 100,
              originX: photo.width * ((100 - 85) / 2) / 100,
              originY: photo.height * 35 / 100
            }
          }]
        ))),
        // For development on simulator
        catchError(() => from(manipulateAsync(
          'https://weeklapp.blob.core.windows.net/weekl/posts/yHBGyqm610vkwzDGbtBV.jpeg',
          [{
            crop: {
              height: 85 / 100,
              width: 85 / 100,
              originX: 0,
              originY: 0
            }
          }]
        ))),
        map(setPhoto)
      ).subscribe(() => setIsLoading(false));
    } else {
      setPhoto(undefined);
    }
  }

  const postPicture = () => {
    of(setPosting(true)).pipe(
      concatMap(() => uploadPicture(photo)),
      map(() => setPhoto(undefined)),
      map(() => setPosting(false)),
      map(() => setVisible(false)),
    ).subscribe({
      next: () => refresh(),
      error: err => console.log(err)
    })
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
      {
        posting ?
          // Loading screen while uploading post
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
            <Text style={{color: 'white'}}>Your picture is currently posting</Text>
            <ActivityIndicator color={'rgba(255,255,255,0.5)'} />
          </View> :

          // Camera component interface
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            {
              !photo ? <Camera ref={cameraRef} style={{ ...styles.camera }} type={type} /> : ''
            }
            <GestureDetector gesture={dblTap}>
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
              {
                !photo ?
                  <View style={{ width: '85%', aspectRatio: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }}>
                      <View style={{ flex: 1, marginEnd: 125, marginBottom: 100, borderTopStartRadius: 20, borderLeftWidth: 5, borderTopWidth: 5, borderColor: 'white' }} />
                      <View style={{ flex: 1, marginStart: 125, marginBottom: 100, borderTopRightRadius: 20, borderRightWidth: 5, borderTopWidth: 5, borderColor: 'white' }} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flex: 1, marginEnd: 125, marginTop: 100, borderBottomLeftRadius: 20, borderLeftWidth: 5, borderBottomWidth: 5, borderColor: 'white' }} />
                      <View style={{ flex: 1, marginStart: 125, marginTop: 100, borderBottomRightRadius: 20, borderBottomWidth: 5, borderRightWidth: 5, borderColor: 'white' }} />
                    </View>
                  </View> :
                  <Image style={{ width: '85%', aspectRatio: 1, resizeMode: 'contain' }} source={{ uri: photo.uri }} />
              }

              {/* Bottom component */}
              <View style={{ flex: 1, position: 'absolute', width, bottom: 0, height: 1 / 5 * height, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
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
                  {
                    !photo ?
                      <Pressable onPress={() => { currentModalVisible.set(false) }}>
                        <BlurView
                          intensity={30}
                          tint='light'
                          style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}
                        >
                          <FontAwesomeIcon icon={faClose} color='rgba(255,255,255,0.6)' />
                        </BlurView>
                      </Pressable> :
                      <Pressable onPress={() => postPicture()}>
                        <BlurView
                          intensity={30}
                          tint='light'
                          style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}
                        >
                          <FontAwesomeIcon icon={faArrowRight} color='rgba(255,255,255,0.6)' />
                        </BlurView>
                      </Pressable>
                  }
                </View>
              </View>
            </View>
            </GestureDetector>
          </View>
      }
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  camera: {
    flex: 1,
  },
});


export default CameraPost;