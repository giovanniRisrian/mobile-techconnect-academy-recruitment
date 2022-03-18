import React, {useState} from 'react';
import {goToScreen} from '../../navigation/NavigationHelper';
import {
  ADMINISTRATOR,
  APPLICANT,
  RECRUITER,
} from '../../navigation/NavigationPath';

import {setLogin} from '../../stores/techconnectAcademy/TechconnectAcademyAction';

import jwt_decode from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
export const Login = service => {
  const {callLoginService} = service();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
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

  const onAuthenticate = async () => {
    console.log('request to api : ', email, password);
    try {
      setLoading(true);
      const response = await callLoginService(email, password);

      setLoading(false);
      let loginInfo;
      console.log('Tokennya : ', jwt_decode(response.data.token));
      if (response) {
        loginInfo = jwt_decode(response.data.token);
        loginInfo.token = response.data.token;

        dispatch(setLogin(loginInfo));
        if (loginInfo.Role === 'applicant') {
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
      setLoading(false);
      setAlert(true);
      console.log(error);
    }
  };
  return {
    email,
    password,
    changeemail,
    changePassword,
    onAuthenticate,
    isLoading,
    alert,
    setAlert,
    validation,
  };
};
