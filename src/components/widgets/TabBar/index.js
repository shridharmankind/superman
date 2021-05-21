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
 * @retuns tab bar view
 */

const TabBar = ({values, onPress}) => {
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
    <View>
      <View style={styles.tabBarContainer}>{renderRadioButtons()}</View>
    </View>
  );
};

TabBar.propTypes = {
  values: PropTypes.array.isRequired,
  onPress: PropTypes.func,
};

export default TabBar;
