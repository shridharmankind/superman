import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {Tab} from 'components/elements';

/**
 * Custom tab bar component using react navigation.
 * This serves the purpose show top tab bars
 * @param {Object} state  state object
 * @param {Object} descriptors state descriptors like tab bar label
 * @param {Object} navigation object containging navigation functions like navigate, emit
 */

const TabBar = ({values, onPress}) => {
  const [currentSelectedItem, setCurrentSelectedItem] = useState(0);

  const _onPress = idx => {
    onPress(idx);
    setCurrentSelectedItem(idx);
  };

  const renderRadioButtons = () => {
    return (values || []).map((listItem, idx) => {
      let isChecked = currentSelectedItem === idx ? true : false;
      return (
        <Tab
          key={idx}
          onRadioButtonPress={() => _onPress(idx)}
          isChecked={isChecked}
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
  state: PropTypes.object,
  descriptors: PropTypes.object,
  navigation: PropTypes.object,
};

export default TabBar;
