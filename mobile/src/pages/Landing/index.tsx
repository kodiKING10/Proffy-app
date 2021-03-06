import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import api from '../../services/api';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

function Landing(){

    const [totalConnections , setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;
            setTotalConnections(total);
        })
    }, []);

    const { navigate } = useNavigation();

    function handleNavigateToGiveClassesPage(){
        navigate('GiveClasses');
    }

    function handleNavigateToStudyPages(){
        navigate('Study');
    }

    return (
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner}></Image>

            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity 
                    onPress={handleNavigateToStudyPages}
                    style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon} />
                    
                    <Text style={styles.buttonText}>Estudar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={handleNavigateToGiveClassesPage} 
                    style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon} />
                    
                    <Text style={styles.buttonText}>Dar aulas</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.totalConnections}>
                Total de { totalConnections } conexões já realizadas.{'  '}
                <Image source={heartIcon} />
            </Text>
        </View>
    );
}

export default Landing;