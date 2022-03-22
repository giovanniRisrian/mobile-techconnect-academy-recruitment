import { View, Text, StyleSheet, SafeAreaView, TextInput } from "react-native";
import { HStack, NativeBaseProvider, VStack } from "native-base";
import React, { useEffect } from "react";
import CardCategories from "../../component/cardCategories/cardCategories";
import VacancyList from "../../containers/VacancyList";
import { Icon } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

const VacanyScreen = ({ vacancy }) => {
  const { list, allVacancy, setSearch, searchByName, vacancyById  } = vacancy();

  useEffect(() => {
    allVacancy();
  }, []);

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentTitle}>
          <Text style={styles.title}>
            Find Your{"\n"}
            <Text style={styles.spanTitle}>Dream Career</Text>
          </Text>

          <View style={styles.searchSection}>
            <Ionicons name="ios-search" size={20} style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Seach"
              underlineColorAndroid="transparent"
              onChangeText={setSearch}
            />
          </View>

          <Text style={styles.textCategories}>Categories</Text>
          <HStack space={3} justifyContent="space-around">
            <CardCategories title="Program" />
            <CardCategories title="Training" />
            <CardCategories title="Certification" />
          </HStack>
          <Text style={styles.textCategories}>All Jobs</Text>
          <VacancyList programs={list.ProgramList} vacancyId={vacancyById} />
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECE1EE",
  },
  contentTitle: {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    color: "#666666",
    fontWeight: "600",
  },
  spanTitle: {
    fontSize: 36,
    color: "#725AA4",
    fontWeight: "600",
  },
  textCategories: {
    fontSize: 18,
    fontWeight: "400",
    marginTop: 10,
    marginBottom: 10,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderRadius:15,
    marginRight:20,
    marginTop:10,

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
    backgroundColor: "#EEEEEE",
    color: "#424242",
    borderRadius:15,
  },
});
export default VacanyScreen;
