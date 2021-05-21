import React, {useState, useEffect, useCallback} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {Label} from 'components/elements';

/**
 * Custom dropdown component using react-native-material-dropdown-v2.
 * This serves the purpose to make the use of Dropdown throughout the app
 * @param {String} defaultLabel defaultLable for the dropdown
 * @param {Array} data pass data as an array eg: [{value: test}]
 * @param {Function} valueSelcted value to pass to parent component
 * @param {String} testID testID to pass
 */

const Dropdown = ({defaultLabel, valueSelcted, testID, data}) => {
  const [value, setValue] = useState();
  const [togglePicker, setTogglePicker] = useState(false);
  let childrenIds;

  const handleValueSelected = useCallback(
    val => {
      setValue(val);
      setTogglePicker(false);
      valueSelcted(val);
    },
    [valueSelcted],
  );

  useEffect(() => {
    handleValueSelected(value);
  }, [handleValueSelected, value]);

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={evt => {
        evt.persist();
        if (childrenIds && childrenIds.length) {
          if (childrenIds.includes(evt.target)) {
            return;
          }
          setTogglePicker(false);
        }
      }}>
      <TouchableOpacity
        testID={testID}
        style={styles.selectContainer}
        activeOpacity={1}
        onPress={() => setTogglePicker(!togglePicker)}>
        <Label title={value || defaultLabel} />
        <Icon name={'sort-down'} size={20} />
      </TouchableOpacity>
      {togglePicker && (
        <View
          style={styles.pickerContainer}
          ref={component => {
            childrenIds =
              component &&
              component._children[0]._children.map(el => el._nativeTag);
          }}>
          {data.map(option => (
            <TouchableOpacity
              key={option.value}
              style={styles.pickerLabel}
              onPress={() => handleValueSelected(option.value)}>
              <Label title={option.label} />
            </TouchableOpacity>
          ))}
        </View>
      )}
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
