import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import styles from './styles';
import PageHeader from '../../Components/PageHeader';
import { RectButton } from 'react-native-gesture-handler';
import heartOutlineIcon from '../../Assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../Assets/images/icons/unfavorite.png';
import whatsappIcon from '../../Assets/images/icons/whatsapp.png';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../Services/api';

export interface Teacher {
    id: number,
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string,
    subject: string,
    cost: Number
};

interface TeacherItemProps {
    teacher: Teacher,
    favorited: boolean
}


const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    const [isFavorited, setIsFavorited] = useState(favorited);
    function LinkToWhatsapp() {
        api.post('connection',
            {
                user_id: teacher.id
            });
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    async function ToogleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritesArray = [];
        if (favorites) {
            favoritesArray = JSON.parse(favorites);
        }

        if (isFavorited) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id;
            });
            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);

        }
        else {

            favoritesArray.push(teacher);
            setIsFavorited(true);
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>{teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'    '}
                    <Text style={styles.priceValue}>
                        {teacher.cost}
                    </Text>
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <RectButton onPress={ToogleFavorite}
                    style={
                        [
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {}
                        ]}>
                    {
                        isFavorited
                            ? <Image source={unFavoriteIcon} />
                            : <Image source={heartOutlineIcon} />
                    }

                </RectButton>

                <RectButton style={styles.contactButton} onPress={LinkToWhatsapp}>
                    <Image source={whatsappIcon} />
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>
            </View>
        </View>

    );
}

export default TeacherItem;