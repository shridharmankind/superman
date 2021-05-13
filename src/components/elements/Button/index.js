import React from 'react';
import {Text} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import theme from 'themes';

import styles from './styles';

const AppButton = ({
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

  return (
    <Button
      disabled={disabled}
      mode={mode}
      onPress={onPress}
      testID={testID}
      uppercase={uppercase}
      style={[
        styles.appButtonContainer,
        contentStyle,
        borderStyle,
        disabled && styles.disabledButton,
      ]}
      color={color}
      {...rest}>
      <Text
        style={[
          styles.appButtonText,
          labelStyle,
          disabled && styles.disabledButtonColor,
        ]}>
        {title}
      </Text>
    </Button>
  );
};

export default AppButton;
