import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {NotificationIcon, SearchIcon} from 'assets';
import NavMenu from './components/NavMenu';
import {Label} from 'components/elements';
import navMenuData from './components/NavMenu/navMenuData';

import styles from './styles';

const Dashboard = () => {
  const [activePage, setActivePage] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(true);

  const onActivePageChanged = pageIndex => {
    setActivePage(pageIndex);
  };

  useEffect(() => {
    // transition of content layout to left side
  }, [isNavOpen]);

  const onNavToggled = open => {
    setIsNavOpen(open);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidemenuContainer}>
        <NavMenu
          onNavItemPress={onActivePageChanged}
          onNavToggled={onNavToggled}
        />
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Label title={navMenuData[activePage].label} />
        </View>
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
