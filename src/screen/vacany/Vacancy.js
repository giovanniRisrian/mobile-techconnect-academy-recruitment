import React,{ useState } from "react";
import { Alert } from "react-native";
import { goToScreenWithParams } from "../../navigation/NavigationHelper";
import { HOME_PATH, PROFILE_PATH } from "../../navigation/NavigationPath";
import {useDispatch} from 'react-redux';
import { showLoading } from "../../stores/techconnectAcademy/TechconnectAcademyAction";

export const Vacancy = (service) => {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState(false)
  const dispatch = useDispatch()
  let { getVacancyList, getVacancyId, applyProgram, getUserId } = service();
  const allVacancy = async () => {
    try {
      dispatch(showLoading(true))
      const response = await getVacancyList();
      setList(response.data);
      dispatch(showLoading(false))
    } catch (err) {
      throw err;
    }
  };

  const vacancyById = async (id) => {
    try {
      dispatch(showLoading(true))
      const response = await getVacancyId(id);
      setList(response.data);
      dispatch(showLoading(false))
    } catch (err) {
      throw err;
    }
  };

  const getUserbyId = async(context) => {
    try{
      let res = await getUserId(context)
      let data = res.data
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
      if(data.SkillSet[0].Skill){
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
  }

  const doApplyProgram = async(value, context) => {
    try{
      const config = {
        headers: { Authorization: `Bearer ${context.token}` },
      };
      let status = await getUserbyId(config)
      let res;
      if(status === true){
        res = await applyProgram(value, config);
        Alert.alert('Success', null,  [{ text: "OK", onPress: () => goToScreenWithParams(HOME_PATH,context.id,true) }])
      }else{
        Alert.alert('You must filled mandatory field', null,  [{ text: "OK", onPress: () => goToScreenWithParams(PROFILE_PATH,context.id,true) }])

      }
      return res
    }catch(err){
     Alert.alert('You have already apply this program')
      throw err;
    }
  }


  return {
    allVacancy,
    list,
    vacancyById,
    doApplyProgram
  };
};
