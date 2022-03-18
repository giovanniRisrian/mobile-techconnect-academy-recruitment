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
  return {
    callRegisterService,
  };
};

export default RegisterService;
