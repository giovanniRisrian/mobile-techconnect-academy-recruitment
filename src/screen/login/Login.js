import React, {useState} from 'react';
import {goToScreen} from '../../navigation/NavigationHelper';
import {
  ADMINISTRATOR,
  APPLICANT,
  HOME_PATH,
  RECRUITER,
  REGISTER_PATH,
  VACANY_PATH,
} from '../../navigation/NavigationPath';
import {
  setLogin,
  setProfile,
} from '../../stores/techconnectAcademy/TechconnectAcademyAction';

import jwt_decode from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLocalData,
  removeLocalData,
  storeLocalData,
} from '../../utils/localStorage';
import {Alert} from 'react-native';
export const Login = service => {
  const {callLoginService, getDataApplicantbyId} = service();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(null);
  const dispatch = useDispatch();
  const [validation, setValidation] = useState({
    safeEmail: false,
    safePassword: false,
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState(false);

  const changeemail = email => {
    let temp = validation;
    if (
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      temp.email = '';
      temp.safeEmail = true;
    } else {
      temp.email = 'Invalid email format';
      temp.safeEmail = false;
    }
    setValidation(temp);

    // console.log(validation);
    setemail(email);
  };
  const goToRegister = () => {
    goToScreen(REGISTER_PATH, false);
  };

  const changePassword = password => {
    let temp = validation;
    if (password.length >= 6) {
      temp.password = '';
      temp.safePassword = true;
    } else {
      temp.safePassword = false;
      temp.password = 'Password Minimum 6 Character';
    }
    setValidation(temp);
    // console.log(validation);
    setPassword(password);
  };
  const passLogin = async () => {
    let loginInfoToken = await getLocalData();
    console.log('INIGETNYAAA', loginInfoToken);
    // const loginInfo = isLogged;
    if (loginInfoToken != null) {
      const config = {
        headers: {Authorization: `Bearer ${loginInfoToken}`},
      };
      const loginInfo = jwt_decode(loginInfoToken);
      loginInfo.token = loginInfoToken;
      const resp2 = await getDataApplicantbyId(config);
      dispatch(setProfile(resp2.data));
      dispatch(setLogin(loginInfo));
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
  };
  const onAuthenticate = async () => {
    console.log('request to api : ', email, password);
    try {
      setLoading(true);
      const response = await callLoginService(email, password);
      console.log('Sini kalo berani');
      setLoading(false);
      let loginInfo;
      console.log('Tokennya : ', jwt_decode(response.data.token));
      const config = {
        headers: {Authorization: `Bearer ${response.data.token}`},
      };
      if (response) {
        loginInfo = jwt_decode(response.data.token);
        loginInfo.token = response.data.token;
        if (loginInfo.Role === 'user') {
          dispatch(setLogin(loginInfo));
          const resp2 = await getDataApplicantbyId(config);
          dispatch(setProfile(resp2.data));
          console.log('Ini Data Didapatkan');
          console.log('Ditunggu tokennya');
          await storeLocalData(loginInfo.token);
          goToScreen(VACANY_PATH, true);
        } else {
          Alert.alert(
            'Login Failed',
            'Your role dont have authorization to this mobile app',
          );
        }
        /*dispatch(setLogin(loginInfo));
        const resp2 = await getDataApplicantbyId(config);
        dispatch(setProfile(resp2.data));
        console.log('Ini Data Didapatkan');
        console.log('Ditunggu tokennya');
        await storeLocalData(loginInfo.token);*/
        /*if (loginInfo.Role === 'user') {
          goToScreen(VACANY_PATH, true);
        }*/
        /*if (loginInfo.Role === 'recruiter') {
          goToScreen(RECRUITER.DASHBOARD, true);
        }
        if (loginInfo.Role === 'administrator') {
          goToScreen(ADMINISTRATOR.DASHBOARD, true);
        }*/
      }
    } catch (error) {
      setLoading(false);
      setAlert(true);
      console.log(error);
    }
  };
  return {
    isLogged,
    email,
    password,
    passLogin,
    changeemail,
    changePassword,
    onAuthenticate,
    isLoading,
    alert,
    setAlert,
    validation,
    goToRegister,
  };
};
