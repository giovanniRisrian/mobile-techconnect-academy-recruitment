import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

const VacancyDetailScreen = ({vacancy, route}) => {
  const {vacancyById, list, doApplyProgram} = vacancy();
  const data = useSelector(state => state.TechconnectAcademyReducer.isLogin);

  console.log(list);
  let dataApply = {
    ProgramId: route.params,
    ApplicantId: data.id,
  };

  const confirmationApply = () => {
    Alert.alert('Are you sure apply this program?', null, [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'OK', onPress: () => applyProgram()},
    ]);
  };

  const applyProgram = () => {
    if (list.ProgramTypeName === 'certification') {
      window.open(list.LinkCertification);
    } else {
      doApplyProgram(dataApply, data);
    }
  };

  useEffect(() => {
    vacancyById(route.params);
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>{list.ProgramName}</Text>
        <Text style={styles.contentTitle}>
          <Icon name="location" size={20} />
          <Text style={styles.address}> {list.ProgramLocation?.Address}</Text>
        </Text>
        <Text style={styles.contentTitle}>
          <Icon name="ios-calendar" size={20} />
          <Text style={styles.address}>
            {' '}
            {dayjs(list.ProgramActivity?.OpenDate).format('DD/MM/YYYY')} -{' '}
            {dayjs(list.ProgramActivity?.CloseDate).format('DD/MM/YYYY')}
          </Text>
        </Text>
        <Text style={{textAlign: 'left', marginTop: 20}}>
          <Text style={styles.address}>Requirements:</Text>
        </Text>
        <Text style={styles.listRequirement}>{list.Requirement}</Text>
        <Text style={{textAlign: 'left', marginTop: 10}}>
          <Text style={styles.address}>Description:</Text>
        </Text>
        <Text style={styles.listRequirement}>{list.Description}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => confirmationApply()}>
          <Text style={styles.textApply}>Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#ECE1EE',
  },
  content: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding: 30,
    justifyContent: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 24,
  },
  contentTitle: {
    textAlign: 'left',
  },
  button: {
    height: 40,
    backgroundColor: '#725AA4',
    alignItems: 'center',
    padding: 5,
    marginTop: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
  },
  address: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  listRequirement: {
    textAlign: 'justify',
    paddingTop: 10,
    marginLeft: 10,
    fontSize: 16,
  },
  textApply: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});

export default VacancyDetailScreen;
