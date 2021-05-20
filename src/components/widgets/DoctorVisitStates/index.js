import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {Label} from 'components/elements';
/**
 * Custom button component using TouchableOpacity from react-native.
 * This serves the purpose to make the use of button consistent throughtout the app
 * @param {Object} contentStyle custom style to be passed from consuming component for the button
 * @param {Boolean} disabled disable the button
 * @param {Object} labelStyle custom style for title text
 * @param {String} mode can be 'text', 'outline' or 'contained'
 * @param {Function} onPress click event
 * @param {String} testID date test id
 * @param {String} title button title
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
