import {View, Text} from 'react-native';
import React from 'react';
import UpploadResumeButtonComponent from '../../component/uploadButton/UploadResumeButtonComponent';
import UploadResumeButton from '../../component/uploadButton/UploadResumeButton';
import UploadResumeService from '../../service/UploadFileService';
const HomeScreen = () => {
  return (
    <View>
      <UpploadResumeButtonComponent
        uploadResume={() => UploadResumeButton(UploadResumeService)}
      />
    </View>
  );
};
export default HomeScreen;
