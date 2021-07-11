import React, {useState} from 'react';
import {View} from 'react-native';
import {Label, LabelVariant} from 'components/elements';
import {RadioButton} from 'react-native-paper';
import styles from './styles';
import theme from 'themes';

const CustomRadioButtonGroup = ({
  radioList,
  initialSelected,
  radioLabelStyle,
  radioButtonStyle,
  radioButtonChange,
}) => {
  const [value, setValue] = useState(
    initialSelected?.value || radioList[0].value,
  );

  return (
    <RadioButton.Group
      onValueChange={newValue => {
        setValue(newValue);
        const selectedOption = radioList.find(radio => {
          return radio.value === newValue;
        });
        radioButtonChange(selectedOption);
      }}
      value={value}>
      <View style={styles.radioGroupWrapper}>
        {radioList.map(radio => {
          return (
            <View style={styles.radio}>
              <RadioButton
                color={theme.colors.blue[500]}
                value={radio.value}
                style={[styles.radioButton, radioButtonStyle]}
              />
              <Label
                variant={LabelVariant.subtitleSmall}
                style={[styles.radioLabel, radioLabelStyle]}
                title={radio.text}
              />
            </View>
          );
        })}
      </View>
    </RadioButton.Group>
  );
};

export default CustomRadioButtonGroup;
