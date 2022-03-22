import React from "react";
import ProfilePersonalScreen from "./ProfilePersonalScreen";
import { SafeAreaView } from "react-native";
import { ScrollView } from "native-base";
import ProfileEducationScreen from "./ProfileEducationScreen";

const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <ProfileEducationScreen />
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileScreen;
