import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import styles from './styles';
import giveClassesBgImage from '../../Assets/images/give-classes-background.png';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses() {
    const {goBack} = useNavigation();
    
    function navigationBack(){
        goBack();
    }
    
    return (
        <View style={styles.container} >
            <ImageBackground source={giveClassesBgImage} style={styles.content} resizeMode='contain'>
                <Text style={styles.title}>Quer ser um proffy?</Text>
                <Text style={styles.description}> 
                 Para começar, você precisa se cadastrar como professor na nossa plataforma web. </Text>
            </ImageBackground>
            <RectButton style={styles.okButton} onPress={goBack}>
              <Text style={styles.okButtonText}>Tudo Bem!</Text>
            </RectButton>
        </View>
    );
}

export default GiveClasses;
