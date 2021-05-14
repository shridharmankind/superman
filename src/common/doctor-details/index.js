import React, { useState } from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import {useTheme, Card, Title, Subheading  } from 'react-native-paper';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Chip } from '../index'
import theme from '../../themes'


/**
 * Custom doctor details component using Chip from react-native-paper.
 * This serves the purpose to make the use of doctor details consistent throughtout the app
 * @param {String} title text of the chip
 * @param {String} specialization doctor specialization eg. Cardiologist, Neurologist
 * @param {String} image doctor image 
 * @param {Boolean} selected doctor is selected or not
 * @param {String} category category of doctor eg: KYC, AA, A+
 * @param {String} location location of the doctor
 * @param {Function} onPress click event
 * @param {String} testID date test id
 */

const DoctorDetails = ({title, specialization, image, category, selected, location}) => {
    const {colors} = useTheme();

    return(        
        
        <View style={styles.container}>
            <View style={[styles.divisionContainer]}>
                <Text style={styles.divisionText}>{category}</Text>
            </View>
            <Image 
                style={styles.image}                    
                source={require('../../assets/images/logo.png')}
            />
            <View style={styles.detailsContainer}>
                <Title>{title}</Title>
                <View>
                    <Subheading>{specialization}</Subheading>
                    {location && <Subheading style={styles.location}>{location}</Subheading>}
                </View>
            </View>
            {selected && 
                <View style={styles.checkContainer}>
                    <Icon name="check-circle" size={20} color="#0095d1" />
                </View>
            }
        </View>     
    )
}

export default DoctorDetails;