import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Fragment, useContext, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
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

const ListProgramApplyScreen = ({bloc}) => {
  const {list, getListAppliedProgram, goToDetailStatus, navigate, loading} =
    bloc();
  const isLogin = useSelector(state => state.TechconnectAcademyReducer.isLogin);
  console.log('ini list program info');
  console.log(list.ProgramInfo);

  useEffect(() => {
    if (isLogin) getListAppliedProgram(isLogin.id, isLogin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ProgramPosts ganti jadi ProgramInfo
  // value.ProgramName jadi value.Program.ProgramName
  let listAppliedProgram =
    list?.ProgramInfo &&
    list.ProgramInfo.map((value, idx) => {
      return (
        <SafeAreaView key={idx} style={styles.containerProgram}>
          <View>
            <Text style={styles.programName}>{value.Program.ProgramName}</Text>
            <TouchableOpacity
              style={styles.buttonDetails}
              onPress={() => goToDetailStatus({programId: value.Program.ID})}>
              <Text style={styles.details}>Details</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    });
  return (
    <SafeAreaView style={styles.program}>
      <Text style={styles.programApplied}>Program</Text>
      <Text style={styles.programApplied}>Applied</Text>
      <View style={styles.listAppliedProgram}>{listAppliedProgram}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listAppliedProgram: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  details: {
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  programApplied: {
    fontFamily: 'Montserrat',
    fontSize: 36,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    color: '#666666',
  },
  program: {
    backgroundColor: '#ECE1EE',
  },
  programName: {
    fontSize: 14,
    color: '#000000',
  },
  buttonDetails: {
    backgroundColor: '#725AA4',
    alignItems: 'flex-start',
    margin: 6,
    padding: 6,
    marginRight: 270,
    borderRadius: 10,
  },
  containerProgram: {
    backgroundColor: 'white',
    padding: 6,
    margin: 6,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderRadius: 10,
  },
});

export default ListProgramApplyScreen;
