import Icons from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import BeautyWebView from 'react-native-beauty-webview';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VacancyInfoModal = ({program, isVisible, setVisible, doApplyProgram}) => {
  const data = useSelector(state => state.TechconnectAcademyReducer.isLogin);
  const [isBrowsing, setBrowsing] = useState(false);
  let dataApply = {
    ProgramId: program.ID,
    ApplicantId: data?.id,
  };

  const handleClickBackBrowser = () => {
    setBrowsing(false);
    setVisible(!isVisible);
  };
  const openURL = async url => {
    // const isSupported = await Linking.canOpenURL(url);
    // if (isSupported) {
    //   await Linking.openURL(url);
    // } else {
    //   Alert.alert(`Don't know how to open this url: ${url}`);
    // }

    setBrowsing(true);
  };

  const confirmationApply = () => {
    Alert.alert('Are you sure apply this program?', '', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'OK', onPress: () => applytoProgram()},
    ]);
  };

  const applytoProgram = () => {
    if (program.ProgramTypeName === 'Certification') {
      openURL(program.LinkCertification);
    } else {
      doApplyProgram(dataApply, data);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setVisible(!isVisible);
      }}>
      {!isBrowsing ? (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>{program.ProgramName}</Text>
            <Text style={styles.locations}>
              <Text style={{color: '#5F4E98', marginTop: 2}}>
                <Icon name="tag" size={18} />
              </Text>
              {program?.ProgramTypeName?.toUpperCase()}
            </Text>
            <Text style={styles.locations}>
              <Icons name="location" size={20} color="#5F4E98" />
              <Text> {program.ProgramLocation?.Address}</Text>
            </Text>
            <Text style={styles.textDate}>
              <Icons name="ios-calendar" size={20} color="#5F4E98" />
              <Text>
                {' '}
                {dayjs(program.ProgramActivity?.OpenDate).format(
                  'DD/MM/YYYY',
                )}{' '}
                -{' '}
                {dayjs(program.ProgramActivity?.CloseDate).format('DD/MM/YYYY')}
              </Text>
            </Text>
            <Text style={styles.requirement}>
              <Text>Requirements:</Text>
            </Text>
            <Text>{program.Requirement}</Text>
            <Text style={styles.requirement}>
              <Text>Description:</Text>
            </Text>
            <Text>{program.Description}</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={styles.buttonBack}
                onPress={() => setVisible(!isVisible)}>
                <Text style={styles.textBack}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonApply}
                onPress={() => confirmationApply()}>
                <Text style={styles.textButton}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <BeautyWebView
          visible={isBrowsing} // Required for open and close
          onPressClose={handleClickBackBrowser} // Required for closing the modal
          url={program.LinkCertification}
          extraMenuItems={[
            {
              title: 'Extra Item',
              onPress: () => console.log('Extra Menu Item Clicked'),
            },
          ]}
        />
      )}
    </Modal>
  );
};
const stylesBrowser = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#2196f3',
    marginHorizontal: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  modalView: {
    backgroundColor: '#EEEEEE',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  locations: {
    fontSize: 16,
    marginTop: 10,
  },
  textDate: {
    fontSize: 16,
  },
  requirement: {
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 5,
    fontSize: 16,
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
});

export default VacancyInfoModal;
