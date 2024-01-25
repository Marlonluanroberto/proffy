import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import landingImg from '../../Assets/images/landing.png';
import studyIcon from '../../Assets/images/icons/study.png';
import give_classesIcon from '../../Assets/images/icons/give-classes.png';
import heartIcon from '../../Assets/images/icons/heart.png';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../Services/api';

function Landing() {
    const { navigate } = useNavigation();

    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;
            setTotalConnections(total);
        })
    }, []);
    

    function navigateToGiveClassesPage() {
        navigate('GiveClasses');
    }

    function navigateToStudyClassesPage() {
        navigate('Study');
    }

    return (
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner} />
            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>
                    O que deseja fazer?
                </Text>
            </Text>
            <View style={styles.buttonsContainer}>
                <RectButton style={[styles.button, styles.buttonPrimary]} onPress={navigateToStudyClassesPage}>
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Estudar </Text>
                </RectButton>

                <RectButton style={[styles.button, styles.buttonSecondary]} onPress={navigateToGiveClassesPage}>
                    <Image source={give_classesIcon} />
                    <Text style={styles.buttonText}>Dar Aulas </Text>
                </RectButton>
            </View>
            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas{'  '}
                <Image source={heartIcon} />
            </Text>
        </View>
    );
}

export default Landing;
