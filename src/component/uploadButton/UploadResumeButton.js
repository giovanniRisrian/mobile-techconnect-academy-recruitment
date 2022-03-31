import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import ReactNativeBlobUtil from 'react-native-blob-util';
import base64 from 'react-native-base64';
// import RNFetchBlob from 'react-native-fetch-blob';
// import Blob from 'fetch-blob';
// import {Blob} from 'fetch-blob';
import {useDispatch, useSelector} from 'react-redux';
import {
  setProfile,
  showLoading,
} from '../../stores/techconnectAcademy/TechconnectAcademyAction';
import {goToScreen} from '../../navigation/NavigationHelper';
import {PROFILE_PATH} from '../../navigation/NavigationPath';
import {Alert} from 'react-native';
const UploadResumeButton = service => {
  const {
    callUploadResumeService,
    postGetDataByListId,
    putUpdateProfile,
    getDataApplicantbyId,
  } = service();
  const [singleFile, setSingleFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const isLogin = useSelector(state => state.TechconnectAcademyReducer.isLogin);
  const dispatch = useDispatch();
  const doUpload = async file => {
    setLoading(true);
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
      //   const config = ;
      //   console.log(Platform.OS);
      console.log(file.uri);
      //   const response = await callUploadResumeService(formData, {
      //     headers: {
      //       Authorization: `Bearer ${isLogin.token}`,
      //       'Content-Type': 'multipart/form-data; ',
      //       Accept: 'application/json',
      //     },
      //   });

      // setLoading(false);
      dispatch(showLoading(true));
      const header = {
        Authorization: `Bearer ${isLogin.token}`,
        'Content-Type': 'multipart/form-data',
      };
      const resp = await callUploadResumeService(formData, header);
      console.log('responsenya yaitu :', resp.data.summary.profile);
      const config = {
        headers: {
          Authorization: `Bearer ${isLogin.token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      let res2 = await postGetDataByListId({ID: resp.data.matchId}, config);
      console.log('Ini Rekomendasi', res2);
      let summary = resp.data.summary;
      let SkillSet = [];
      // console.log("ini sumari ",res.data.data.summary)
      for (let i = 0; i < summary.skill.length; i++) {
        SkillSet.push({Skill: summary.skill[i], ApplicantID: isLogin.id});
      }

      var jsonData = new FormData();
      let resp3 = await getDataApplicantbyId(config);
      let dataReceive = resp3.data;
      let mock = {
        Personal: {
          Name: '',
          Gender: '',
          BirthDate: new Date(),
          Domicile: '',
          Email: '',
          TelephoneNo: '',
          TotalWorkingExperience: '',
          SalaryExpectation: '',
        },
        Education: [
          {
            Title: '',
            Institution: '',
            Major: '',
            YearIn: '',
            YearOut: '',
            GPA: '',
          },
        ],
        Organization: [
          {
            Organization: '',
            Scope: '',
            Duration: '',
            Description: '',
            Position: '',
          },
        ],
        WorkExperience: [
          {
            CompanyName: '',
            Position: '',
            Level: '',
            Industry: '',
            YearIn: '',
            YearOut: '',
            Description: '',
          },
        ],
        SkillSet: [
          {
            Skill: '',
          },
        ],
      };

      mock.Personal = dataReceive.Personal;
      mock.Personal.TelephoneNo = summary.phone_number[0];
      //mock.Personal.Email = summary.email[0];
      mock.Personal.ResumeFile = file.name;

      mock.Education = dataReceive.Education;
      // mock.Education[0].Institution=summary.academic[0]
      mock.Education[0].GPA = summary.gpa[0];
      // mock.SkillSet = SkillSet
      mock.SkillSet = SkillSet;
      mock.WorkExperience = dataReceive.WorkExperience;
      mock.Organization = dataReceive.Organization;
      mock.ID = dataReceive.ID;
      mock.UserAccountID = dataReceive.UserAccountID;
      const profile = summary.profile;
      // console.log("ketemukah : ", profile.length);
      // console.log("ketemukah : ", profile === null);
      console.log(profile.lasttname);
      if (profile != null) {
        console.log('terupdate');
        mock.Personal.Name = profile.firstname + ' ' + profile.lasttname;
        mock.Personal.Domicile = profile.country + ' ' + profile.province;
        if (profile.education != null) {
          let education = profile.education;
          let tempEducationArr = [];
          let tempEducation = {
            Title: '',
            Institution: '',
            Major: '',
            YearIn: '',
            YearOut: '',
            GPA: '',
          };
          for (let i = 0; i < education.length; i++) {
            console.log(education[i].period.endDate.year);
            tempEducation.Title = education[i].degree;
            tempEducation.Institution = education[i].school;
            tempEducation.Major = education[i].field;
            tempEducation.YearIn =
              education[i].period.startDate.year.toString();
            tempEducation.YearOut = education[i].period.endDate.year.toString();
            tempEducationArr.push(tempEducation);
            tempEducation = {
              Title: '',
              Institution: '',
              Major: '',
              YearIn: '',
              YearOut: '',
              GPA: '',
            };
          }
          mock.Education = tempEducationArr;
        }
      } else {
        console.log('Tidak Terupdate');
      }
      let min = 10000000;
      let max = 0;
      let minDate = '2000-01-01',
        maxDate;
      let nowStartYear, nowStartMonth, nowEndYear, nowEndMonth, now, end;
      if (profile?.experience) {
        let experience = profile.experience;
        let tempExperienceArr = [];
        let tempExperience = {
          CompanyName: '',
          Position: '',
          Level: '',
          Industry: '',
          YearIn: '',
          YearOut: '',
          Description: '',
        };
        let tempArr = [];
        let tempArrDate = [];
        for (let i = 0; i < experience.length; i++) {
          tempExperience.CompanyName = experience[i].company;
          tempExperience.Position = experience[i].title;

          experience[i].period?.startDate?.year
            ? (nowStartYear = experience[i].period.startDate.year)
            : (nowStartYear = 10000000);
          experience[i].period?.startDate?.month
            ? (nowStartMonth = experience[i].period.startDate.month)
            : (nowStartMonth = 1);
          experience[i].period?.endDate?.year
            ? (nowEndYear = experience[i].period.endDate.year)
            : (nowEndYear = 0);
          experience[i].period?.endDate?.month
            ? (nowEndMonth = experience[i].period.endDate.month)
            : (nowEndMonth = 1);

          now = nowStartYear * 100 + nowStartMonth;
          end = nowEndYear * 100 + nowEndMonth;
          if (now !== 1) tempArr.push(now);
          if (end !== 1) tempArr.push(end);
          if (experience[i].period.startDate) {
            if (
              experience[i].period.startDate.year &&
              experience[i].period.startDate.month
            ) {
              experience[i].period.startDate.month =
                experience[i].period.startDate.month.toString();
              if (experience[i].period.startDate.month.length == 1) {
                experience[i].period.startDate.month =
                  '0' + experience[i].period.startDate.month;
              }
              tempExperience.YearIn =
                experience[i].period.startDate.year.toString() +
                '-' +
                experience[i].period.startDate.month +
                '-01';
            } else {
              tempExperience.YearIn =
                experience[i].period.startDate.year.toString() + '-01-01';
            }
          }
          if (experience[i].period.endDate) {
            if (
              experience[i].period.endDate.year &&
              experience[i].period.endDate.month
            ) {
              experience[i].period.endDate.month =
                experience[i].period.endDate.month.toString();
              if (experience[i].period.endDate.month.length == 1) {
                experience[i].period.endDate.month =
                  '0' + experience[i].period.endDate.month;
              }
              tempExperience.YearOut =
                experience[i].period.endDate.year.toString() +
                '-' +
                experience[i].period.endDate.month +
                '-01';
            } else {
              tempExperience.YearOut =
                experience[i].period.endDate.year.toString();
            }
          }
          if (now !== 1) tempArrDate.push(tempExperience.YearIn);
          if (end !== 1) tempArrDate.push(tempExperience.YearOut);
          tempExperienceArr.push(tempExperience);
          tempExperience = {
            CompanyName: '',
            Position: '',
            Level: '',
            Industry: '',
            YearIn: '',
            YearOut: '',
            Description: '',
          };
        }
        console.log('ini Semua Tanggal Int:', tempArr);
        console.log('ini Semua Tanggal Date:', tempArrDate);
        mock.WorkExperience = tempExperienceArr;

        if (!maxDate) {
          maxDate = minDate;
        }

        const max = Math.max(...tempArr);
        const indexMax = tempArr.indexOf(max);
        const min = Math.min(...tempArr);
        const indexMin = tempArr.indexOf(min);
        console.log(max, min, indexMax, indexMin);
        console.log('MINIMUM ADALAH : ', tempArr[indexMin]);
        console.log('MAXIMUM ADALAH : ', tempArr[indexMax]);

        let date1 = new Date(tempArrDate[indexMin]);
        let date2 = new Date(tempArrDate[indexMax]);

        // To calculate the time difference of two dates
        let Difference_In_Time = date2.getTime() - date1.getTime();

        // To calculate the no. of days between two dates
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        let Different_In_Year = Difference_In_Days / 365;
        console.log('Differentnya', Difference_In_Days);
        mock.Personal.TotalWorkingExperience =
          Different_In_Year.toFixed(2).toString();
      }
      const lastResp = await putUpdateProfile(mock, {
        headers: {
          Authorization: `Bearer ${isLogin.token}`,
        },
      });

      let resp2 = await getDataApplicantbyId(config);
      dispatch(setProfile(resp2.data));
      dispatch(showLoading(false));
      setLoading(false);
      Alert.alert(
        'Success',
        'Resume Uploaded and Information Inputed to Profile',
      );
      goToScreen(PROFILE_PATH, true);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      //   console.log('res : ' + JSON.stringify(res[0]));
      setSingleFile(res);
      console.log('inires', res);
      doUpload(res[0]);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        //alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  return {doUpload, selectFile, isLoading};
};

export default UploadResumeButton;
