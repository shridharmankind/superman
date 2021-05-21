import React from 'react';
import {View} from 'react-native';
import {Label} from 'components/elements';
import styles from './styles';
const currentDate = new Date();

const isDisabled = month => month !== currentDate.getMonth() + 1;

//TO DO: will move to utility once finalise time lib
const isCurrent = date =>
  date.day === currentDate.getDate() &&
  date.month === currentDate.getMonth() + 1;

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
          isCurrent(props.date) && styles.currentDailyContainer,
        ]}>
        <View style={styles.headerContent}>
          <Label size={16} title={''} />

          <Label
            size={16}
            type={isCurrent(props.date) ? 'bold' : 'regular'}
            style={[
              isDisabled(props.date.month)
                ? styles.disabledText
                : styles.activeText,
              isCurrent(props.date) && styles.currentDate,
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
