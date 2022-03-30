import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect, useState} from 'react';
import VacancyList from '../../containers/VacancyList';
import Ionicons from 'react-native-vector-icons/Ionicons';

const VacanyScreen = ({vacancy, route}) => {
  console.log('ini route params', route.params);
  const {
    setList,
    allVacancy,
    searchByName,
    vacancyById,
    search,
    list,
    doApplyProgram,
    getTypeProgram,
    typeProgram,
    setType,
    isLoading,
    name,
  } = vacancy();

  useEffect(() => {
    if (route.params == null) {
      console.log('Routenya adalah');
      getTypeProgram();
      allVacancy('', '');
    } else {
      setList(route.params);
    }
  }, []);

  const programTypeName = text => {
    allVacancy('', text);
    setType(text);
  };

  let typeItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.buttonApply}
          onPress={() => programTypeName(item.ProgramName)}>
          <Text style={styles.textButton}>{item.ProgramName}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    // <NativeBaseProvider>
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.contentTitle}>
        <Text style={styles.title}>
          Hello {name}, {'\n'}Find Your{'\n'}
          <Text style={styles.spanTitle}>Dream Career</Text>
        </Text>
        <View style={styles.searchSection}>
          <Ionicons name="ios-search" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Seach"
            underlineColorAndroid="transparent"
            onChangeText={text => searchByName(text)}
            value={search}
          />
        </View>
        {route.params === undefined ? (
          <Text style={styles.textCategories}>All Vacancy</Text>
        ) : (
          <Text style={styles.textRecomendationCategories}>
            Vacancy Based on Job Reccomendations
          </Text>
        )}
        <FlatList
          data={typeProgram}
          keyExtractor={typeProgram => typeProgram.ID}
          renderItem={typeItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </KeyboardAvoidingView>

      <View style={{flex: 1, marginLeft: 20}}>
        {search && list?.ProgramList.length === 0 ? (
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/nodata.png')}
              alt="no-data"
              style={{marginBottom: 20}}
            />
          </View>
        ) : (
          <View>
            <VacancyList
              programs={list?.ProgramList}
              vacancyId={vacancyById}
              doApplyProgram={doApplyProgram}
              loading={isLoading}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
    // </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE1EE',
  },
  contentTitle: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    color: '#666666',
    fontWeight: '600',
  },
  spanTitle: {
    fontSize: 36,
    color: '#725AA4',
    fontWeight: '600',
  },
  textCategories: {
    fontSize: 18,
    color: '#666666',
    fontWeight: '600',
    marginTop: 25,
    marginBottom: 20,
    marginRight: 25,
    textAlign: 'center',
  },
  textRecomendationCategories: {
    fontSize: 18,
    color: '#666666',
    fontWeight: '600',
    marginTop: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
    marginRight: 20,
    marginTop: 30,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#EEEEEE',
    color: '#424242',
    borderRadius: 15,
  },
  buttonApply: {
    backgroundColor: '#5F4E98',
    borderRadius: 10,
    marginLeft: 20,
    padding: 5,
    marginBottom: 10,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
  },
});
export default VacanyScreen;
