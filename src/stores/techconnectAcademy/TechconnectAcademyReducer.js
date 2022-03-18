import {
  ADD_TODO,
  CHANGE_TYPE,
  SET_TODO_NAME,
  SHOW_LOADING,
  DELETE_TODO,
  TOGGLE_COMPLETE,
  SET_LOGIN,
} from '../../utils/constants';

const initialState = {
  isLoading: false,
  isLogin: null,
  loginToken: '',
};

const TechconnectAcademyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN: {
      return {
        ...state,
        isLogin: action.payload,
      };
    }
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

export default TechconnectAcademyReducer;
