import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

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
  ...rest
}) => {
  let buttonStyle;
  let textStyle;
  switch (mode) {
        case 'contained':
          buttonStyle = styles.buttonContained;
          break;
        case 'outlined':
          buttonStyle = styles.buttonOutlined;
          textStyle = !disabled && styles.buttonOutlinedText;
          break;
        default:
          buttonStyle = styles.button;
          textStyle = styles.buttonOutlinedText;
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
      testId={testID}
      {...rest}>
      <Text
        style={[
          styles.buttonText,
          textStyle,
          disabled && styles.disabledButton,
          labelStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
