import {SET_LOGIN, SHOW_LOADING} from '../../utils/constants';

export function setLogin(condition) {
  return {
    type: SET_LOGIN,
    payload: condition,
  };
}

export function showLoading(loading) {
  return {
    type: SHOW_LOADING,
    payload: loading,
  };
}
