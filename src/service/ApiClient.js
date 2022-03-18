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
  const post = async (url, params) => {
    try {
      let result = await client.post(url, params);
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

  const get = async url => {
    try {
      console.log('apakahmasuksini');
      let result = await client.get(url);
      return result.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    post,
    get,
    loginPost,
  };
};

export default clientService;