import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ADMINISTRATOR,
  APPLICANT,
  APPLICANT_DASHBOARD,
  DASHBOARD,
  LOGIN_PATH,
  RECRUITER,
  REGISTER,
} from './NavigationPath';
import {navigationRef} from './RootNavigation';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoginScreen from '../screen/login/LoginScreen';
import {Login} from '../screen/login/Login';
import LoginService from '../service/LoginService';
import ApplicantDashboard from '../screen/applicant/dashboard/ApplicantDashboard';
import AdministratorDashboard from '../screen/admin/dashboard/AdministratorDashboard';
import RecruiterDashboard from '../screen/recruiter/dashboard/RecruiterDashboard';
import RegisterScreen from '../screen/register/RegisterScreen';
const Stack = createNativeStackNavigator();
// import BottomTabs from '../component/bottomTabs/BottomTabs';
const RootNavigator = () => {
  const isLogin = useSelector(state => state.TechconnectAcademyReducer.isLogin);
  console.log('Info Loginnya gesss', isLogin);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={LOGIN_PATH}
        screenOptions={{animation: 'none', headerShown: false}}>
        <Stack.Group>
          <Stack.Screen name={LOGIN_PATH}>
            {props => (
              <LoginScreen {...props} login={() => Login(LoginService)} />
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
          <Stack.Screen name={REGISTER} component={RegisterScreen} />
        </Stack.Group>
      </Stack.Navigator>
      {/* {isLogin ? <BottomTabs /> : <Text></Text>} */}
    </NavigationContainer>
  );
};

export default RootNavigator;
