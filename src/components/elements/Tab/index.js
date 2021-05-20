import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Button} from 'components/elements';

const Tab = ({isChecked, text, onRadioButtonPress}) => {
  return (
    <Button
      title={text}
      onPress={onRadioButtonPress}
      mode="text"
      contentStyle={[
        styles.radioButtonTextContainer,
        isChecked && styles.checkedButton,
      ]}
    />
  );
};

export default Tab;
