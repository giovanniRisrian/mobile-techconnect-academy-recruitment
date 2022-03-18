import {combineReducers, createStore} from 'redux';
import TechconnectAcademyReducer from './techconnectAcademy/TechconnectAcademyReducer';

const rootReducer = combineReducers({TechconnectAcademyReducer});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
