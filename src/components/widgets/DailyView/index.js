import React from 'react';
import {View} from 'react-native';
import {Label} from 'components/elements';
import styles from './styles';

const isDisabled = month => month !== new Date().getMonth() + 1;

const DailyView = ({props}) => {
  return (
    <View style={styles.dailyViewContainer}>
      <View style={styles.headerContent}>
        <Label size={16} title={''} />
        <Label
          size={16}
          style={
            isDisabled(props.date.month)
              ? styles.disabledText
              : styles.activeText
          }
          title={props.date.day}
        />
      </View>

      <View style={styles.bottomContent} />
    </View>
  );
};

export default DailyView;
