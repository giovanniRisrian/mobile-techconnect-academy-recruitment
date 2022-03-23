import React, {useState} from 'react';
import {useEffect} from 'react';

import md5 from 'blueimp-md5';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import base64 from 'react-native-base64';
import jwt_decode from 'jwt-decode';
import {goToScreen} from '../../navigation/NavigationHelper';
import {
  ADMINISTRATOR,
  APPLICANT,
  RECRUITER,
  REGISTER_PATH,
} from '../../navigation/NavigationPath';

import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {storeLocalData} from '../../utils/localStorage';
const GoogleLoginButton = (serviceLogin, serviceRegister) => {
  const dispatch = useDispatch();
  const {callLoginService} = serviceLogin();
  const {callRegisterService} = serviceRegister();
  const [isLoading, setLoading] = useState(false);
  const onAuthenticate = async (fullname, email, password) => {
    const params = {fullname, email, password};

    setLoading(true);
    try {
      const response = await callRegisterService(params);

      let registerInfo;
      console.log(response);
      console.log('Tokennya : ', jwt_decode(response.data.token));
      if (response) {
        registerInfo = jwt_decode(response.data.token);
        registerInfo.token = response.data.token;

        await storeLocalData(response.data.token);
        dispatch(setLogin(registerInfo));
        setLoading(false);
        if (registerInfo.Role === 'user') {
          goToScreen(APPLICANT.DASHBOARD, true);
        }
        if (registerInfo.Role === 'recruiter') {
          goToScreen(RECRUITER.DASHBOARD, true);
        }
        if (registerInfo.Role === 'administrator') {
          goToScreen(ADMINISTRATOR.DASHBOARD, true);
        }
      }
    } catch (error) {
      try {
        const response = await callLoginService(email, password);
        let loginInfo;
        console.log('Tokennya : ', jwt_decode(response.data.token));
        if (response) {
          loginInfo = jwt_decode(response.data.token);
          loginInfo.token = response.data.token;

          await storeLocalData(response.data.token);
          dispatch(setLogin(loginInfo));
          setLoading(false);
          if (loginInfo.Role === 'user') {
            goToScreen(APPLICANT.DASHBOARD, true);
          }
          if (loginInfo.Role === 'recruiter') {
            goToScreen(RECRUITER.DASHBOARD, true);
          }
          if (loginInfo.Role === 'administrator') {
            goToScreen(ADMINISTRATOR.DASHBOARD, true);
          }
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const GoogleSingUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(result => {
        console.log(result.user);
        const user = result.user;
        console.log('MD5NYA :', md5(user.id));
        onAuthenticate(user.name, user.email, md5(user.id));
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('User cancelled the login flow !');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Google play services not available or outdated !');
        // play services not available or outdated
      } else {
        console.log(error);
      }
    }
  };
  const GoogleLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log('Logout Success');
    } catch (error) {
      console.error(error);
    }
  };
  return {GoogleSingUp, GoogleLogout, isLoading};
};

export default GoogleLoginButton;
