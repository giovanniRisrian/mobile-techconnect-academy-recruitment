import {
  SET_LOGIN,
  SET_PROFILE,
  SET_TAB,
  SHOW_LOADING,
} from '../../utils/constants';

export function setLogin(condition) {
  return {
    type: SET_LOGIN,
    payload: condition,
  };
}
export function setProfile(condition) {
  return {
    type: SET_PROFILE,
    payload: condition,
  };
}

export function setTab(condition) {
  return {
    type: SET_TAB,
    payload: condition,
  };
}

export function showLoading(loading) {
  return {
    type: SHOW_LOADING,
    payload: loading,
  };
}

export function setBrowsing(condition) {
  return {
    type: SHOW_LOADING,
    payload: condition,
  };
}
