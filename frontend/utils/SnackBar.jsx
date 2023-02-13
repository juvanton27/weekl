import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get('window');

const SnackBar = ({ type, message }) => {
  return (
    <View>
      {
        type && message ?
          <View style={{ ...styles.container, backgroundColor: type === 'SUCCESS' ? 'green' : type === 'WARNING' ? 'orange' : type === 'ERROR' ? 'red' : 'white' }}>
            <Text style={{ color: type === 'INFO' ? 'black' : 'white' }}>{message}</Text>
          </View>
          : <View></View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SnackBar;