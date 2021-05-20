import React from 'react';
import {View} from 'react-native';
import {Label} from 'components/elements';
import styles from './styles';

const isDisabled = month => month !== new Date().getMonth() + 1;

const isCurrent = date => date === new Date().getDate();

const DailyView = ({props}) => {
  return (
    <View style={styles.dailyViewContainer}>
      <View style={styles.headerContent}>
        <Label size={16} title={''} />

        <Label
          size={16}
          type={isCurrent(props.date.day) ? 'bold' : 'regular'}
          style={[
            isDisabled(props.date.month)
              ? styles.disabledText
              : styles.activeText,
            isCurrent(props.date.day) && styles.currentDate,
          ]}
          title={props.date.day}
        />
      </View>

      <View style={styles.bottomContent} />
    </View>
  );
};

export default DailyView;
