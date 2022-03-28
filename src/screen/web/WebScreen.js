import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import {setBrowsing} from '../../stores/techconnectAcademy/TechconnectAcademyAction';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HOME_PATH} from '../../navigation/NavigationPath';
import {goToScreen} from '../../navigation/NavigationHelper';
const WebScreen = ({route}) => {
  console.log('SEBENARNYA MASUK SINI SIH', route.params);
  //   setBrowsing(true);
  const active = '#6a00ff';
  const pasive = '#2b2c36';
  const [isVisible, setVisible] = useState(true);
  const handleClick = () => {
    setVisible(false);
    goToScreen(HOME_PATH, true);
  };
  return (
    <Modal animationType="slide" transparent={isVisible} visible={isVisible}>
      <View>
        <TouchableOpacity style={styles.buttonRight} onPress={handleClick}>
          <Text style={styles.text}>
            <Icon name="arrow-left-bold-circle" size={25} color={active} />
          </Text>
        </TouchableOpacity>
      </View>
      <WebView source={{uri: route.params}} style={{flex: 1, marginTop: 20}} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    borderTopStartRadius: 15,
    borderBottomStartRadius: 15,
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,
    backgroundColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
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
    width: '33%',
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
export default WebScreen;
