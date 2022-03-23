import React, { useState } from "react";
import ProfilePersonalScreen from "./ProfilePersonalScreen";
import ProfileEducationScreen from "./ProfileEducationScreen";
import ProfileOrganizationScreen from "./ProfileOrganizationScreen";
import ProfileWorkExperienceScreen from "./ProfileWorkExperienceScreen";
import { TabBar, TabView } from "react-native-tab-view";
import { SafeAreaView, useWindowDimensions } from "react-native";
import { ScrollView } from "native-base";

const ProfileScreen = () => {
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <ProfilePersonalScreen />;
      case "second":
        return <ProfileEducationScreen />;
      case "third":
        return <ProfileOrganizationScreen />;
      case "fourth":
        return <ProfileWorkExperienceScreen />;
      default:
        return null;
    }
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Personal" },
    { key: "second", title: "Education" },
    { key: "third", title: "Organization" },
    { key: "fourth", title: "Work Experience" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      // indicatorStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: "pink" }}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};
export default ProfileScreen;
