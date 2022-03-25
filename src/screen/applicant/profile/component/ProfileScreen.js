import React, {useState} from 'react';
import ProfilePersonalScreen from './ProfilePersonalScreen';
import ProfileEducationScreen from './ProfileEducationScreen';
import ProfileOrganizationScreen from './ProfileOrganizationScreen';
import ProfileWorkExperienceScreen from './ProfileWorkExperienceScreen';
import {TabBar, TabView} from 'react-native-tab-view';
import {
  SafeAreaView,
  useWindowDimensions,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'native-base';
import Profile from '../Profile';
import ProfileService from '../../../../service/ProfileService';

const ProfileScreen = () => {
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'personal':
        return <ProfilePersonalScreen bloc={() => Profile(ProfileService)} />;
      case 'education':
        return <ProfileEducationScreen bloc={() => Profile(ProfileService)} />;
      case 'organization':
        return (
          <ProfileOrganizationScreen bloc={() => Profile(ProfileService)} />
        );
      case 'workexperience':
        return (
          <ProfileWorkExperienceScreen bloc={() => Profile(ProfileService)} />
        );
      default:
        return null;
    }
  };

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {key: 'personal', title: 'Personal'},
    {key: 'education', title: 'Education'},
    {key: 'organization', title: 'Organization'},
    {key: 'workexperience', title: 'Work Experience'},
  ]);
  const renderTabBar = props => (
    <TabBar
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            fontSize: 13,
            color,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          {route.title}
        </Text>
      )}
      {...props}
      // indicatorStyle={{ backgroundColor: "white" }}
      // style={{ backgroundColor: "pink" }}
    />
  );

  const _renderLazyPlaceholder = ({route}) => <LazyPlaceholder route={route} />;

  return (
    <TabView
      lazy
      // renderLazyPlaceholder={_renderLazyPlaceholder}
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

const LazyPlaceholder = ({route}) => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text>Please wait</Text>
    <ActivityIndicator />
  </View>
);

// const styles = StyleSheet.create({
//   scene: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
export default ProfileScreen;
