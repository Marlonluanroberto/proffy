import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';
import backImg from '../../Assets/images/icons/back.png';
import logoImg from '../../Assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';


interface PageHeaderProps {
    title: string,
    headerRight?: ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, headerRight, children }) => {
    const { navigate } = useNavigation();
    function goBackNavigation() {
        navigate('Landing');
    }
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={goBackNavigation}>
                    <Image source   ={backImg} resizeMode="contain" />
                </BorderlessButton>
                <Image source={logoImg} resizeMode="contain" />
            </View>
            <View style={styles.header}>

                <Text style={styles.title}>{title}</Text>
                {headerRight}
            </View>
            {children}
        </View>
    );
}

export default PageHeader;