import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import {useTheme} from 'react-native-paper';

import styles from './styles';

const AppButton = ({
  onPress,
  title,
  disabled,
  testID,
  mode,
  uppercase,
  color,
  contentStyle,
  labelStyle,
}) => {
  const {colors} = useTheme();

  return (
    <Button
      disabled={disabled}
      mode={mode}
      onPress={onPress}
      testID={testID}
      uppercase={uppercase}
      style={[styles.appButtonContainer, disabled && styles.disabledButton]}
      contentStyle={contentStyle}
      color={color || colors.primary}>
      <Text
        labelStyle={labelStyle}
        style={[styles.appButtonText, disabled && styles.btnColorContained]}>
        {title}
      </Text>
    </Button>
  );
};

export default AppButton;
