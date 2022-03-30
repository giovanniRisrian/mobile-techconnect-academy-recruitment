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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import {goToLogin} from '../../navigation/NavigationHelper';
import {setLogin} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
const UpploadPictureButtonComponent = ({uploadPicture, propsPicture}) => {
  const {selectFile, isLoading} = uploadPicture();
  return (
    <TouchableOpacity onPress={selectFile}>
      <Text>{isLoading ? <ActivityIndicator /> : propsPicture()}</Text>
    </TouchableOpacity>
  );
};

export default UpploadPictureButtonComponent;
