import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const ContentWithSidePanel = ({children, header = null, sidePanel = null}) => {
  const renderSidePanel = () => (
    <View style={styles.sidePanelContainer}>{sidePanel}</View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>{header}</View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.centerPanelContainer}>
        {renderHeader()}
        <View style={styles.contentContainer}>{children}</View>
      </View>
      {renderSidePanel()}
    </View>
  );
};

ContentWithSidePanel.propTypes = {
  header: PropTypes.element,
  sidePanel: PropTypes.element,
};

export default ContentWithSidePanel;
