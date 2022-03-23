import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
const ReccomendationButtonComponent = ({reccomendationButton}) => {
  const {doReccomendation} = reccomendationButton();
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          doReccomendation();
        }}
        activeOpacity={0.5}>
        <Text style={styles.text}>Go To Reccomendation Job</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dialogContentView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },

  button: {
    backgroundColor: '#5F4E98',
    alignItems: 'center',
    margin: 12,
    padding: 12,
    borderRadius: 50,
    color: 'white',
  },
});
export default ReccomendationButtonComponent;
