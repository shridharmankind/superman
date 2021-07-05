import React from 'react';
import {ActivityIndicator} from 'react-native';
import themes from 'themes';
import styles from './styles';

/**
 * Variant for loader sizes
 */
export const LoaderVariant = {
  LARGE: 'large',
  SMALL: 'small',
};

/**
 *  Returns style
 * @param {Boolean} animating
 * @param {String} color
 * @param {String} size
 * @param {Object} style
 * @returns
 */
const renderActivityIndicator = (animating, color, size, style) => {
  return (
    <ActivityIndicator
      animating={animating}
      color={color}
      size={size}
      style={[styles.activityIndicator, style]}
    />
  );
};
/**
 *
 * @param {Boolean} animating
 * @param {Object} style
 * @returns Activity Indicator
 */
const Loader = ({
  show = false,
  animating = true,
  color = themes.colors.darkBlue,
  size = LoaderVariant.LARGE,
  style,
}) => {
  return show ? renderActivityIndicator(animating, color, size, style) : null;
};

export default Loader;
