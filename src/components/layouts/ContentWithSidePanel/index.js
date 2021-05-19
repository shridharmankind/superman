import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const ContentWithSidePanel = ({children, sidePanel = null}) => {
  const renderSidePanel = () => (
    <View style={styles.sidePanelContainer}>{sidePanel}</View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>{children}</View>
      {renderSidePanel()}
    </View>
  );
};

ContentWithSidePanel.propTypes = {
  children: PropTypes.element,
  sidePanel: PropTypes.element,
};

export default ContentWithSidePanel;
