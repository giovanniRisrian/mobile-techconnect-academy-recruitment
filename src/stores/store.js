import {combineReducers, createStore} from 'redux';
import TechconnectAcademyReducer from './techconnectAcademy/TechconnectAcademyReducer';
import ProfileReducer from './profile/ProfileReducer';

const rootReducer = combineReducers({
  TechconnectAcademyReducer,
  ProfileReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
