import AsyncStorage from '@react-native-async-storage/async-storage';
export async function storeLocalData(value) {
  try {
    console.log('inis disetorkanb', value);
    await AsyncStorage.setItem('@storage_Key', value);
  } catch (e) {
    // saving error
  }
}
export async function removeLocalData() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // saving error
  }
}
export async function getLocalData() {
  try {
    const value = await AsyncStorage.getItem('@storage_Key');

    console.log(value);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {
    // error reading value
  }
}
