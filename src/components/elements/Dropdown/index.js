import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {Label} from 'components/elements';

/**
 * Custom dropdown component using react-native-material-dropdown-v2.
 * This serves the purpose to make the use of Dropdown throughout the app
 * @param {String} defaultLabel defaultLable for the dropdown
 * @param {Array} data pass data as an array eg: [{value: test}]
 * @param {Function} valueSelected value to pass to parent component
 * @param {String} testID testID to pass
 */

const Dropdown = ({defaultLabel, valueSelected, testID, data}) => {
  const [value, setValue] = useState();
  const [togglePicker, setTogglePicker] = useState(false);
  const [dropDowndata, setDropDownData] = useState(data);
  const [dropDownText, setDropdownText] = useState(defaultLabel);
  let childrenIds;

  const handleValueSelected = val => {
    setDropdownText((val && val.value) || defaultLabel);
    setTogglePicker(false);
    setValue(val);
  };

  useEffect(() => {
    valueSelected(value);
  }, [value, valueSelected]);

  const handleDropdownFocus = () => {
    setDropdownText('');
    setDropDownData(data);
    setTogglePicker(true);
  };

  const handleTextChange = text => {
    if (text) {
      setDropdownText(text);
      const filteredData = data.filter(val =>
        val.value.toLowerCase().includes(text.toLowerCase()),
      );
      if (filteredData.length > 0) {
        setDropDownData(filteredData);
      } else {
        setDropDownData([{value: 'No patch found'}]);
      }
    } else {
      setDropdownText('');
      setDropDownData(data);
    }
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={evt => {
        evt.persist();
        if (childrenIds && childrenIds.length) {
          if (childrenIds.includes(evt.target)) {
            return;
          }
          setDropdownText(value.value);
          setTogglePicker(false);
        }
      }}>
      {dropDowndata.length > 6 ? (
        <TextInput
          testID={testID}
          style={styles.selectContainer}
          value={dropDownText}
          onChangeText={text => handleTextChange(text)}
          placeholder={defaultLabel}
          onFocus={() => handleDropdownFocus()}
          right={
            <TextInput.Icon name={() => <Icon name="sort-down" size={20} />} />
          }
        />
      ) : (
        <TouchableOpacity
          testID={testID}
          style={styles.selectContainer}
          activeOpacity={1}
          onPress={() => setTogglePicker(!togglePicker)}>
          <Label title={dropDownText || defaultLabel} />
          <Icon name={'sort-down'} size={20} />
        </TouchableOpacity>
      )}
      {togglePicker && (
        <View
          style={styles.pickerContainer}
          ref={component => {
            childrenIds =
              component &&
              component._children[0] &&
              component._children[0]._children.map(el => el._nativeTag);
          }}>
          {data.map(option => (
            <TouchableOpacity
              key={option.value}
              style={styles.pickerLabel}
              onPress={() => handleValueSelected(option)}>
              <Label title={option.value} />
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
