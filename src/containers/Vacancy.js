import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const VacancyItem = ({
  program,
  onSetModalInfo,
  onSetModalVisible,
  onLoading,
}) => {
  const onShowModal = () => {
    onSetModalInfo(program);
    onSetModalVisible(true);
  };
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={onShowModal}>
          <Text style={styles.title}>{program?.ProgramName}</Text>
          <Text style={styles.location}>
            <Text style={{ color: "#5F4E98" }}>
              <Icon name="location-pin" size={18} />
            </Text>
            {program?.ProgramLocation?.Address}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    marginBottom: 10,
    backgroundColor: "#EEEEEE",
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#ededed",
    paddingLeft: 14,
    paddingTop: 7,
    paddingBottom: 7,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 3, height: 3 },
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    height: 80,
  },
  title: {
    fontSize: 19,
    fontWeight: "600",
  },
  location: {
    fontSize: 16,
  },
});

export default VacancyItem;
