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
const UpploadPictureButtonComponent = ({uploadPicture}) => {
  const {selectFile, isLoading} = uploadPicture();
  return (
    <Button
      onPress={selectFile}
      variant="subtle"
      colorScheme="primary"
      size="xs"
      leftIcon={<Icon name="file-image-plus" size={15} color={'#06b6d4'} />}>
      {isLoading ? <ActivityIndicator /> : 'Edit Picture'}
    </Button>
  );
};

export default UpploadPictureButtonComponent;
