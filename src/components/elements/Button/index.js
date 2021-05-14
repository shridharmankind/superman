import React from 'react';
import {Text} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import theme from 'themes';
import styles from './styles';

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
        borderStyle,
        contentStyle,
        disabled && styles.disabledButton,
        fontStyle,
        styles.appButtonContainer,
      ]}
      {...rest}>
      <Text style={[disabled && fontStyle, labelStyle, styles.appButtonText]}>
        {title}
      </Text>
    </Button>
  );
};

export default CustomButton;
