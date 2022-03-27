import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ADMINISTRATOR,
  APPLICANT,
  APPLICANT_DASHBOARD,
  DASHBOARD,
  DETAIL_STATUS,
  HOME_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  RECRUITER,
  REGISTER_PATH,
  SPLASH_PATH,
  VACANCY_DETAIL_PATH,
  VACANY_PATH,
} from './NavigationPath';
import {navigationRef} from './RootNavigation';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoginScreen from '../screen/login/LoginScreen';
import {Login} from '../screen/login/Login';
import LoginService from '../service/LoginService';
import ApplicantDashboard from '../screen/applicant/dashboard/ApplicantDashboard';
import AdministratorDashboard from '../screen/admin/dashboard/AdministratorDashboard';
import RecruiterDashboard from '../screen/recruiter/dashboard/RecruiterDashboard';
import RegisterScreen from '../screen/register/RegisterScreen';
import {Register} from '../screen/register/Register';
import RegisterService from '../service/RegisterService';
import ProfileScreen from '../screen/applicant/profile/component/ProfileScreen';
import HomeScreen from '../screen/home/HomeScreen';
import VacanyScreen from '../screen/vacany/VacanyScreen';
import BottomTabs from '../component/bottomTabs/BottomTabs';
import {Vacancy} from '../screen/vacany/Vacancy';
import VacancyService from '../service/VacancyService';
import SplashScreen from '../screen/splash/SplashScreen';

import StatusRecruitmentScreen from '../screen/applicant/status/statusRecruitment/StatusRecruitmentScreen';
import StatusRecruitment from '../screen/applicant/status/statusRecruitment/StatusRecruitment';
import StatusService from '../service/StatusService';
const Stack = createNativeStackNavigator();
// import BottomTabs from '../component/bottomTabs/BottomTabs';
const RootNavigator = () => {
  const isLogin = useSelector(state => state.TechconnectAcademyReducer.isLogin);
  // console.log('Info Loginnya gesss', isLogin);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={SPLASH_PATH}
        screenOptions={{animation: 'none', headerShown: false}}>
        <Stack.Group>
          <Stack.Screen name={SPLASH_PATH} component={SplashScreen} />
          <Stack.Screen name={LOGIN_PATH}>
            {props => (
              <LoginScreen {...props} login={() => Login(LoginService)} />
            )}
          </Stack.Screen>
          <Stack.Screen name={REGISTER_PATH}>
            {props => (
              <RegisterScreen
                {...props}
                register={() => Register(RegisterService)}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name={DETAIL_STATUS}>
            {props => (
              <StatusRecruitmentScreen
                {...props}
                bloc={() => StatusRecruitment(StatusService)}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name={APPLICANT.DASHBOARD}
            component={ApplicantDashboard}
          />
          <Stack.Screen
            name={RECRUITER.DASHBOARD}
            component={RecruiterDashboard}
          />
          <Stack.Screen
            name={ADMINISTRATOR.DASHBOARD}
            component={AdministratorDashboard}
          />
          <Stack.Screen name={PROFILE_PATH} component={ProfileScreen} />
          <Stack.Screen name={HOME_PATH} component={HomeScreen} />
          <Stack.Screen name={VACANY_PATH}>
            {props => (
              <VacanyScreen
                {...props}
                vacancy={() => Vacancy(VacancyService)}
              />
            )}
          </Stack.Screen>

          {/* <Stack.Screen name={REGISTER} component={RegisterScreen} /> */}
        </Stack.Group>
      </Stack.Navigator>
      {isLogin ? <BottomTabs /> : <View></View>}
    </NavigationContainer>
  );
};

export default RootNavigator;
