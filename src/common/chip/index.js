import React, { useState } from 'react';
import {useTheme, Chip } from 'react-native-paper';
import styles from './styles';

/**
 * Custom chip component using Chip from react-native-paper.
 * This serves the purpose to make the use of chip consistent throughtout the app
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

export default function ChipContent({ 
    title, 
    color, 
    count, 
    bgColor, 
    selected, 
    selectedColor, 
    selectedTextColor,
    testID, 
    ...props
}) {

    const {colors} = useTheme();

    return(
        <Chip 
            testID={testID && testID}
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

