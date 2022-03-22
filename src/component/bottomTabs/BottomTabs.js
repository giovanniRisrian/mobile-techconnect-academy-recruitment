import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { goToLogin, goToScreen } from "../../navigation/NavigationHelper";
import {
  ADMINISTRATOR,
  APPLICANT,
  CUSTOMER_PATH,
  HOME_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  RECRUITER,
  VACANY_PATH,
} from "../../navigation/NavigationPath";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useDispatch, useSelector } from "react-redux";
const toHome = () => {
  goToScreen(HOME_PATH, false);
};

const toVacany = () => {
  goToScreen(VACANY_PATH, false);
};

const toDashboard = (role) => {
  if (role === "user") {
    goToScreen(APPLICANT.DASHBOARD, false);
  }
  if (role === "recruiter") {
    goToScreen(RECRUITER.DASHBOARD, false);
  }
  if (role === "administrator") {
    goToScreen(ADMINISTRATOR.DASHBOARD, false);
  }
};
const toProfile = () => {
  goToScreen(PROFILE_PATH, false);
};
const toLogin = () => {
  goToLogin();
};
const BottomTabs = () => {
  const isLogin = useSelector(
    (state) => state.TechconnectAcademyReducer.isLogin
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonLeft} onPress={() => toHome()}>
        <Text style={styles.text}>
          {" "}
          <Icon name="home" size={25} />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => toVacany()}>
        <Text style={styles.text}>
          {" "}
          <Icon name="briefcase-search" size={25} />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          isLogin != null ? toDashboard(isLogin.Role) : toLogin();
        }}>
        <Text style={styles.text}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonRight}
        onPress={() => {
          isLogin != null ? toProfile() : toLogin();
        }}
      >
        <Text style={styles.text}>
          <Icon name="account-circle" size={25} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    borderTopStartRadius: 15,
    borderBottomStartRadius: 15,
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,
    backgroundColor: "#EEEEEE",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  dialogContentView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  text: {
    textAlign: "center",
    color: "#5F4E98",
    marginTop: 10,
  },

  buttonLeft: {
    width: "25%",
    height: 50,
    borderColor: "white",
  },

  button: {
    width: "25%",
    height: 50,
    borderColor: "white",
  },
  buttonRight: {
    width: "25%",
    height: 50,
    borderColor: "white",
  },
});
export default BottomTabs;
