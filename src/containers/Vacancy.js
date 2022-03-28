import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';


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
            <Text style={{color: '#5F4E98', marginTop:2}}>
              <Icon name="tag" size={18} />
            </Text>
              {program?.ProgramTypeName?.toUpperCase()}
          </Text>
          <Text style={styles.location}>
              <Icons name="ios-calendar" size={20} color= "#5F4E98"/>
              <Text>
                {" "}
                {dayjs(program.ProgramActivity?.OpenDate).format(
                  "DD/MM/YYYY"
                )} -{" "}
                {dayjs(program.ProgramActivity?.CloseDate).format("DD/MM/YYYY")}
              </Text>
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
    backgroundColor: '#EEEEEE',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ededed',
    paddingLeft: 14,
    paddingTop: 7,
    paddingBottom: 7,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 3, height: 3},
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    height: 100,
  },
  title: {
    fontSize: 19,
    fontWeight: '600',
  },
  location: {
    fontSize: 16,
    marginLeft:10,
    marginRight:10
  },
});

export default VacancyItem;
