import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import ReactNativeBlobUtil from 'react-native-blob-util';
import base64 from 'react-native-base64';
// import RNFetchBlob from 'react-native-fetch-blob';
// import Blob from 'fetch-blob';
// import {Blob} from 'fetch-blob';
import {useDispatch, useSelector} from 'react-redux';
const UploadResumeButton = service => {
  const {
    callUploadResumeService,
    postGetDataByListId,
    putUpdateProfile,
    getDataApplicantbyId,
  } = service();
  const [singleFile, setSingleFile] = useState(null);

  const isLogin = useSelector(state => state.TechconnectAcademyReducer.isLogin);
  const doUpload = async file => {
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
      mock.Personal.Email = summary.email[0];
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
      if (profile.experience != null) {
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
        for (let i = 0; i < experience.length; i++) {
          tempExperience.CompanyName = experience[i].company;
          tempExperience.Position = experience[i].title;
          if (experience[i].period.startDate) {
            tempExperience.YearIn =
              experience[i].period.startDate.year.toString();
          }
          if (experience[i].period.endDate) {
            tempExperience.YearOut =
              experience[i].period.endDate.year.toString();
          }
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
        mock.WorkExperience = tempExperienceArr;
        mock.Personal.TotalWorkingExperience = (
          experience[0].period.startDate.year -
          (experience[experience.length - 1].period.endDate?.year ||
            experience[experience.length - 1].period.startDate)
        ).toString();
      }
      const lastResp = await putUpdateProfile(mock, {
        headers: {
          Authorization: `Bearer ${isLogin.token}`,
        },
      });
      alert('Resume Uploaded and Information Inputed to Profile');
    } catch (err) {
      console.log(err);
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
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  return {doUpload, selectFile};
};

export default UploadResumeButton;
