import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BehaviorSubject, concatMap, debounceTime, map } from "rxjs";
import { auth } from "../../firebase";
import { searchUser } from "../../services/users.service";


const { width, height } = Dimensions.get('screen');

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
                <Pressable key={index} style={styles.tile}>
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