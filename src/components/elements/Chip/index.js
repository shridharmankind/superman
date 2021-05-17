import React from 'react'
import {View, Text} from 'react-native';
import { Chip } from 'react-native-paper';
import PropTypes from 'prop-types';
import styles from './styles';

/**
 * Custom chip component using Chip from react-native-paper.
 * This serves the purpose to make the use of Select Area, and Doctor,chemist,all filter
 * @param {String} color  color of text
 * @param {String} title text of the chip
 * @param {String} count count to add in text of chip - optional
 * @param {Object} style custom style to be passed from consuming component for the button
 * @param {Boolean} selected chip is selected or not
 * @param {String} selectedColor color when chip is selected
 * @param {String} selectedTextColor color of text when chip is selected
 * @param {String} bgColor default background color of chip
 * @param {Function} onPress click event
 * @param {String} testID date test id
 */

const ChipContent = ({ 
    title, 
    color, 
    count, 
    bgColor, 
    selected, 
    selectedColor, 
    selectedTextColor,
    testID, 
    ...props
}) => {

    return(     
        <Chip 
            testID={testID}
            style={[styles.chipContainer,props.style,{
                backgroundColor:selected && selectedColor ? selectedColor : bgColor
            }]} 
            textStyle={{ color:selected ? selectedTextColor : color}}
            type="flat" 
            onPress={() => props.onPress()}           
        >
            {`${title} ${count ? '('+count+')' : ''}`}
        </Chip>
    )
}

ChipContent.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    style: PropTypes.object,
    selected: PropTypes.bool,
    selectedColor: PropTypes.string,
    selectedTextColor: PropTypes.string,
    bgColor: PropTypes.string,
    onPress: PropTypes.func,
    testID: PropTypes.string
}

export default ChipContent;
