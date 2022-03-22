import React from 'react'
import {View, FlatList} from 'native-base'
import CardVacancy from './Vacancy';
import { SafeAreaView } from 'react-native';

const VacancyList = ({programs,vacancyId }) => {

    let vacancyItems = ({item}) => {
        return(
            <CardVacancy program={item} getId={vacancyId} />
        )
    }
    return (
        <SafeAreaView>
            <FlatList
            data={programs}
            renderItem={vacancyItems}
            keyExtractor={programs => programs.ID}
            horizontal
            showsHorizontalScrollIndicator={false}
            />
        
        </SafeAreaView>
    )
}
export default VacancyList;
