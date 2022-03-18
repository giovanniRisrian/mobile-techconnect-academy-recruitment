/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {decode, encode} from 'base-64';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootNavigator from './navigation/RootNavigator';
import {Provider} from 'react-redux';
import configureStore from './stores/store';
const App = () => {
  const store = configureStore();

  if (!global.btoa) {
    global.btoa = encode;
  }

  if (!global.atob) {
    global.atob = decode;
  }
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
