import React from "react";
import ProfilePersonalScreen from "./ProfilePersonalScreen";
import { SafeAreaView } from "react-native";
import { ScrollView } from "native-base";
import ProfileEducationScreen from "./ProfileEducationScreen";
import ProfileOrganizationScreen from "./ProfileOrganizationScreen";
import ProfileWorkExperienceScreen from "./ProfileWorkExperienceScreen";

const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <ProfileWorkExperienceScreen />
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileScreen;
