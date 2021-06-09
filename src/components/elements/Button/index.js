import React from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Label, {LabelVariant} from '../Label';

/**
 * Custom button component using TouchableOpacity from react-native.
 * This serves the purpose to make the use of button consistent throughtout the app
 * @param {Object} contentStyle custom style to be passed from consuming component for the button
 * @param {Boolean} disabled disable the button
 * @param {Object} labelStyle custom style for title text
 * @param {String} mode can be 'text', 'outline' or 'contained'
 * @param {Function} onPress click event
 * @param {String} testID date test id
 * @param {String} title button title
 */

const CustomButton = ({
  contentStyle,
  disabled,
  labelStyle,
  mode = 'outlined',
  onPress,
  testID,
  title,
  children,
  ...rest
}) => {
  let buttonStyle = styles.button;
  let textStyle = styles.buttonOutlinedText;
  switch (mode) {
    case 'contained':
      buttonStyle = styles.buttonContained;
      textStyle = styles.buttonContainedText;
      break;
    case 'outlined':
      buttonStyle = styles.buttonOutlined;
      textStyle = !disabled && styles.buttonOutlinedText;
      break;
  }

  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        buttonStyle,
        disabled && styles.disabledButton,
        contentStyle,
      ]}
      disabled={disabled}
      onPress={onPress}
      testID={testID}
      {...rest}>
      <Label
        variant={LabelVariant.h5}
        style={[
          styles.buttonText,
          textStyle,
          disabled && styles.disabledButton,
          labelStyle,
        ]}>
        {title || children || ''}
      </Label>
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  model: PropTypes.oneOf(['outlined', 'contained', 'text']),
  title: PropTypes.string,
  testID: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CustomButton;
