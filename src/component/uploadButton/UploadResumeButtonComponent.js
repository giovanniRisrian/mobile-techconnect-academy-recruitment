import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import {goToLogin} from '../../navigation/NavigationHelper';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {setLogin} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
const UpploadResumeButtonComponent = ({uploadResume}) => {
  const {selectFile, isLoading} = uploadResume();
  return (
    <Button
      onPress={selectFile}
      variant="subtle"
      colorScheme="primary"
      size="xs">
      {isLoading ? <ActivityIndicator /> : 'Upload Resume'}
    </Button>
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

export default UpploadResumeButtonComponent;
