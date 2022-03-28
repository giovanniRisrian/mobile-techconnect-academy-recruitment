import React, {useReducer, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import ReactNativeBlobUtil from 'react-native-blob-util';
import base64 from 'react-native-base64';
// import RNFetchBlob from 'react-native-fetch-blob';
// import Blob from 'fetch-blob';
// import {Blob} from 'fetch-blob';
import {useDispatch, useSelector} from 'react-redux';
import {setProfile} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
import {showLoading} from '../../stores/profile/ProfileAction';
import {goToScreen} from '../../navigation/NavigationHelper';
import { PROFILE_PATH } from '../../navigation/NavigationPath';
const UploadPictureButton = service => {
  const {
    callUploadPictureService,
    postGetDataByListId,
    putUpdateProfile,
    getDataApplicantbyId,
  } = service();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const dispatch = useDispatch();
  const [singleFile, setSingleFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const isLogin = useSelector(state => state.TechconnectAcademyReducer.isLogin);
  const doUpload = async file => {
    // setLoading(true);
    dispatch(showLoading(true));
    console.log('SIngle File : ', file);
    console.log(isLogin);

    var formData = new FormData();

    formData.append('data', true);
    formData.append('file', {
      name: file.name,
      type: file.type,
      uri: file.uri,
    });

    try {
      console.log(file.uri);
      const header = {
        Authorization: `Bearer ${isLogin.token}`,
        'Content-Type': 'multipart/form-data',
      };
      const resp = await callUploadPictureService(formData, header);
      console.log('responsenya yaitu :', resp);
      const config = {
        headers: {
          Authorization: `Bearer ${isLogin.token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      let resp2 = await getDataApplicantbyId(config);
      dispatch(setProfile(resp2.data));
      // setLoading(false);
      dispatch(showLoading(false));
      goToScreen(PROFILE_PATH, true);
      // alert('Picture Uploaded and Information Inputed to Profile');
    } catch (err) {
      console.log(err);
      setLoading(false);
      dispatch(showLoading(false));
      forceUpdate();
    }
  };
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      //   console.log('res : ' + JSON.stringify(res[0]));
      setSingleFile(res);
      console.log('inires', res);
      doUpload(res[0]);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  return {doUpload, selectFile, isLoading};
};

export default UploadPictureButton;
