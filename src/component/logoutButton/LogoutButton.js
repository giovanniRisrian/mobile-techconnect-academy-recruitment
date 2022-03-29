import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {goToLogin} from '../../navigation/NavigationHelper';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  setLogin,
  setProfile,
} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
import {removeLocalData, storeLocalData} from '../../utils/localStorage';
const LogoutButton = () => {
  const dispatch = useDispatch();
  const GoogleLogout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log('Logout Success');
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const LogoutProccess = async () => {
    try {
      console.log('Masuik sinikah');

      await removeLocalData();
      await GoogleLogout();

      console.log('KEPENCENT');
      dispatch(setProfile(null));
      dispatch(setLogin(null));
      goToLogin();
    } catch (error) {
      console.log('eh masuk sinikah');
      dispatch(setProfile(null));
      dispatch(setLogin(null));
      goToLogin();
    }
  };
  const Logout = () => {
    LogoutProccess();
  };
  return (
    <View>
      {/*<TouchableOpacity style={styles.button} onPress={() => Logout()}>
        <Text style={styles.text}>Logout</Text>
  </TouchableOpacity>*/}
      <Button
        onPress={() => Logout()}
        variant="solid"
        colorScheme="red"
        size="xs"
        leftIcon={<Icon name="logout" size={15} color={'#fdfefe'} />}>
        {/*leftIcon={<Icon name="logout" size={15} color={'#e74c3c'} />}*/}
        {/*variant="sublte"*/}
        Logout
      </Button>
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
