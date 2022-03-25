import React, {useState} from 'react';
import {goToScreen} from '../../navigation/NavigationHelper';
import {
  ADMINISTRATOR,
  APPLICANT,
  LOGIN_PATH,
  RECRUITER,
  VACANY_PATH,
} from '../../navigation/NavigationPath';

import {setLogin, setProfile} from '../../stores/techconnectAcademy/TechconnectAcademyAction';

import jwt_decode from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
export const Register = service => {
  const {callRegisterService, getDataApplicantbyId} = service();
  const [fullname, setFullname] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [validation, setValidation] = useState({
    safeFullname: false,
    safeEmail: false,
    safePassword: false,
    fullname: '',
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
  const goToLogin = () => {
    goToScreen(LOGIN_PATH, true);
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

  const changeFullname = fullname => {
    let temp = validation;
    if (fullname.length >= 4) {
      temp.fullname = '';
      temp.safeFullname = true;
    } else {
      temp.safeFullname = false;
      temp.fullname = 'Fullname Minimum 4 Character';
    }
    setValidation(temp);
    setFullname(fullname);
  };

  const onAuthenticate = async () => {
    const params = {fullname, email, password};
    try {
      setLoading(true);
      const response = await callRegisterService(params);

      setLoading(false);
      let registerInfo;
      console.log(response);
      console.log('Tokennya : ', jwt_decode(response.data.token));
      const config = {
        headers: {Authorization: `Bearer ${response.data.token}`},
      };
      if (response) {
        registerInfo = jwt_decode(response.data.token);
        registerInfo.token = response.data.token;

        const resp2 = await getDataApplicantbyId(config);
        dispatch(setProfile(resp2.data));
        dispatch(setLogin(registerInfo));
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
      setLoading(false);
      setAlert(true);
      console.log(error);
    }
  };
  return {
    fullname,
    email,
    password,
    changeemail,
    changePassword,
    onAuthenticate,
    isLoading,
    alert,
    setAlert,
    validation,
    goToLogin,
    changeFullname,
  };
};
