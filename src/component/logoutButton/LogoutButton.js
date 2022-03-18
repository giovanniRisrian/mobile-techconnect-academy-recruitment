import React from 'react';
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

import {setLogin} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
const LogoutButton = () => {
  const dispatch = useDispatch();

  const Logout = () => {
    dispatch(setLogin({isLogin: null}));
    goToLogin();
  };
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => Logout()}>
        <Text style={styles.text}>Logout</Text>
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

  button: {
    backgroundColor: '#2b2c36',
    alignItems: 'center',
    margin: 12,
    padding: 12,
    borderRadius: 50,
    color: 'white',
  },
});

export default LogoutButton;
