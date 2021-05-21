import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {Label} from 'components/elements';
/**
 * renders the doctor visit states - upcoming, completed, today, missed etc.
 * @param {String} visitDate date to visit doctor
 * @param {String} visitMonth month of visit
 * @param {String} testID test id
 * @param {String} visitState can be upcoming, today, completed etc.
 * @returns view of visit states
 */

const DoctorVisitStates = ({
  visitDate,
  visitMonth,
  testID,
  visitState,
  ...props
}) => {
  return (
    <View
      testID={testID}
      style={[
        styles.container,
        visitState && styles[visitState.toLowerCase()],
      ]}>
      <View style={styles.visitContainer}>
        <Label title={visitDate} size={12} style={styles.visitDate} />
        <Label title={visitMonth} size={12} style={styles.visitMonth} />
      </View>
    </View>
  );
};

DoctorVisitStates.propTypes = {
  visitDate: PropTypes.string.isRequired,
  visitMonth: PropTypes.string.isRequired,
  testID: PropTypes.string,
  visitState: PropTypes.string,
};

export default DoctorVisitStates;
