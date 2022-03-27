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
import {setLogin} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
const UpploadPictureButtonComponent = ({uploadPicture}) => {
  const {selectFile, isLoading} = uploadPicture();
  return (
    <Button
      onPress={selectFile}
      variant="subtle"
      colorScheme="primary"
      size="xs">
      {isLoading ? <ActivityIndicator /> : 'Edit Picture'}
    </Button>
  );
};

export default UpploadPictureButtonComponent;
