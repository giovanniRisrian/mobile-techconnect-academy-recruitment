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
import ListProgramApplyScreen from '../applicant/status/listProgramApply/ListProgramApplyScreen';
import ListProgramApply from '../applicant/status/listProgramApply/ListProgramApply';
import StatusService from '../../service/StatusService';
const HomeScreen = () => {
  return (
    <View style={styles.program}>
      <ListProgramApplyScreen bloc={() => ListProgramApply(StatusService)}/>
    </View>
  );
};

const styles=StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
  },
  program:{
      flex:1,
      backgroundColor:'#ECE1EE'
  }
})
export default HomeScreen;
