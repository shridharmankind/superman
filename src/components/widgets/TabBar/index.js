import React, {useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {Tab} from 'components/widgets';

/**
 * Custom tab bar component rendering tabs, acting as radio button group.
 * This serves the purpose show top tab bars
 * @param {Array} values  array of radio buttons
 * @param {Function} onPress click event on tab
 * @param {Object} customStyle custom style for tab
 * @retuns tab bar view
 */

const TabBar = ({values, onPress, customStyle}) => {
  const [currentSelectedItem, setCurrentSelectedItem] = useState(0);

  const onTabPress = idx => {
    onPress(idx);
    setCurrentSelectedItem(idx);
  };

  /**
   * function to render tabs
   * @returns list of tabs
   */
  const renderRadioButtons = () => {
    return (values || []).map((listItem, idx) => {
      return (
        <Tab
          key={idx}
          onTabPress={() => onTabPress(idx)}
          isChecked={currentSelectedItem === idx}
          text={listItem.text}
        />
      );
    });
  };
  return (
    <View style={customStyle || styles.tabBarContainer}>
      {renderRadioButtons()}
    </View>
  );
};

TabBar.propTypes = {
  values: PropTypes.array.isRequired,
  onPress: PropTypes.func,
  customStyle: PropTypes.object,
};

export default TabBar;
