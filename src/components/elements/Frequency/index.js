/* eslint-disable indent */
/*todo*/
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import themes from 'themes';
import styles from './styles';

/**
 * Custom frequecy component
 * This serves the purpose to make the use of setting visit frequecy consistent throughtout the app
 * @param {Boolean} visited visited
 * @param {String} testID date test id
 */

const Frequency = ({visited, testID, ...props}) => {
  const isVisited = visited
    ? {
        borderColor: themes.colors.grey[200],
        borderWidth: 1,
        backgroundColor: themes.colors.white,
      }
    : {backgroundColor: themes.colors.grey[300]};

  return (
    <View style={[styles.container, isVisited]} testID={testID}>
      {visited && (
        <Icon name="circle" size={10} color={themes.colors.grey[200]} />
      )}
    </View>
  );
};

Frequency.defaultProps = {
  visited: false,
};

Frequency.propsTypes = {
  testID: PropTypes.string,
  visited: PropTypes.bool,
};

export default Frequency;
