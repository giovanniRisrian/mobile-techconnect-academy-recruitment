import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import UpploadResumeButtonComponent from '../../component/uploadButton/UploadResumeButtonComponent';
import UploadResumeButton from '../../component/uploadButton/UploadResumeButton';
import UploadResumeService from '../../service/UploadFileService';
import ReccomendationButtonComponent from '../../component/reccomendationButton/ReccomendationButtonComponent';
import ReccomendationButton from '../../component/reccomendationButton/ReccomendationButton';
const HomeScreen = () => {
  return (
    <View>
      <UpploadResumeButtonComponent
        uploadResume={() => UploadResumeButton(UploadResumeService)}
      />
      <ReccomendationButtonComponent
        reccomendationButton={() => ReccomendationButton(UploadResumeService)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE1EE',
  },
});
export default HomeScreen;
