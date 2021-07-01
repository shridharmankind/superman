import React, {useState, useEffect, useCallback, forwardRef} from 'react';
import {ScrollView, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {Label, LabelVariant} from 'components/elements';
import {Strings} from 'common';
/**
 * Custom dropdown component using react-native-material-dropdown-v2.
 * This serves the purpose to make the use of Dropdown throughout the app
 * @param {String} defaultLabel defaultLable for the dropdown
 * @param {Array} data pass data as an array eg: [{value: test}]
 * @param {Function} valueSelected value to pass to parent component
 * @param {String} testID testID to pass
 */

const Dropdown = forwardRef((props, ref) => {
  const [togglePicker, setTogglePicker] = useState(false);
  const [dropDownData, setDropDownData] = useState(data);
  const [dropDownText, setDropdownText] = useState(defaultLabel);
  const {
    defaultLabel,
    valueSelected,
    testID,
    data,
    isPatchedData,
    hideDropdown,
    setHideDropDown,
  } = props;

  const handleValueSelected = val => {
    setDropdownText(val?.value || defaultLabel);
    setTogglePicker(false);
    valueSelected(val);
  };

  useEffect(() => {
    if (hideDropdown) {
      setTogglePicker(false);
      setHideDropDown(false);
    }
  }, [hideDropdown, setHideDropDown]);

  useEffect(() => {
    if (!isPatchedData) {
      setDropdownText(defaultLabel);
    }
  }, [isPatchedData, defaultLabel]);

  const handleDropdownFocus = () => {
    setDropdownText('');
    setDropDownData(data);
    setTogglePicker(true);
  };

  const handleTextChange = useCallback(
    text => {
      if (text) {
        setDropdownText(text);
        const filteredData = data.filter(val =>
          val.displayName.toLowerCase().includes(text.toLowerCase()),
        );
        if (filteredData.length > 0) {
          setDropDownData(filteredData);
        } else {
          setDropDownData([{displayName: Strings.noPatchFound}]);
        }
      } else {
        setDropdownText('');
        setDropDownData(data);
      }
    },
    [data],
  );

  return (
    <View style={styles.container}>
      {data?.length > 6 ? (
        <TextInput
          testID={testID}
          style={styles.selectContainer}
          value={dropDownText}
          onChangeText={text => handleTextChange(text)}
          placeholder={defaultLabel}
          onFocus={() => handleDropdownFocus()}
          right={
            <TextInput.Icon
              name={() => (
                <Icon name="sort-down" size={20} style={styles.sortDown} />
              )}
            />
          }
        />
      ) : (
        <TouchableOpacity
          testID={testID}
          style={styles.selectContainer}
          activeOpacity={1}
          onPress={() => setTogglePicker(!togglePicker)}>
          <Label
            title={dropDownText || defaultLabel}
            variant={LabelVariant.subtitleSmall}
          />
          <Icon name={'sort-down'} size={20} style={styles.sortDown} />
        </TouchableOpacity>
      )}
      {togglePicker && (
        <ScrollView style={styles.pickerContainer} ref={ref}>
          {(dropDownData.length > 0 ? dropDownData : data)?.map((option, i) => (
            <View>
              <TouchableOpacity
                key={option.displayName}
                style={[
                  styles.pickerLabel,
                  data.length === i + 1 ? styles.noBorder : null,
                ]}
                onPress={() => handleValueSelected(option)}>
                <Label
                  title={option.displayName}
                  variant={LabelVariant.subtitleSmall}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
});

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
