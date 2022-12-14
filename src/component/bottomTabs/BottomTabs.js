import React, {useState} from 'react';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setTab} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
import {SET_TAB} from '../../utils/constants';
const toHome = dispatch => {
  dispatch(setTab(HOME_PATH));
  // setNowTab(HOME_PATH);
  goToScreen(HOME_PATH, false);
};
const toVacany = dispatch => {
  dispatch(setTab(VACANY_PATH));
  // setNowTab(VACANY_PATH);
  goToScreen(VACANY_PATH, true);
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
const toProfile = dispatch => {
  dispatch(setTab(PROFILE_PATH));
  // setNowTab(PROFILE_PATH);
  goToScreen(PROFILE_PATH, false);
};
const toLogin = () => {
  goToLogin();
};
const BottomTabs = () => {
  const dispatch = useDispatch();
  let nowTab = useSelector(state => state.TechconnectAcademyReducer.nowTab);
  // let nowTabSebenarnya = useSelector(
  //   state => state.TechconnectAcademyReducer.nowTab,
  // );
  console.log('ini nowTab', nowTab);
  // console.log('ini nowTabSebenarnya', nowTabSebenarnya);
  const isLogin = useSelector(state => state.TechconnectAcademyReducer.isLogin);
  // const nowTab = useSelector(state => state.TechconnectAcademyReducer.nowTab);
  const active = '#6a00ff';
  const pasive = '#2b2c36';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonLeft}
        onPress={() => toHome(dispatch)}>
        <Text style={styles.text}>
          {' '}
          <Icon
            name="home"
            size={25}
            color={nowTab === HOME_PATH ? active : pasive}
          />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => toVacany(dispatch)}>
        <Text style={styles.text}>
          {' '}
          <Icon
            name="briefcase-search"
            size={25}
            color={nowTab === VACANY_PATH ? active : pasive}
          />
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => {
          isLogin != null ? toDashboard(isLogin.Role) : toLogin();
        }}>
        <Text style={styles.text}>Dashboard</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.buttonRight}
        onPress={() => {
          isLogin != null ? toProfile(dispatch) : toLogin();
        }}>
        <Text style={styles.text}>
          <Icon
            name="account-circle"
            size={25}
            color={nowTab === PROFILE_PATH ? active : pasive}
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    width: 'auto',
  },
  dialogContentView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    color: '#5F4E98',
    marginTop: 10,
  },

  buttonLeft: {
    width: '33.3%',
    height: 50,
    borderColor: 'white',
  },

  button: {
    width: '33%',
    height: 50,
    borderColor: 'white',
  },
  buttonRight: {
    width: '33%',
    height: 50,
    borderColor: 'white',
  },
});
export default BottomTabs;
