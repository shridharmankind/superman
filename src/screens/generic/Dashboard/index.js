import React from 'react';
import {View} from 'react-native';

import {NotificationIcon, SearchIcon} from 'assets';
import NavMenu from './components/NavMenu';

import styles from './styles';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sidemenuContainer}>
        <NavMenu />
      </View>
      <View style={styles.contentContainer}>
        <View />
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.action}>
          <SearchIcon />
        </View>
        <View style={styles.action}>
          <NotificationIcon />
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
