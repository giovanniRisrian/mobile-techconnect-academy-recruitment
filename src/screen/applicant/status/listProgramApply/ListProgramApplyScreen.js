import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Fragment, useContext, useEffect} from 'react';
import {goToLogin, goToScreen} from '../../../../navigation/NavigationHelper';
import {VACANY_PATH} from '../../../../navigation/NavigationPath';
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
  const toVacany = () => {
    goToScreen(VACANY_PATH, true);
  };
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
      {list?.ProgramInfo !== null ? (
        <View>
          <Text style={styles.programApplied}>Program</Text>
          <Text style={styles.programApplied}>Applied</Text>
          <View style={styles.listAppliedProgram}>{listAppliedProgram}</View>
        </View>
      ) : (
        <View>
          <Text style={styles.oops}>OOPS!!!</Text>
          <Text style={styles.dontHaveProgram}>You don't have any</Text>
          <Text style={styles.dontHaveProgram}>Applied Program yet</Text>
          <Image
            style={styles.image}
            source={require('../../../../assets/images/emptyJobApplied.png')}
            alt="splash-screen"
          />
          <TouchableOpacity style={styles.button} onPress={() => toVacany()}>
            <Text style={styles.text}> Go To Program List </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: 'white',
  },
  button: {
    backgroundColor: '#E60965',
    alignItems: 'center',
    margin: 12,
    padding: 12,
    borderRadius: 50,
    color: 'white',
  },
  image: {
    width: null,
    resizeMode: 'contain',
    height: 300,
  },
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
  dontHaveProgram: {
    fontFamily: 'Montserrat',
    fontSize: 36,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    color: '#CE49BF',
  },
  oops: {
    fontFamily: 'Montserrat',
    fontSize: 36,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    color: '#E60965',
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
