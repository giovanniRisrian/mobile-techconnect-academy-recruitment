import React, {useState} from 'react';
import {FlatList} from 'native-base';
import {SafeAreaView} from 'react-native';
import VacancyInfoModal from './ModalVacancy';
import VacancyItem from './Vacancy';

const VacancyList = ({programs, vacancyId, apply, loading}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  let vacancyItems = ({item}) => {
    return (
      <VacancyItem
        program={item}
        getId={vacancyId}
        onSetModalInfo={setModalInfo}
        onSetModalVisible={setModalVisible}
        onLoading={loading}
      />
    );
  };

  return (
    <SafeAreaView>
      <VacancyInfoModal
        program={modalInfo}
        applyProgram={apply}
        setVisible={setModalVisible}
        isVisible={modalVisible}
      />
      <FlatList
        data={programs}
        renderItem={vacancyItems}
        keyExtractor={programs => programs.ID}
      />
    </SafeAreaView>
  );
};

export default VacancyList;
