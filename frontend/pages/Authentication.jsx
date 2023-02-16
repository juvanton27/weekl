import { library } from "@fortawesome/fontawesome-svg-core";
import * as eye from '@fortawesome/free-regular-svg-icons/faEye';
import * as eye_slash from '@fortawesome/free-regular-svg-icons/faEyeSlash';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ActivityIndicator, Dimensions, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { currentSnackbar } from "../App";
import { login, signup } from "../services/auth.service";

const { width, height } = Dimensions.get('window');

library.add(eye_slash.faEyeSlash, eye.faEye);

const Authentication = (props) => {
  // Define if the form is as login (0) or register (1)
  const [status, setStatus] = useState(0);
  // Form
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(true);
  // Loading
  const [isLoading, setIsLoading] = useState(false);

  const submit = () => {
    setIsLoading(true)
    // Champs completion
    if (!username || username === '' || !password || password === '') {
      currentSnackbar.set({ type: 'ERROR', message: 'Username or password empty' });
      setIsLoading(false);
    } else {
      // Form as login
      if (status === 0) {
        login(username, password).subscribe({
          next: () => currentSnackbar.set({ type: 'SUCCESS', message: 'Authentication succeeded' }),
          error: (err) => {
            resetForm();
            currentSnackbar.set({ type: 'ERROR', message: err.message });
          }
        })
        // Form as register
      } else {
        // Form valid
        if (status === 1 && password === passwordConfirmation) {
          signup(username, password).subscribe({
            next: () => {
              currentSnackbar.set({ type: 'SUCCESS', message: 'Registration succeeded\nPlease log in' });
              resetForm();
            },
            error: (err) => {
              resetForm();
              currentSnackbar.set({ type: 'ERROR', message: err.message });
            }
          })
          // Form invalid
        } else {
          currentSnackbar.set({ type: 'ERROR', message: 'Not same passwords' });
          setIsLoading(false);
        }
      }
    }
  }

  const resetForm = () => {
    // Reset form after registration
    setUserName('');
    setPassword('');
    setPasswordConfirmation('');
    setHiddenPassword(true);
    setStatus(0);
    setIsLoading(false);
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={['rgba(3, 252, 169, 1)', 'rgba(208, 0, 255, 0.2)', 'transparent', 'transparent', 'transparent']}
      start={{ x: 0.7, y: 0 }}
    >
      <Text style={styles.title}>
        {
          status === 0 ? 'Log in' : 'Sign up'
        }
      </Text>
      <Text style={styles.subtitle}>{status === 0 ? 'Access to' : 'Create'} your account</Text>
      <TextInput style={styles.input} onChangeText={setUserName}
        value={username} placeholder='Enter your username'
      />
      <View>
        <TextInput style={styles.input} onChangeText={setPassword}
          value={password} placeholder='Enter your password' secureTextEntry={hiddenPassword}
        />
        <Pressable style={{ position: 'absolute', right: 25, top: 25 }} onPress={() => setHiddenPassword(!hiddenPassword)}>
          <FontAwesomeIcon icon={hiddenPassword ? eye_slash.faEyeSlash : eye.faEye} size={20} />
        </Pressable>
      </View>
      {
        status === 1 ?
          <TextInput style={styles.input} onChangeText={setPasswordConfirmation}
            value={passwordConfirmation} placeholder='Confirm your password' secureTextEntry={hiddenPassword}
          />
          : ''
      }
      <Pressable style={styles.button} onPress={() => submit()}>
        {
          isLoading ?
            <ActivityIndicator />
            :
            <Text style={{ color: 'white', fontSize: 20 }}>
              {
                status === 0 ? 'Login' : 'Signup'
              }
            </Text>
        }
      </Pressable>
      <Text style={styles.subtitle} onPress={() => setStatus(status === 0 ? 1 : 0)}>
        {
          status === 0 ? 'Or sign up' : 'Or log in'
        }
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 4 / 5 * width,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 40,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 4 / 5 * width,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  title: {
    fontSize: 40
  },
  subtitle: {
    margin: 20,
    color: 'rgba(0, 0, 0, 0.5)'
  }
});

export default Authentication;