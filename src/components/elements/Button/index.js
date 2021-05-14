import React from 'react';
import {Text} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import theme from 'themes';
import styles from './styles';

/**
 * Custom button component using Button from react-native-paper.
 * This serves the purpose to make the use of button consistent throughtout the app
 * @param {String} color  color of button
 * @param {Object} contentStyle custom style to be passed from consuming component for the button
 * @param {Boolean} disabled disable the button
 * @param {Object} labelStyle custom style for title text
 * @param {String} mode can be 'text', 'outline' or 'contained'
 * @param {Function} onPress click event
 * @param {String} testID date test id
 * @param {String} title button title
 * @param {Boolean} uppercase boolean flag to show title in uppercase or camelcase
 */

const CustomButton = ({
  color = theme.colors.primary,
  contentStyle,
  disabled,
  labelStyle,
  mode = 'outlined',
  onPress,
  testID,
  title,
  uppercase = false,
  ...rest
}) => {
  const {colors} = useTheme();
  const borderStyle = mode === 'outlined' && {
    borderColor: colors.primary,
    borderWidth: 2,
  };

  const fontStyle = (mode === 'contained' || disabled) && {
    color: colors.white,
  };

  return (
    <Button
      color={color}
      disabled={disabled}
      mode={mode}
      onPress={onPress}
      testID={testID}
      uppercase={uppercase}
      style={[
        styles.appButtonContainer,
        borderStyle,
        fontStyle,
        disabled && styles.disabledButton,
        contentStyle,
      ]}
      {...rest}>
      <Text style={[disabled && fontStyle, labelStyle, styles.appButtonText]}>
        {title}
      </Text>
    </Button>
  );
};

export default CustomButton;
