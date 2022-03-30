import {
  Image,
  SafeAreaView,
  Text,
  View,
  ScrollView,
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
import LogoutButton from '../../component/logoutButton/LogoutButton';
const HomeScreen = () => {
  return (
    <ScrollView style={styles.program}>
      <ListProgramApplyScreen bloc={() => ListProgramApply(StatusService)} />
      <View style={styles.recommendationButton}>
        <ReccomendationButtonComponent
          reccomendationButton={() => ReccomendationButton(UploadResumeService)}
        />
      </View>
      {/*<LogoutButton />*/}
      {/* <UpploadResumeButtonComponent
        uploadResume={() => UploadResumeButton(UploadResumeService)}
      /> */}
    </ScrollView>
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
  recommendationButton: {
    marginTop: 15,
  },
});
export default HomeScreen;
