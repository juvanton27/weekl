import { StyleSheet, Text, View } from "react-native";

/**
 * Component to display messages as a SnackBar
 * @param {*} type the type of the message to display  
 * @param {*} message the message to display  
 * @returns a render
 */
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