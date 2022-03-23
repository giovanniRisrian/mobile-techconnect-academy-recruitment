import React, {useEffect} from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import GoogleLoginButton from '../../component/googleLoginButton/GoogleLoginButton';
import GoogleLoginButtonComponent from '../../component/googleLoginButton/GoogleLoginButtonComponent';
import LoginService from '../../service/LoginService';
import RegisterService from '../../service/RegisterService';
const LoginScreen = ({login}) => {
  const {
    email,
    password,
    changeemail,
    changePassword,
    onAuthenticate,
    isLoading,
    alert,
    setAlert,
    validation,
    goToRegister,
    isLogged,
    passLogin,
  } = login();
  useEffect(() => {
    passLogin();
  }, []);

  console.log('ISLOGED ADALAH', isLogged);
  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Validate Login</Text>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <AwesomeAlert
          show={alert}
          showProgress={false}
          message="Incorrect login username or
          password!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Try Login"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setAlert(false);
          }}
        />
        {/* <Text style={styles.title}>Login</Text> */}
        <Image
          source={require('../../assets/images/TCA.png')}
          style={styles.image}
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          placeholderTextColor="#637085"
          onChangeText={changeemail}
          value={email}></TextInput>
        <Text style={styles.warning}>{validation.email}</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          onChangeText={changePassword}
          placeholderTextColor="#637085"
          value={password}
          placeholder="Password"></TextInput>
        <Text style={styles.warning}>{validation.password}</Text>
        <TouchableOpacity
          disabled={!(validation.safeEmail && validation.safePassword)}
          style={
            !(validation.safeEmail && validation.safePassword)
              ? styles.buttonDisable
              : styles.button
          }
          onPress={() => onAuthenticate()}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          Belum memiliki akun?{' '}
          <Text style={{color: 'blue'}} onPress={() => goToRegister()}>
            Daftar
          </Text>
        </Text>
        <GoogleLoginButtonComponent
          googleLogin={() => GoogleLoginButton(LoginService, RegisterService)}
        />
      </SafeAreaView>
    );
  }
};
// 2b2c36
const styles = StyleSheet.create({
  image: {height: 256, width: 256, alignSelf: 'center'},
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  text: {
    marginLeft: 12,
    color: 'white',
  },
  title: {
    marginLeft: 12,
    color: 'black',
    alignSelf: 'center',
  },
  warning: {
    marginLeft: 12,
    color: 'red',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#631cc7',
    alignItems: 'center',
    margin: 12,
    padding: 12,
    borderRadius: 50,
    color: 'white',
  },

  buttonDisable: {
    backgroundColor: '#637085',
    alignItems: 'center',
    margin: 12,
    padding: 12,
    borderRadius: 50,
    color: 'white',
  },
  input: {
    textAlign: 'center',
    height: 40,
    margin: 12,
    borderBottomWidth: 7,
    borderColor: '#631cc7',
    padding: 10,
    backgroundColor: '#181a5c',
    color: 'white',
    borderRadius: 50,
  },
});

export default LoginScreen;
