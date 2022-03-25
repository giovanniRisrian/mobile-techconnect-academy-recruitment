import {SHOW_LOADING} from '../../utils/constants';

const initialState = {
  isLoading: true,
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    default:
      return state;
  }
};

export default ProfileReducer;
