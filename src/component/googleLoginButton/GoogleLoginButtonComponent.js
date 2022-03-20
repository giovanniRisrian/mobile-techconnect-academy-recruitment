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
import {setLogin} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
const GoogleLoginButtonComponent = ({googleLogin}) => {
  const dispatch = useDispatch();
  const {GoogleSingUp, GoogleLogout} = googleLogin();
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
      <TouchableOpacity onPress={() => loginGoogle()}>
        <Text>Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleLoginButtonComponent;
