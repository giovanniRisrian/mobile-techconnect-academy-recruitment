import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Fragment, useContext, useEffect, useState} from 'react';
import {goToLogin, goToScreen} from '../../../../navigation/NavigationHelper';
import {VACANY_PATH} from '../../../../navigation/NavigationPath';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import {Button} from 'native-base';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {setTab} from '../../../../stores/techconnectAcademy/TechconnectAcademyAction';

const ListProgramApplyScreen = ({bloc}) => {
  const {list, getListAppliedProgram, goToDetailStatus, navigate, loading} =
    bloc();
  const isLogin = useSelector(state => state.TechconnectAcademyReducer.isLogin);
  const [nowTab, setNowTab] = useState(
    useSelector(state => state.TechconnectAcademyReducer.nowTab),
  );
  const [show, setShow] = useState(false);
  const toVacany = setNowTab => {
    setTab(VACANY_PATH);
    setNowTab(VACANY_PATH);
    goToScreen(VACANY_PATH, false);
  };
  console.log('list apply', list.ProgramInfo);
  console.log('panjang list apply', list?.ProgramInfo?.length);
  const lenProgramInfo = list?.ProgramInfo?.length;
  useEffect(() => {
    if (isLogin) getListAppliedProgram(isLogin.id, isLogin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let listAppliedProgram =
    list?.ProgramInfo &&
    list.ProgramInfo.map((value, idx) => {
      const statusApply = value?.ProgramApplicant?.SelectionProcessId;
      let selectionProcessStatus;
      if (statusApply == 1) {
        selectionProcessStatus = 'Administration';
      } else if (statusApply == 2) {
        selectionProcessStatus = 'Assessment';
      } else if (statusApply == 3) {
        selectionProcessStatus = 'Interview';
      } else if (statusApply == 4) {
        selectionProcessStatus = 'Offering Letter';
      } else if (statusApply == 5) {
        selectionProcessStatus = 'Welcome To SMM';
      }
      return (
        <SafeAreaView key={idx} style={styles.containerProgram}>
          <View>
            <Text onPress={() => setShow(true)} style={styles.programName}>
              {value.Program.ProgramName}
            </Text>
            <Text style={styles.location}>
              <Text style={{color: '#5F4E98', marginTop: 2}}>
                <Icon name="tag" size={18} />
              </Text>
              <Text style={styles.programTypeNameandDate}>
                {'   '}
                {value.Program.ProgramTypeName.toUpperCase()}
              </Text>
            </Text>
            <Text style={styles.location}>
              <Icons name="ios-calendar" size={20} color="#5F4E98" />
              <Text style={styles.programTypeNameandDate}>
                {'  '}
                {dayjs(value?.Program?.ProgramActivity.OpenDate).format(
                  'DD/MM/YYYY',
                )}
                -{' '}
                {dayjs(value?.program?.ProgramActivity.CloseDate).format(
                  'DD/MM/YYYY',
                )}
              </Text>
            </Text>
            <Text style={styles.location}>
              <Icons name="information-circle" size={20} color="#5F4E98" />
              <Text style={styles.programTypeNameandDate}>
                {'  '}
                {value?.ProgramApplicant?.ProcessStatus}
              </Text>
            </Text>
            <Text style={styles.location}>
              <Icon name="progress-check" size={20} color="#5F4E98" />
              <Text style={styles.programTypeNameandDate}>
                {'  '}
                {selectionProcessStatus}
                {' ('} {statusApply} {'/ 5)'}
              </Text>
            </Text>
            {/*<TouchableOpacity
              style={styles.buttonDetails}
              onPress={() => goToDetailStatus({programId: value.Program.ID})}>
              <Text style={styles.details}>Details</Text>
              </TouchableOpacity>*/}
          </View>
          <Modal transparent={true} visible={show}>
            <View
              style={{
                backgroundColor: 'transparent',
                flex: 1,
              }}>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  flex: 1,
                  marginTop: 85,
                  padding: 40,
                  borderTopLeftRadius: 25,
                  borderTopRightRadius: 25,
                  height: 170,
                  width: 400,
                }}>
                <View>
                  <Text style={styles.programNameModal}>
                    {value.Program.ProgramName}
                  </Text>
                  <Text style={styles.location}>
                    <Text style={{color: '#5F4E98', marginTop: 2}}>
                      <Icon name="tag" size={18} />
                    </Text>
                    <Text style={styles.programTypeNameandDate}>
                      {'   '}
                      {value.Program.ProgramTypeName.toUpperCase()}
                    </Text>
                  </Text>
                  <Text style={styles.location}>
                    <Text style={{color: '#5F4E98', marginTop: 2}}>
                      <Icons name="location" size={18} />
                    </Text>
                    <Text style={styles.programTypeNameandDate}>
                      {'   '}
                      {value?.Program?.ProgramLocation?.Address}
                    </Text>
                  </Text>
                  <Text style={styles.location}>
                    <Icons name="ios-calendar" size={20} color="#5F4E98" />
                    <Text style={styles.programTypeNameandDate}>
                      {'  '}
                      {dayjs(value?.Program?.ProgramActivity.OpenDate).format(
                        'DD/MM/YYYY',
                      )}
                      -{' '}
                      {dayjs(value?.program?.ProgramActivity.CloseDate).format(
                        'DD/MM/YYYY',
                      )}
                    </Text>
                  </Text>
                  <Text style={styles.location}>Requirements:</Text>
                  <Text style={styles.requirement}>
                    {value?.Program?.Requirement}
                  </Text>
                  <Text style={styles.location}>Description:</Text>
                  <Text style={styles.requirement}>
                    {value?.Program?.Description}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    style={styles.buttonBack}
                    onPress={() => setShow(false)}>
                    <Text style={styles.textBack}>Back</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      );
    });
  return (
    <SafeAreaView style={styles.program}>
      {list?.ProgramInfo !== null ? (
        lenProgramInfo === 1 ? (
          <View>
            <Text style={styles.programAppliedOne}>Program Applied</Text>
            <View style={styles.listAppliedOneProgram}>
              {listAppliedProgram}
            </View>
            <Text style={styles.searchMoreProgram}>
              You've been applied for 1 program.
            </Text>
            <Text style={styles.searchMoreProgram}>
              You can find more program to be applied{' '}
              <Text
                onPress={() => toVacany(setNowTab)}
                style={styles.searchMoreProgramHere}>
                here
              </Text>
            </Text>
            <Image
              style={styles.imageOneProgram}
              source={require('../../../../assets/images/Search-rafiki.png')}
              alt="splash-screen"
            />
          </View>
        ) : (
          <View>
            <Text style={styles.programApplied}>Program Applied</Text>
            <View style={styles.listAppliedProgram}>{listAppliedProgram}</View>
          </View>
        )
      ) : (
        <View style={styles.viewProgram}>
          <Text style={styles.dontHaveProgram}>You don't have any</Text>
          <Text style={styles.dontHaveProgram}>Applied Program yet</Text>
          <Image
            style={styles.imageZeroProgram}
            source={require('../../../../assets/images/Nodata-pana.png')}
            alt="splash-screen"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E60965',
    alignItems: 'center',
    margin: 12,
    padding: 12,
    borderRadius: 50,
    color: 'white',
  },
  buttonBack: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    width: '50%',
    borderColor: '#5F4E98',
    borderWidth: 4,
  },
  buttonApply: {
    backgroundColor: '#5F4E98',
    borderRadius: 10,
    width: '50%',
    marginLeft: 20,
    padding: 5,
  },
  buttonDetails: {
    backgroundColor: '#725AA4',
    alignItems: 'flex-start',
    margin: 6,
    padding: 6,
    marginRight: 270,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  containerProgram: {
    backgroundColor: 'white',
    padding: 6,
    margin: 6,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 25,
    borderColor: 'black',
    borderRadius: 10,
  },
  details: {
    color: '#FFFFFF',
    alignSelf: 'center',
  },
  dontHaveProgram: {
    fontFamily: 'monospace',
    fontSize: 28,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    color: '#5F4E98',
    marginTop: 10,
  },
  imageOneProgram: {
    width: null,
    resizeMode: 'contain',
    height: 260,
    marginTop: 10,
    marginBottom: -30,
  },
  imageZeroProgram: {
    width: null,
    resizeMode: 'contain',
    height: 450,
  },
  listAppliedProgram: {
    marginTop: 20,
  },
  listAppliedOneProgram: {
    marginTop: -20,
  },
  location: {
    fontSize: 14,
    marginRight: 10,
    marginTop: 10,
    color: 'black',
  },
  oops: {
    fontFamily: 'Montserrat',
    fontSize: 28,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    color: '#5F4E98',
  },
  programApplied: {
    fontFamily: 'Montserrat',
    fontSize: 40,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    color: '#666666',
    marginTop: 40,
  },
  programAppliedOne: {
    fontFamily: 'Montserrat',
    fontSize: 40,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    color: '#666666',
    marginTop: 10,
  },
  program: {
    backgroundColor: '#ECE1EE',
  },
  programName: {
    fontSize: 20,
    color: '#000000',
  },
  programNameModal: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
    marginTop: -15,
  },
  programTypeNameandDate: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  requirement: {
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    color: '#2c3e50',
  },
  searchMoreProgram: {
    fontFamily: 'monospace',
    fontSize: 18,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    textAlign: 'center',
    color: '#5F4E98',
    marginTop: 10,
  },
  searchMoreProgramHere: {
    fontFamily: 'monospace',
    fontSize: 18,
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    textAlign: 'center',
    color: '#5F4E98',
    marginTop: 0,
    textDecorationLine: 'underline',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
  },
  textBack: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
  },
  viewProgram: {
    marginTop: 30,
  },
});

export default ListProgramApplyScreen;
