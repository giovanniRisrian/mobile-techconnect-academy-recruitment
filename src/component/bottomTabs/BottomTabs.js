import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {goToLogin, goToScreen} from '../../navigation/NavigationHelper';
import {
  ADMINISTRATOR,
  APPLICANT,
  CUSTOMER_PATH,
  HOME_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  RECRUITER,
  VACANY_PATH,
} from '../../navigation/NavigationPath';

import {useDispatch, useSelector} from 'react-redux';
const toHome = () => {
  goToScreen(HOME_PATH, false);
};

const toVacany = () => {
  goToScreen(VACANY_PATH, false);
};

const toDashboard = role => {
  if (role === 'user') {
    goToScreen(APPLICANT.DASHBOARD, false);
  }
  if (role === 'recruiter') {
    goToScreen(RECRUITER.DASHBOARD, false);
  }
  if (role === 'administrator') {
    goToScreen(ADMINISTRATOR.DASHBOARD, false);
  }
};
const toProfile = () => {
  goToScreen(PROFILE_PATH, false);
};
const toLogin = () => {
  goToLogin();
};
const BottomTabs = () => {
  const isLogin = useSelector(state => state.TechconnectAcademyReducer.isLogin);
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={styles.buttonLeft} onPress={() => toHome()}>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => toVacany()}>
        <Text style={styles.text}>Vacany</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          isLogin != null ? toDashboard(isLogin.Role) : toLogin();
        }}>
        <Text style={styles.text}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonRight}
        onPress={() => {
          isLogin != null ? toProfile() : toLogin();
        }}>
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dialogContentView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },

  buttonLeft: {
    width: '25%',
    height: 50,
    backgroundColor: '#2b2c36',
    borderTopLeftRadius: 15,
    borderColor: 'white',
  },

  button: {
    width: '25%',
    height: 50,
    backgroundColor: '#2b2c36',
    borderColor: 'white',
  },
  buttonRight: {
    width: '25%',
    height: 50,
    backgroundColor: '#2b2c36',
    borderTopRightRadius: 15,
    borderColor: 'white',
  },
});
export default BottomTabs;
