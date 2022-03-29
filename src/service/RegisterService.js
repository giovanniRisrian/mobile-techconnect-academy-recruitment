import clientService from './ApiClient';

const RegisterService = () => {
  const callRegisterService = async params => {
    try {
      let data = await clientService().registerPost('/user/register', params);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const callRegisterGoogleService = async params => {
    try {
      let data = await clientService().registerPost(
        '/user/register/google',
        params,
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getDataApplicantbyId = async header => {
    try {
      let data = await clientService().get(`/user`, header);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  return {
    callRegisterService,
    getDataApplicantbyId,
    callRegisterGoogleService,
  };
};

export default RegisterService;
