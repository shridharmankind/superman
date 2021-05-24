import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import {Button} from 'components/elements';

/**
 * Tab component rendering as a radio button
 * @param {Boolean} isChecked determines if radio button is selected or not
 * @param {String} text button text
 * @param {Function} onTabPress click event
 * @returns button
 */
const Tab = ({isChecked, text, onTabPress}) => {
  return (
    <Button
      title={text}
      onPress={onTabPress}
      mode="text"
      contentStyle={[
        styles.radioButtonTextContainer,
        isChecked && styles.checkedButton,
      ]}
      labelStyle={[
        styles.tabNotSelectedText,
        isChecked && styles.tabSelectedText,
      ]}
    />
  );
};

Tab.propTypes = {
  isChecked: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onTabPress: PropTypes.func,
};

export default Tab;
