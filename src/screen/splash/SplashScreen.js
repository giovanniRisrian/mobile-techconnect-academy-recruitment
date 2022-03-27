import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import {goToLogin} from '../../navigation/NavigationHelper';

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      goToLogin();
    }, 5000);
  });
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Find Your{'\n'}
        <Text style={styles.spanTitle}>Dream Career</Text>
      </Text>
      <Text style={{marginLeft: 50, fontWeight: '600', fontSize: 16}}>
        in Techconnect Academy
      </Text>
      <Image
        style={{alignSelf: 'center'}}
        source={require('../../assets/images/intro.png')}
        alt="splash-screen"
      />
      <ActivityIndicator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE1EE',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    color: '#666666',
    fontWeight: '600',
    marginLeft: 20,
  },
  spanTitle: {
    fontSize: 36,
    color: '#725AA4',
    fontWeight: '600',
  },
});

export default SplashScreen;
