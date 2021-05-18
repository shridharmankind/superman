import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types'
import styles from './styles';


/**
 * Custom frequecy component
 * This serves the purpose to make the use of setting visit frequecy consistent throughtout the app 
 * @param {Boolean} visited visited 
 * @param {String} testID date test id
 */

const Frequecy = ({visited, testID, ...props}) => {

    const isVisited = visited ? {borderColor:'#1C1939',borderWidth:1,backgroundColor:'#fff'}: {backgroundColor:'#e3e3e3'}

    return(
        <View style={[styles.container,isVisited]} testID={testID}>
             {visited && <Icon name="circle" size={16} color="#1C1939" />}
        </View>
    )
}

Frequecy.defaultProps = {
    visited: false
};


Frequecy.propsTypes = {
    testID: PropTypes.string,
    visited: PropTypes.bool
}


export default Frequecy;