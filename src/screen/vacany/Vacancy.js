import React, {useState} from 'react';
import {Alert} from 'react-native';
import {goToScreenWithParams} from '../../navigation/NavigationHelper';
import {HOME_PATH, PROFILE_PATH} from '../../navigation/NavigationPath';
import {useDispatch} from 'react-redux';
import {showLoading} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useSelector} from 'react-redux';
export const Vacancy = service => {
  const [list, setList] = useState([]);
  const [typeProgram, setTypeProgram] = useState([]);
  const [types, setType] = useState('');
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  let {getVacancyList, getVacancyId, applyProgram, getUserId, getType} =
    service();
  const isLoading = useSelector(
    state => state.TechconnectAcademyReducer.isLoading,
  );
  const userProfile = useSelector(
    state => state.TechconnectAcademyReducer.userProfile,
  );
  const allVacancy = async (name, type) => {
    setName(userProfile.Personal.Name.split(' ')[0]);
    try {
      dispatch(showLoading(true));
      const response = await getVacancyList(name, type);
      setList(response.data);
      dispatch(showLoading(false));
    } catch (err) {
      dispatch(showLoading(false));
      throw err;
    }
  };

  const getTypeProgram = async () => {
    try {
      const response = await getType();
      setTypeProgram(response.data);
    } catch (err) {
      throw err;
    }
  };

  const searchByName = text => {
    if (text) {
      dispatch(showLoading(true));
      allVacancy(text, '');
      setSearch(text);
      dispatch(showLoading(false));
    } else {
      dispatch(showLoading(true));
      setList(list);
      setSearch(text);
      dispatch(showLoading(false));
    }
  };

  const vacancyById = async id => {
    try {
      dispatch(showLoading(true));
      const response = await getVacancyId(id);
      setList(response.data);
      dispatch(showLoading(false));
    } catch (err) {
      dispatch(showLoading(false));
      throw err;
    }
  };

  const getUserbyId = async context => {
    try {
      let res = await getUserId(context);
      let data = res.data;
      let counter = 0;
      if (data.Personal.Name) {
        counter += 1;
      }
      if (data.Personal.Email) {
        counter += 1;
      }
      if (data.Personal.Domicile) {
        counter += 1;
      }
      if (data.Personal.TelephoneNo) {
        counter += 1;
      }
      if (data.Personal.BirthDate) {
        counter += 1;
      }
      if (data.Personal.Gender) {
        counter += 1;
      }
      if (data.SkillSet[0].Skill) {
        counter += 1;
      }
      if (data.Education[0].Title) {
        counter += 1;
      }
      if (data.Education[0].Major) {
        counter += 1;
      }
      if (data.Education[0].Institution) {
        counter += 1;
      }
      if (data.Education[0].YearIn) {
        counter += 1;
      }
      if (data.Education[0].YearOut) {
        counter += 1;
      }
      if (data.Education[0].GPA) {
        counter += 1;
      }
      if (counter >= 13) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  };

  const doApplyProgram = async (value, context) => {
    try {
      const config = {
        headers: {Authorization: `Bearer ${context.token}`},
      };
      let status = await getUserbyId(config);
      let res;
      if (status === true) {
        res = await applyProgram(value, config);
        Alert.alert('Success', null, [
          {
            text: 'OK',
            onPress: () => goToScreenWithParams(HOME_PATH, context.id, true),
          },
        ]);
      } else {
        Alert.alert('You must filled mandatory field', null, [
          {
            text: 'OK',
            onPress: () => goToScreenWithParams(PROFILE_PATH, context.id, true),
          },
        ]);
      }
      return res;
    } catch (err) {
      Alert.alert('You have been apply this program', null, [
        {
          text: 'OK',
          onPress: () => null,
        },
      ]);
      throw err;
    }
  };

  return {
    allVacancy,
    list,
    vacancyById,
    doApplyProgram,
    setList,
    search,
    searchByName,
    getTypeProgram,
    types,
    typeProgram,
    setType,
    isLoading,
    name,
  };
};
