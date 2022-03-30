import * as RootNavigation from './RootNavigation';
import {LOGIN_PATH} from './NavigationPath';
import {setTab} from '../stores/techconnectAcademy/TechconnectAcademyAction';

export function goToLogin() {
  RootNavigation.navigate(LOGIN_PATH, null, true);
}

export function goToScreen(routePath, isReplace) {
  // setTab({});
  // setTab(routePath);
  RootNavigation.navigate(routePath, null, isReplace);
}

export function goToScreenWithParams(routePath, params = {}, isReplace) {
  // setTab({});
  // setTab(routePath);
  RootNavigation.navigate(routePath, params, isReplace);
}
