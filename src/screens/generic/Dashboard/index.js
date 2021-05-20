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

  const onActivePageChanged = pageIndex => {
    setActivePage(pageIndex);
  };

  const renderHeader = () => (
    <View
      style={{
        paddingHorizontal: 48,
        paddingVertical: 34,
        borderRadius: 16,
        width: '100%',
        backgroundColor: '#D5E2E7',
      }}>
      <Label type="bold" size={28} title="Good Morning" />
    </View>
  );

  const renderSidePanel = () => (
    <View style={{flex: 1}}>
      <Label type="bold" size={21} title="Upcoming Events" />
      <Label style={{marginTop: 30}} title="Birthdays & Anniversaries" />
      <Card
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          marginTop: 20,
          paddingHorizontal: 16,
          paddingVertical: 18,
        }}>
        <Label title="Dr. Brijesh Agarwal" />
      </Card>
      <Card
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          marginTop: 4,
          paddingHorizontal: 16,
          paddingVertical: 18,
        }}>
        <Label title="Dr. Radhika Rao" />
      </Card>
      <Card
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          marginTop: 4,
          paddingHorizontal: 16,
          paddingVertical: 18,
        }}>
        <Label title="Dr. Priya Singh" />
      </Card>
      <Card
        style={{
          backgroundColor: 'white',
          borderRadius: 8,
          marginTop: 4,
          paddingHorizontal: 16,
          paddingVertical: 18,
        }}>
        <Label title="Dr. Rajesh Chouhan" />
      </Card>
    </View>
  );

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.sidemenuContainer}>
          <NavMenu onNavItemPress={onActivePageChanged} />
        </View>
        <ContentWithSidePanel
          header={renderHeader()}
          sidePanel={renderSidePanel()}>
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
