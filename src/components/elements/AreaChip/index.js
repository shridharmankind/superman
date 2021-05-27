import React from 'react';
import {Chip} from 'react-native-paper';
import PropTypes from 'prop-types';
import themes from 'themes';
import styles from './styles';

/**
 * Custom chip component using Chip from react-native-paper.
 * This serves the purpose to make the use of Select Area, and Doctor,chemist,all filter
 * @param {String} color  color of text
 * @param {String} title text of the chip
 * @param {String} value value of the chip
 * @param {String} count count to add in text of chip - optional
 * @param {Object} style custom style to be passed from consuming component for the button
 * @param {Boolean} selected chip is selected or not
 * @param {String} selectedColor color when chip is selected
 * @param {String} selectedTextColor color of text when chip is selected
 * @param {String} bgColor default background color of chip
 * @param {Function} onPress click event
 * @param {String} testID date test id
 */

const AreaChip = ({
  title,
  color,
  count,
  bgColor,
  selected,
  selectedColor,
  selectedTextColor,
  testID,
  style,
  value,
  onPress,
}) => {
  const selectedStyle = {
    color: selected ? selectedTextColor : color,
    fontFamily: selected ? themes.fonts.fontBold : themes.fonts.fontRegular,
  };

  return (
    <Chip
      key={value}
      testID={testID}
      style={[
        styles.chipContainer,
        style,
        {
          backgroundColor: selected && selectedColor ? selectedColor : bgColor,
        },
      ]}
      textStyle={[selectedStyle, styles.chip]}
      type="flat"
      onPress={() => onPress(value)}
      activeOpacity={1}>
      {`${title}${count ? ' (' + count + ')' : ''}`}
    </Chip>
  );
};

Chip.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selected: PropTypes.bool,
  selectedColor: PropTypes.string,
  selectedTextColor: PropTypes.string,
  bgColor: PropTypes.string,
  onPress: PropTypes.func,
  testID: PropTypes.string,
  value: PropTypes.string,
};

export default AreaChip;
