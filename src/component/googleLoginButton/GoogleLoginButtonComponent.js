import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {goToLogin} from '../../navigation/NavigationHelper';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import LinearGradient from 'react-native-linear-gradient';
import {setLogin} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
const GoogleLoginButtonComponent = ({googleLogin}) => {
  const dispatch = useDispatch();
  const {GoogleSingUp, GoogleLogout, isLoading} = googleLogin();
  const Logout = () => {
    dispatch(setLogin(null));
    goToLogin();
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '765193159209-13h77s7f6l1a1ua96nh6moge7m96merp.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);
  const loginGoogle = async () => {
    await GoogleSingUp();
  };
  const logoutGoogle = async () => {
    await GoogleLogout();
  };
  return (
    <View>
      <LinearGradient
        style={styles.button}
        colors={['#7643EC', '#83489E']}
        onPress={() => loginGoogle()}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity onPress={() => loginGoogle()}>
          {!isLoading ? (
            <Text style={styles.text}>Login With Google</Text>
          ) : (
            <ActivityIndicator />
          )}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

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
    backgroundColor: '#5F4E98',
    alignItems: 'center',
    margin: 12,
    // width: 30,
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

export default GoogleLoginButtonComponent;
