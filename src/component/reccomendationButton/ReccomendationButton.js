import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {goToScreenWithParams} from '../../navigation/NavigationHelper';
import jwt_decode from 'jwt-decode';
import {
  HOME_PATH,
  PROFILE_PATH,
  VACANY_PATH,
} from '../../navigation/NavigationPath';
import {Alert} from 'react-native';
import {setTab} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
const ReccomendationButton = service => {
  const {postGetDataByListId, getJobReccomendationId} = service();
  const isLogin = useSelector(state => state.TechconnectAcademyReducer.isLogin);

  let dispatch = useDispatch();
  const doReccomendation = async () => {
    // console.log('isLogin Adalah');
    // console.log(isLogin);
    let userInfo = jwt_decode(isLogin.token);
    console.log(userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${isLogin.token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    //console.log('ini config', config);
    let resp = await getJobReccomendationId(config);
    //console.log('ini response get job recommendation', resp);
    //console.log('test akses resp.status', resp.status);
    if (resp.status !== undefined) {
      console.log('ini resp status', resp.status);
      let resp2 = await postGetDataByListId({ID: resp.data}, config);
      console.log('RESPONSENYADALAH:');
      console.log(resp2.data);

      dispatch(setTab(VACANY_PATH));
      goToScreenWithParams(VACANY_PATH, {ProgramList: resp2.data}, false);
    } else {
      Alert.alert(
        'You Never Upload CV',
        'Click Ok To Go To Upload CV Screen ',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(setTab(PROFILE_PATH));
              goToScreenWithParams(PROFILE_PATH, false, false);
            },
          },
        ],
      );
    }
    /*try {
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
      console.log('ini error di catch', err);
      Alert.alert('You Never Upload CV');
    }*/
  };
  return {doReccomendation};
};

export default ReccomendationButton;
