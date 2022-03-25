import React from 'react';
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
const RegisterScreen = ({register}) => {
  const {
    fullname,
    email,
    password,
    changeemail,
    changePassword,
    changeFullname,
    onAuthenticate,
    isLoading,
    alert,
    setAlert,
    validation,
    goToLogin,
  } = register();

  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Validate Register</Text>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <AwesomeAlert
          show={alert}
          showProgress={false}
          message="Incorrect register username or
          password!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Try Register"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            setAlert(false);
          }}
        />
        <Text style={styles.title}>Register</Text>
        <Image
          source={require('../../assets/images/TCA.png')}
          style={styles.image}
        />
        <TextInput
          style={styles.input}
          placeholder="Fullname"
          placeholderTextColor="#637085"
          onChangeText={changeFullname}
          value={fullname}></TextInput>
        <Text style={styles.warning}>{validation.fullname}</Text>
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
          disabled={
            !(
              validation.safeEmail &&
              validation.safePassword &&
              validation.safeFullname
            )
          }
          style={
            !(
              validation.safeEmail &&
              validation.safePassword &&
              validation.safeFullname
            )
              ? styles.buttonDisable
              : styles.button
          }
          onPress={() => onAuthenticate()}>
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          Sudah memiliki akun?
          <Text style={{color: 'blue'}} onPress={() => goToLogin()}>
            Login
          </Text>
        </Text>
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
    height: 60,
    // margin: 12,
    marginLeft: 12,
    marginRight: 12,
    borderBottomWidth: 7,
    borderColor: '#631cc7',
    padding: 10,
    backgroundColor: '#f2f2f2',
    // color: 'white',
    borderRadius: 10,
  },
});

export default RegisterScreen;
