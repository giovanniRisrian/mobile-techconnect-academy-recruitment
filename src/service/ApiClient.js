import axios from 'axios';
import {API_URL} from '@env';

const client = axios.create({
  baseURL: API_URL,
});

const clientService = () => {
  const loginPost = async (url, config, params) => {
    try {
      console.log('apiurl : ', API_URL);
      let result = await client.post(url, config, {auth: params});
      console.log('resultnya :', result);
      return result.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          console.log('Unauthorized');
          throw error;
        }
      } else {
        console.log('errornya : ', error);
        console.log('Error');
      }
    }
  };
  const registerPost = async (url, params) => {
    try {
      let result = await client.post(url, params);
      console.log('resultnya :', result);
      return result.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          console.log('Unauthorized');
          throw error;
        }
      } else {
        console.log('errornya : ', error);
        console.log('Error');
      }
    }
  };

  const postFile = async (url, params, header) => {
    try {
      console.log('Ini Params', params);
      console.log('Ini Header', header);
      let result = await client.post(url, params, header);
      console.log(result);
      return result.data;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  };

  const post = async (url, params, header) => {
    try {
      let result = await client.post(url, params, header);
      console.log(result);
      return result.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log('Unauthorized');
          throw error;
        }
      } else {
        console.log('Error');
      }
    }
  };

  const put = async (url, params, header) => {
    try {
      let result = await client.put(url, params, header);
      console.log(result);
      return result.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log('Unauthorized');
          throw error;
        }
      } else {
        console.log('Error');
      }
    }
  };

  const putFile = async (url, params, header) => {
    try {
      let result = await client.put(url, params, header);
      console.log(result);
      return result.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log('Unauthorized');
          throw error;
        }
      } else {
        console.log('Error');
      }
    }
  };

  const get = async (url, header) => {
    try {
      console.log('apakahmasuksini');
      let result = await client.get(url, header);
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getWithAuth = async (url, config) => {
    try {
      console.log('apakahmasuksini');
      let result = await client.get(url, config);
      return result.data;
    } catch (error) {
      console.log(error);
      //return error;
      throw error;
    }
  };

  const getWithAuthRecom = async (url, config) => {
    try {
      console.log('apakahmasuksini');
      let result = await client.get(url, config);
      return result.data;
    } catch (error) {
      console.log(error);
      return error;
      //throw error;
    }
  };

  const getWithToken = async (url, header) => {
    try {
      let result = await client.get(url, header);
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const postWitAuth = async (url, params, header) => {
    try {
      let result = await client.post(url, params, header);
      return result.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log('Unauthorized');
          throw error;
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  };

  return {
    get,
    post,
    put,
    loginPost,
    registerPost,
    postFile,
    putFile,
    getWithAuth,
    getWithAuthRecom,
    getWithToken,
    postWitAuth,
  };
};

export default clientService;
