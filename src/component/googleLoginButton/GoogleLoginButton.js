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
  HOME_PATH,
  RECRUITER,
  REGISTER_PATH,
  VACANY_PATH,
} from '../../navigation/NavigationPath';

import {useDispatch, useSelector} from 'react-redux';
import {
  setLogin,
  setProfile,
} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {storeLocalData} from '../../utils/localStorage';
const GoogleLoginButton = (serviceLogin, serviceRegister) => {
  const dispatch = useDispatch();
  const {callLoginService, getDataApplicantbyId} = serviceLogin();
  const {callRegisterService, callRegisterGoogleService} = serviceRegister();
  const [isLoading, setLoading] = useState(false);
  const onAuthenticate = async (fullname, email, password) => {
    const params = {fullname, email, password};
    console.log('KALO PARAMNYA INISIH', params);
    setLoading(true);
    try {
      const response = await callRegisterGoogleService(params);
      let registerInfo;
      const config = {
        headers: {Authorization: `Bearer ${response.data.token}`},
      };
      console.log(response);
      console.log('Tokennya : ', jwt_decode(response.data.token));
      if (response) {
        registerInfo = jwt_decode(response.data.token);
        registerInfo.token = response.data.token;

        const resp2 = await getDataApplicantbyId(config);
        dispatch(setProfile(resp2.data));
        await storeLocalData(response.data.token);
        dispatch(setLogin(registerInfo));
        setLoading(false);
        if (registerInfo.Role === 'user') {
          goToScreen(VACANY_PATH, true);
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
        console.log("TOKENNYA :",response.data.token);
        let loginInfo;
        console.log('Tokennya : ', jwt_decode(response.data.token));
        const config = {
          headers: {Authorization: `Bearer ${response.data.token}`},
        };
        if (response) {
          loginInfo = jwt_decode(response.data.token);
          loginInfo.token = response.data.token;

          await storeLocalData(response.data.token);

          const resp2 = await getDataApplicantbyId(config);
          dispatch(setProfile(resp2.data));
          dispatch(setLogin(loginInfo));
          // console.log('INI RESPONNYA YAG GES TYAA', resp2.data);
          setLoading(false);
          if (loginInfo.Role === 'user') {
            goToScreen(VACANY_PATH, true);
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
        const user = result.user;
        console.log('INI ADALAH NAME NYA :', user.name);
        onAuthenticate(user.name, user.email, md5(user.id));
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        //alert('User cancelled the login flow !');
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
