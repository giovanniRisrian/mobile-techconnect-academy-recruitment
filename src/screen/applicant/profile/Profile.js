import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import {useDispatch} from 'react-redux';
import {showLoading} from '../../../stores/techconnectAcademy/TechconnectAcademyAction';
import {useState} from 'react';

const Profile = profileService => {
  let {updateDataApplicant, getDataApplicantbyId} = profileService();
  const dispatch = useDispatch();
  const [checkEducation, setCheckEducation] = useState();
  const [checkOrganization, setCheckOrganization] = useState();
  const [checkWork, setCheckWork] = useState();

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
      // let userInfo = jwt_decode(context.token);
      // console.log("Ini Values : ",values)
      // const formData = new FormData();
      // const jsonText = JSON.stringify(values);
      // const jsonPretendFile = new Blob([jsonText], {
      //   type: "application/json",
      // });
      // formData.append("json", jsonPretendFile);
      // formData.append("file", file);
      dispatch(showLoading(true));
      const response = await updateDataApplicant(values, config);
      dispatch(showLoading(false));
      // navigate("/applicant/profile");
      // window.location.reload();
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
      const response = await getDataApplicantbyId(formData, config);

      let dataReceive = response.data;

      let mock = {
        Personal: {
          Name: 'zizki',
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

      // console.log("resp:",dataReceive)
      // console.log("mock:",mock)
      mock.Personal = dataReceive.Personal;
      mock.Personal.BirthDate = dayjs(dataReceive.Personal.BirthDate).format(
        'YYYY-MM-DD',
      );

      // console.log(mock.Personal.BirthDate)
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

      setCheckEducation(mock.Education[0].Title);
      setCheckOrganization(mock.Organization[0].Organization);
      setCheckWork(mock.WorkExperience[0].CompanyName);
      changeInitial(mock);
      dispatch(showLoading(false));
      return response;
    } catch (err) {
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
  };
};

export default Profile;
