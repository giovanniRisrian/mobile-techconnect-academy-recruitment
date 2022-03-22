import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Ini Adalah Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ECE1EE'
  }
})
export default HomeScreen;
