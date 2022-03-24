import {SHOW_LOADING} from '../../utils/constants';

export function showLoading(loading) {
  return {
    type: SHOW_LOADING,
    payload: loading,
  };
}
