import {
  Image,
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import UpploadResumeButtonComponent from '../../component/uploadButton/UploadResumeButtonComponent';
import UploadResumeButton from '../../component/uploadButton/UploadResumeButton';
import UploadResumeService from '../../service/UploadFileService';
import ReccomendationButtonComponent from '../../component/reccomendationButton/ReccomendationButtonComponent';
import ReccomendationButton from '../../component/reccomendationButton/ReccomendationButton';
import ListProgramApplyScreen from '../applicant/status/listProgramApply/ListProgramApplyScreen';
import ListProgramApply from '../applicant/status/listProgramApply/ListProgramApply';
import StatusService from '../../service/StatusService';
const HomeScreen = () => {
  return (
    <View style={styles.program}>
      <ListProgramApplyScreen bloc={() => ListProgramApply(StatusService)} />
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
    justifyContent: 'center',
  },
  program: {
    flex: 1,
    backgroundColor: '#ECE1EE',
  },
});
export default HomeScreen;
