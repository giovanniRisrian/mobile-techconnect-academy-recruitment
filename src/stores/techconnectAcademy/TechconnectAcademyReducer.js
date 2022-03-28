import {VACANY_PATH} from '../../navigation/NavigationPath';
import {
  ADD_TODO,
  CHANGE_TYPE,
  SET_TODO_NAME,
  SHOW_LOADING,
  DELETE_TODO,
  TOGGLE_COMPLETE,
  SET_LOGIN,
  SET_PROFILE,
  SET_TAB,
  SET_BROWSING,
} from '../../utils/constants';

const initialState = {
  isLoading: false,
  isLogin: null,
  isBrowsing: false,
  userProfile: null,
  loginToken: '',
  nowTab: VACANY_PATH,
};

const TechconnectAcademyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN: {
      return {
        ...state,
        isLogin: action.payload,
      };
    }
    case SET_BROWSING: {
      return {
        ...state,
        isBrowsing: action.payload,
      };
    }
    case SET_PROFILE: {
      return {
        ...state,
        userProfile: action.payload,
      };
    }
    case SET_TAB: {
      return {
        ...state,
        nowTab: action.payload,
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
