import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import {
  setProfile,
  showLoading,
} from '../../../stores/techconnectAcademy/TechconnectAcademyAction';
import {useState} from 'react';
import {goToScreen} from '../../../navigation/NavigationHelper';
import {PROFILE_PATH} from '../../../navigation/NavigationPath';

const Profile = profileService => {
  let {updateDataApplicant, getDataApplicantbyId} = profileService();
  const dispatch = useDispatch();
  const [checkEducation, setCheckEducation] = useState();
  const [checkOrganization, setCheckOrganization] = useState(null);
  const [checkWork, setCheckWork] = useState(null);
  const [changePhoto, setChangePhoto] = useState(false);
  const userProfile = useSelector(
    state => state.TechconnectAcademyReducer.userProfile,
  );
  const addProfile = async (values, file, context) => {
    values.Personal.TotalWorkingExperience =
      values.Personal.TotalWorkingExperience + '';
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${context.token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };
      let filepath =
        values.Personal.ResumeFile.split(':')[0].split('_')[
          values.Personal.ResumeFile.split(':')[0].split('_').length - 1
        ];

      values.Personal.ResumeFile = filepath;
      dispatch(showLoading(true));
      const response = await updateDataApplicant(values, config);

      const response2 = await getDataApplicantbyId(null, config);
      dispatch(setProfile(response2.data));
      dispatch(showLoading(false));
      goToScreen(PROFILE_PATH, true);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const getDataByID = async (id, context, changeInitial) => {
    try {
      const config = {
        headers: {Authorization: `Bearer ${context.token}`},
      };

      const data = {id: id};
      const formData = new FormData();
      formData.append('id', id);
      dispatch(showLoading(true));
      let dataReceive;
      if (userProfile) {
        dataReceive = userProfile;
      } else {
        const response = await getDataApplicantbyId(formData, config);
        dataReceive = response.data;
      }
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
      mock.Personal.BirthDate = dayjs(dataReceive.Personal.BirthDate).format(
        'YYYY-MM-DD',
      );
      mock.Education = dataReceive.Education;
      mock.SkillSet = dataReceive.SkillSet;
      mock.WorkExperience = dataReceive.WorkExperience;
      mock.WorkExperience[0].YearIn = dayjs(
        dataReceive.WorkExperience[0].YearIn,
      ).format('YYYY-MM-DD');
      mock.WorkExperience[0].YearOut = dayjs(
        dataReceive.WorkExperience[0].YearOut,
      ).format('YYYY-MM-DD');
      mock.Organization = dataReceive.Organization;
      mock.ID = dataReceive.ID;
      mock.UserAccountID = dataReceive.UserAccountID;

      for (let i = 0; i < mock.WorkExperience.length; i++) {
        if (
          mock.WorkExperience[i].YearIn == '0001-01-01T07:07:12+07:07' ||
          mock.WorkExperience[i].YearIn == '1-01-01' ||
          mock.WorkExperience[i].YearOut == null
        ) {
          mock.WorkExperience[i].YearIn = null;
        } else {
          mock.WorkExperience[i].YearIn = dataReceive.WorkExperience[
            i
          ].YearIn.toString()
            .split(':')[0]
            .split('T')[0];
        }
      }

      for (let i = 0; i < mock.WorkExperience.length; i++) {
        if (
          mock.WorkExperience[i].YearOut == '0001-01-01T07:07:12+07:07' ||
          mock.WorkExperience[i].YearOut == '1-01-01' ||
          mock.WorkExperience[i].YearOut == null
        ) {
          mock.WorkExperience[i].YearOut = null;
        } else {
          mock.WorkExperience[i].YearOut = dataReceive.WorkExperience[
            i
          ].YearOut.toString()
            .split(':')[0]
            .split('T')[0];
        }
      }
      setCheckEducation(mock.Education[0].Title);
      setCheckOrganization(mock.Organization[0].Organization);
      setCheckWork(mock.WorkExperience[0].CompanyName);
      changeInitial(mock);

      console.log('==========================', mock.WorkExperience);
      console.log('++++++++++++++++++++++++++', dataReceive.WorkExperience);

      dispatch(showLoading(false));
      // return response;
    } catch (err) {
      // console
      throw err;
    }
  };
  return {
    addProfile,
    getDataByID,
    checkEducation,
    setCheckEducation,
    checkOrganization,
    setCheckOrganization,
    checkWork,
    setCheckWork,
    setChangePhoto,
    changePhoto,
  };
};

export default Profile;
