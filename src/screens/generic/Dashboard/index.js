import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';

import {Label} from 'components/elements';
import {ContentWithSidePanel} from 'components/layouts';

import NavMenu from './components/NavMenu';
import navMenuData from './components/NavMenu/navMenuData';

import {NotificationIcon, SearchIcon} from 'assets';

import styles from './styles';
import {Card} from 'react-native-paper';

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

  const renderSidePanel = () => {
    <View style={{flex: 1}}>
      <Label title={navMenuData[activePage].label} />
      <Card
        style={{
          height: 200,
          width: 200,
          backgroundColor: 'white',
          borderRadius: 16,
        }}>
        <Label title={navMenuData[activePage].label} />
      </Card>
    </View>;
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.sidemenuContainer}>
          <NavMenu
            onNavItemPress={onActivePageChanged}
            onNavToggled={onNavToggled}
          />
        </View>
        <ContentWithSidePanel sidePanel={renderSidePanel()}>
          <Label title={navMenuData[activePage].label} />
        </ContentWithSidePanel>
        <View style={styles.actionsContainer}>
          <View style={styles.action}>
            <SearchIcon height={32} width={32} />
          </View>
          <View style={[styles.action, styles.actionPadding]}>
            <NotificationIcon height={32} width={32} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
