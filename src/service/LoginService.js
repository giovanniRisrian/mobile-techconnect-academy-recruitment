import clientService from './ApiClient';

const LoginService = () => {
  const callLoginService = async (email, password) => {
    try {
      console.log('ini Username : ', email);
      let data = await clientService().loginPost(
        '/login',
        {},
        {username: email, password: password},
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return {
    callLoginService,
  };
};

export default LoginService;
