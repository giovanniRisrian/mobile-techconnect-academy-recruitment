import React from 'react';
import {Fragment, useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
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
const StatusRecruitmentScreen = ({bloc, route}) => {
  let {statusProgram, loading, navigate, getStatusbyId} = bloc();
  const isLogin = useSelector(state => state.TechconnectAcademyReducer.isLogin);
  let id = isLogin.id;
  const programId = route?.params.programId;
  const statusApply = statusProgram?.ApplyProcess?.SelectionProcessId;
  let selectionProcessStatus;
  if (statusApply == 1) {
    selectionProcessStatus = 0;
  } else if (statusApply == 2) {
    selectionProcessStatus = 1;
  } else if (statusApply == 3) {
    selectionProcessStatus = 2;
  } else if (statusApply == 4) {
    selectionProcessStatus = 3;
  } else if (statusApply == 5) {
    selectionProcessStatus = 4;
  }
  useEffect(() => {
    getStatusbyId(programId, id, isLogin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line no-undef
  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    },
  };
  return (
    <SafeAreaView style={styles.statusProgram}>
      <View>
        <Text style={styles.titleText}>Program</Text>
        <Text style={styles.titleText}>Applied Details</Text>
      </View>
      <View style={styles.containerProgramDetails}>
        <Text style={styles.programName}>
          {statusProgram?.ProgramPost?.ProgramName}
        </Text>
        <Text style={styles.programTypeNameandDate}>
          {statusProgram?.ProgramPost?.ProgramTypeName}
        </Text>
        <Text style={styles.programTypeNameandDate}>
          {statusProgram?.ProgramPost?.ProgramLocation?.Address}
        </Text>
        <Text style={styles.programTypeNameandDate}>
          Open Date :
          {dayjs(statusProgram.ProgramPost?.ProgramActivity?.OpenDate).format(
            'DD-MM-YYYY',
          )}
        </Text>
        <Text style={styles.programTypeNameandDate}>
          Close Date :
          {dayjs(statusProgram.ProgramPost?.ProgramActivity?.CloseDate).format(
            'DD-MM-YYYY',
          )}
        </Text>
      </View>
      <View>
        <Text style={styles.titleText}>Apply Status</Text>
        <Text style={styles.programTypeNameandDate}>
          {statusProgram?.ApplyProcess?.SelectionProcessId}
        </Text>
      </View>
      <View style={{flex: 1, marginTop: 20, flexDirection: 'column'}}>
        <ProgressSteps
          activeStep={selectionProcessStatus}
          activeStepIconBorderColor="blue"
          activeStepIconColor="blue"
          activeLabelColor="black"
          activeStepNumColor="white"
          disabledStepIconColor="gray"
          progressBarColor="gray"
          labelColor="gray"
          completedLabelColor="#4bb543"
          labelFontFamily="Montserrat Alternates"
          labelFontSize={8}>
          <ProgressStep
            //label="First"
            label="Administration"
            removeBtnRow={true}></ProgressStep>
          <ProgressStep
            //label="Second"
            label="Assessment"
            removeBtnRow={true}></ProgressStep>
          <ProgressStep
            //label="Third"
            label="Interview"
            removeBtnRow={true}></ProgressStep>
          <ProgressStep
            //label="Fourth"
            label="Offering Letter"
            removeBtnRow={true}></ProgressStep>
          <ProgressStep
            //label="Fifth"
            label="Welcome To SMM"
            removeBtnRow={true}></ProgressStep>
        </ProgressSteps>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerProgramDetails: {
    backgroundColor: 'white',
    padding: 6,
    margin: 6,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderRadius: 10,
  },
  statusProgram: {
    flex: 1,
    backgroundColor: '#ECE1EE',
  },
  container: {
    backgroundColor: 'aqua',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: 'Montserrat',
    fontSize: 36,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    color: '#666666',
  },
  programName: {
    fontSize: 18,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    textAlign: 'center',
    color: 'black',
  },
  programTypeNameandDate: {
    marginTop: 20,
    fontSize: 14,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    color: 'black',
  },
});

export default StatusRecruitmentScreen;
