import clientService from './ApiClient';

const ProfileService = () => {
  const getDataApplicantbyId = async (params, header) => {
    try {
      let data = await clientService().get('/user', header);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const updateDataApplicant = async (params, header) => {
    try {
      let data = await clientService().put(
        '/applicant/mobile/update',
        params,
        header,
      );
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const postGettingDataLinkedinProfile = async (params, header) => {
    console.log('INI PARAMS PROFILE SERVICE.JS');
    console.log(params);
    console.log('INI PARAMS HEADER SERVICE.JS');
    console.log(header);
    try {
      let data = await clientService().post('/resume/linkedin', params, header);
      return data;
    } catch (e) {
      throw e;
    }
  };

  return {
    updateDataApplicant,
    getDataApplicantbyId,
    postGettingDataLinkedinProfile,
  };
};

export default ProfileService;
