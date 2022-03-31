import React, {useState} from 'react';
import {Alert} from 'react-native';
import {
  goToScreen,
  goToScreenWithParams,
} from '../../navigation/NavigationHelper';
import {
  HOME_PATH,
  PROFILE_PATH,
  VACANY_PATH,
} from '../../navigation/NavigationPath';
import {useDispatch} from 'react-redux';
import {
  setTab,
  showLoading,
} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useSelector} from 'react-redux';
import {showLoading as showLoadingProfile} from '../../stores/profile/ProfileAction'

export const Vacancy = service => {
  const [list, setList] = useState([]);
  const [typeProgram, setTypeProgram] = useState([]);
  const [types, setType] = useState('');
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  //const [name, setName] = useState('');
  let {getVacancyList, getVacancyId, applyProgram, getUserId, getType} =
    service();
  const isLoading = useSelector(
    state => state.TechconnectAcademyReducer.isLoading,
  );
  const userProfile = useSelector(
    state => state.TechconnectAcademyReducer.userProfile,
  );
  let name = userProfile?.Personal?.Name.split(' ')[0];
  const allVacancy = async (name, type) => {
    //setName(userProfile.Personal.Name.split(' ')[0]);
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
      let data = userProfile;
      let counter = 0;
      let arrayNotFill = [];
      if (data.Personal.Name) {
        counter += 1;
      } else {
        arrayNotFill.push('Name');
      }
      if (data.Personal.Email) {
        counter += 1;
      } else {
        arrayNotFill.push('Email');
      }
      if (data.Personal.Domicile) {
        counter += 1;
      } else {
        arrayNotFill.push('Domicile');
      }
      if (data.Personal.TelephoneNo) {
        counter += 1;
      } else {
        arrayNotFill.push('Phone');
      }
      if (data.Personal.BirthDate) {
        counter += 1;
      } else {
        arrayNotFill.push('BirthDate');
      }
      if (data.Personal.Gender) {
        counter += 1;
      } else {
        arrayNotFill.push('Gender');
      }
      if (data.SkillSet[0].Skill) {
        counter += 1;
      } else {
        arrayNotFill.push('Skill');
      }
      if (data.Education[0].Title) {
        counter += 1;
      } else {
        arrayNotFill.push('Education Title');
      }
      if (data.Education[0].Major) {
        counter += 1;
      } else {
        arrayNotFill.push('Education Major');
      }
      if (data.Education[0].Institution) {
        counter += 1;
      } else {
        arrayNotFill.push('Education Institution');
      }
      if (data.Education[0].YearIn) {
        counter += 1;
      } else {
        arrayNotFill.push('Education Year In');
      }
      if (data.Education[0].YearOut) {
        counter += 1;
      } else {
        arrayNotFill.push('Education Year Out');
      }
      if (data.Education[0].GPA) {
        counter += 1;
      } else {
        arrayNotFill.push('Education GPA');
      }
      console.log('SEBELUM IF COUNTER >= 13');
      if (counter >= 13) {
        return true;
      } else {
        return {status: false, notFill: arrayNotFill};
      }
    } catch (err) {
      console.log(
        '********************* INI ERROR PAS RETURN STATUS ***********',
      );
      console.log(err);
      throw err;
    }
  };

  const doApplyProgram = async (value, context) => {
    try {
      const config = {
        headers: {Authorization: `Bearer ${context.token}`},
      };
      let res;
      let status = await getUserbyId(config);
      console.log('ini status await getUserById');
      console.log(status);
      if (status === true) {
        // console.log("hasilnya applynya",value);
        //console.log('contextnyaa', context);
        // console.log("contextnyaa",config);
        console.log('Bawah if status === true');
        res = await applyProgram(value, config);
        console.log('hasilnyaaa', res);
        Alert.alert('Success', null, [
          {
            text: 'OK',
            onPress: () => {
              dispatch(setTab(HOME_PATH));
              goToScreenWithParams(HOME_PATH, context.id, true);
            },
          },
        ]);
      } else {
        let threeMandatoryField = '';
        if (status.notFill.length >= 3) {
          threeMandatoryField = `${status.notFill[0]},${status.notFill[1]},${status.notFill[2]} ,etc. Mandatory field shown by * symbol`;
        } else if (status.notFill.length == 2) {
          threeMandatoryField = `${status.notFill[0]},${status.notFill[1]}`;
        } else if (status.notFill.length == 1) {
          threeMandatoryField = `${status.notFill[0]}`;
        }
        console.log('ini three Mandatory Field');
        console.log(threeMandatoryField);
        Alert.alert(
          `You must filled mandatory field`,
          `Unfilled fields are ${threeMandatoryField}`,
          [
            {
              text: 'OK',
              onPress: () => {
                dispatch(setTab(PROFILE_PATH));
                dispatch(showLoadingProfile(true));
                goToScreenWithParams(PROFILE_PATH, true, false);
              },
            },
          ],
        );
      }

      return res;
    } catch (err) {
      Alert.alert('Error', 'You have been apply this program', [
        {
          text: 'OK',
          onPress: () => goToScreen(VACANY_PATH, true),
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
