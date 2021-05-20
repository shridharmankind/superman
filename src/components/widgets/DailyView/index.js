import React from 'react';
import {View} from 'react-native';
import {Label} from 'components/elements';
import styles from './styles';
import {getMonth, isSameDate} from 'utils/dateTimeHelper';

const currentDate = new Date();

const isDisabled = month => month != getMonth();
/**
 * Render Daily Container
 * @param {Object} props
 */

const DailyView = ({props}) => {
  return (
    <View style={[styles.dailyViewContainer]}>
      <View
        style={[
          styles.innerContainer,
          isSameDate(props.date.dateString) && styles.currentDailyContainer,
        ]}>
        <View style={styles.headerContent}>
          <Label testID={'label_dailyView_leftContent_test'} title={''} />

          <Label
            testID={'label_dailyView_date_test'}
            size={16}
            type={isSameDate(props.date.dateString) ? 'bold' : 'regular'}
            style={[
              isDisabled(props.date.month)
                ? styles.disabledText
                : styles.activeText,
              isSameDate(props.date.dateString) && styles.currentDate,
            ]}
            title={props.date.day}
          />
        </View>

        <View style={styles.bottomContent} />
      </View>
    </View>
  );
};

export default DailyView;
