import React, { useState } from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {useTheme, Card, Title, Subheading  } from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function DoctorDetails({navigation}) {
    const {colors} = useTheme();

    return(        
        <View style={styles.container}>
            <View style={[styles.divisionContainer]}>
                <Text style={styles.divisionText}>KYC</Text>
            </View>
            <Image 
                style={styles.image}                    
                source={require('../../assets/images/logo.png')}
            />
            <View style={styles.detailsContainer}>
                <Title>Dr. Harish Kumar</Title>
                <Subheading>Cardiologist</Subheading>
            </View>
            <View style={styles.checkContainer}>
                <Icon name="check-circle" size={20} color="#0095d1" />
            </View>
        </View>        
    )
}