import React, {useState, useEffect} from 'react';
import {View, LogBox} from 'react-native';
import {Dropdown as DropdownContainer} from 'react-native-material-dropdown-v2';
import PropTypes from 'prop-types';
import styles from './styles';

/**
 * Custom dropdown component using react-native-material-dropdown-v2.
 * This serves the purpose to make the use of Dropdown throughout the app
 * @param {Number,String} pickerWidth  define width of the picker
 * @param {Number,String} shadowOpacity define opacity of shadow for picker
 * @param {Number} animationDuration duration of animation to show picker on click
 * @param {Array} data pass data as an array eg: [{value: test}]
 * @param {Function} valueSelcted value to pass to parent component
 * @param {String} testID testID to pass
 */

const Dropdown = ({
  pickerWidth,
  shadowOpacity,
  animationDuration,
  valueSelcted,
  testID,
  data,
}) => {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  return (
    <View style={styles.container}>
      <DropdownContainer
        data={data}
        value={'Select Patch'}
        dropdownOffset={styles.offset}
        shadeOpacity={shadowOpacity}
        pickerStyle={[styles.picker, {width: pickerWidth}]}
        rippleOpacity={0}
        style={styles.dropDownContainer}
        animationDuration={animationDuration}
        onChangeText={value => valueSelcted(value)}
        useNativeDriver={true}
        testID={testID}
      />
    </View>
  );
};

Dropdown.defaultProps = {
  pickerWidth: 220,
  shadowOpacity: 0.7,
  animationDuration: 50,
  data: [],
};

Dropdown.propTypes = {
  pickerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  shadeOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animationDuration: PropTypes.number,
  data: PropTypes.array.isRequired,
  valueSelcted: PropTypes.func,
};

export default Dropdown;
