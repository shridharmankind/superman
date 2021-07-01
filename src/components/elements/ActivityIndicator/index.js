import React from 'react';
import {ActivityIndicator} from 'react-native';
import themes from 'themes';
import styles from './styles';

export const ACTIVITY_INDICATOR_SIZE = {
  LARGE: 'large',
  SMALL: 'small',
};

/**
 *
 * @param {Boolean} animating
 * @param {Object} style
 * @returns Activity Indicator
 */
const CustomActivityIndicator = ({
  animating = true,
  color = themes.colors.darkBlue,
  style,
}) => {
  return (
    <ActivityIndicator
      animating={animating}
      color={color}
      size={ACTIVITY_INDICATOR_SIZE.LARGE}
      style={[styles.activityIndicator, style]}
    />
  );
};

export default CustomActivityIndicator;
