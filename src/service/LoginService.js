import clientService from './ApiClient';

import {API_URL} from '@env';
const LoginService = () => {
  const callLoginService = async (email, password) => {
    try {
      console.log(API_URL);
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
