import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import styles from './styles';
import PageHeader from '../../Components/PageHeader';
import TeacherItem, { Teacher } from '../../Components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import api from '../../Services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect} from '@react-navigation/native';

function TeacherList() {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                });
                setFavorites(favoritedTeachersIds);
            }
        });
    }
    function setFilterVisible() {
        setIsFilterVisible(!isFilterVisible);
    }


    useFocusEffect(() => {
        loadFavorites()
    });

    async function FilterSubmit() {
        loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });
        setSubject('');
        setWeekDay('');
        setTime('');
        setIsFilterVisible(false);
        setTeachers(response.data);
    }

    return (
        <View >
            <PageHeader
                title="Proffys disponiveis"
                headerRight={(
                    <BorderlessButton onPress={setFilterVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )
                }>
                {isFilterVisible && (
                    <View style={styles.searchForm}>

                        <Text style={styles.label}>Matéria</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Qual á matéria?"
                            placeholderTextColor="#c1bccc"
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        />

                        <View style={styles.inputGroup}>

                            <View style={styles.inputBlock}>

                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)} />

                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual horário?"
                                    placeholderTextColor="#c1bccc"
                                    value={time}
                                    onChangeText={text => setTime(text)} />
                            </View>
                        </View>

                        <RectButton style={styles.submitButton} onPress={FilterSubmit}>
                            <Text style={styles.submitButtonText}>Filtar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView style={styles.teacherList} contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16
            }}>

                {teachers.map((teacher: Teacher) => {

                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)} />
                    );
                })}
            </ScrollView>
        </View>);
}

export default TeacherList;