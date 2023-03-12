import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BehaviorSubject, concatMap, debounceTime, map } from "rxjs";
import Profil from "../../pages/Profil";
import { searchUser } from "../../services/users.service";
import { library } from "@fortawesome/fontawesome-svg-core";
import * as xmark from '@fortawesome/free-solid-svg-icons/faXmark';
import { currentUserIndex } from "../../pages/Feed";

const { width, height } = Dimensions.get('screen');

library.add(xmark.faXmark);

export const modalVisible = new BehaviorSubject(false);
export const currentModalVisible = {
  set: bool => modalVisible.next(bool),
  onModalVisible: () => modalVisible.asObservable()
}
const searchString = new BehaviorSubject(undefined);
const currentSearchString = {
  set: string => searchString.next(string),
  onSearchString: () => searchString.asObservable()
}

const Search = ({ }) => {
  const [visible, setVisible] = useState(false);
  const [profilSearch, setProfilSearch] = useState(undefined);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    currentModalVisible.onModalVisible().subscribe(setVisible);
    currentSearchString.onSearchString().pipe(
      map(() => setIsLoading(true)),
      debounceTime(1000),
      concatMap(() => searchUser(searchString.getValue())),
      map(setSearchResult),
    ).subscribe(() => setIsLoading(false));
  }, []);

  return (
    !profilSearch ?
      <Modal
        animationType="fade"
        visible={visible}
        presentationStyle="fullScreen"
        onRequestClose={() => { setSearchResult([]); currentModalVisible.set(false); }}
      >
        <View style={styles.container}>
          <View style={{ width, flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 10 }}>
            <TextInput style={styles.input} autoFocus={true} placeholder="Entrez le nom d'un utilisateur" onChangeText={currentSearchString.set} />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text onPress={() => setVisible(false)}>Cancel</Text>
            </View>
          </View>
          {
            isLoading ? <ActivityIndicator style={styles.content} /> :
              searchResult.length === 0 ?
                <View style={styles.content}>
                  <Text>No result</Text>
                </View> :
                <ScrollView style={{ padding: 20 }}>
                  {searchResult.map((user, index) => (
                    <Pressable key={index} style={styles.tile} onPress={() => setProfilSearch(user?.uid)}>
                      <Image style={styles.thumbnail} source={{ uri: user?.picture }}></Image>
                      <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user?.username}</Text>
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
          }
        </View>
      </Modal>
      :
      <View style={{ position: 'absolute', backgroundColor: 'white' }}>
        <Pressable
          style={{ position: 'absolute', left: 10, top: 60, zIndex: 1000 }}
          onPress={() => setProfilSearch(undefined)}
        >
          <FontAwesomeIcon icon={xmark.faXmark} color="black" size={40} />
        </Pressable>
        <Profil search={profilSearch} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    paddingTop: 60
  },
  input: {
    height: 50,
    width: 4 / 5 * width,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 40,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  tile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    width: width * 9 / 10,
    margin: 5,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
  },
  thumbnail: {
    height: '80%',
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 90,
    marginHorizontal: 10
  }
});

export default Search;