import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {goToScreenWithParams} from '../../navigation/NavigationHelper';
import jwt_decode from 'jwt-decode';
import {HOME_PATH, VACANY_PATH} from '../../navigation/NavigationPath';
import {Alert} from 'react-native';
import { setTab } from '../../stores/techconnectAcademy/TechconnectAcademyAction';
const ReccomendationButton = service => {
  const {postGetDataByListId, getJobReccomendationId} = service();
  const isLogin = useSelector(state => state.TechconnectAcademyReducer.isLogin);

  let dispatch = useDispatch();
  const doReccomendation = async () => {
    // console.log('isLogin Adalah');
    // console.log(isLogin);
    let userInfo = jwt_decode(isLogin.token);
    // console.log(userInfo);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${isLogin.token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      let resp = await getJobReccomendationId(config);
      //   console.log(resp.data.data);
      //   console.log('OIIII');
      let resp2 = await postGetDataByListId({ID: resp.data}, config);
      console.log('RESPONSENYADALAH:');
      console.log(resp2.data);

      dispatch(setTab(VACANY_PATH));
      goToScreenWithParams(VACANY_PATH, {ProgramList: resp2.data}, false);
    } catch (err) {
      //   alert(err);
      Alert.alert('You Never Upload CV');
    }
  };
  return {doReccomendation};
};

export default ReccomendationButton;
