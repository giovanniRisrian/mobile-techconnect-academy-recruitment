import React from 'react';
import {useState} from 'react';
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
  setTab,
  showLoading,
} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
import {removeLocalData, storeLocalData} from '../../utils/localStorage';
import {VACANY_PATH} from '../../navigation/NavigationPath';
const LogoutButton = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    state => state.TechconnectAcademyReducer.isLoading,
  );
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
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

      dispatch(setTab(VACANY_PATH));
      dispatch(setProfile({}));
      dispatch(setLogin({}));
      dispatch(setProfile(null));
      dispatch(setLogin(null));
      await GoogleLogout();

      console.log('KEPENCENT');
      dispatch(setTab(VACANY_PATH));
      dispatch(setProfile({}));
      dispatch(setLogin({}));
      dispatch(setProfile(null));
      dispatch(setLogin(null));
      goToLogin();
    } catch (error) {
      console.log('eh masuk sinikah');
      dispatch(setProfile({}));
      dispatch(setLogin({}));

      dispatch(setTab(VACANY_PATH));
      dispatch(setProfile(null));
      dispatch(setLogin(null));
      goToLogin();
    }
  };
  const Logout = async () => {
    setIsLoadingLogout(true);
    await LogoutProccess();
    setIsLoadingLogout(false);
  };
  return (
    <View>
      {/*<TouchableOpacity style={styles.button} onPress={() => Logout()}>
        <Text style={styles.text}>Logout</Text>
  </TouchableOpacity>*/}
      <Button
        onPress={() => Logout()}
        variant="solid"
        colorScheme="primary"
        size="xs"
        leftIcon={<Icon name="logout" size={15} color={'#fdfefe'} />}>
        {/*leftIcon={<Icon name="logout" size={15} color={'#e74c3c'} />}*/}
        {/*variant="sublte"*/}
        {/*Logout*/}
        {isLoadingLogout ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.text}>Logout</Text>
        )}
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
    fontSize: 11,
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
