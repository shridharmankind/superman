import React, { useEffect } from 'react';
import {TouchableOpacity, View, Button} from 'react-native';
import {Card} from 'react-native-paper';

import {ContentWithSidePanel} from 'components/layouts';
import {Label} from 'components/elements';
import SyncAdapter from 'react-native-sync-adapter';
import styles from './styles';

const syncInterval = 60; // 1 minute
const syncFlexTime = 15; // 15 seconds

const HomeLanding = ({navigation}) => {

  useEffect(() => {
    
  },[]);

  const onSyncPress = () => {
    SyncAdapter.syncImmediately({
      syncInterval,
      syncFlexTime,
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Label type="bold" size={28} title="Good Morning" />
      <Button onPress={() => onSyncPress()} title="Sync now" />
    </View>
  );

  const renderSidePanel = () => (
    <View style={styles.sidePanel}>
      <View style={styles.descContainer}>
        <Label type="bold" size={21} title="Upcoming Events" />
        <Label style={styles.desc} title="Birthdays & Anniversaries" />
      </View>
      <Card style={styles.card}>
        <Label title="Dr. Brijesh Agarwal" />
      </Card>
      <Card style={styles.card}>
        <Label title="Dr. Radhika Rao" />
      </Card>
      <Card style={styles.card}>
        <Label title="Dr. Priya Singh" />
      </Card>
      <Card style={styles.card}>
        <Label title="Dr. Rajesh Chouhan" />
      </Card>
    </View>
  );

  return (
    <ContentWithSidePanel header={renderHeader()} sidePanel={renderSidePanel()}>
      <Label title="Welcome to our beautiful Home Page" />
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeLandingSecondary')}>
        <Label title="route to secondary landing" />
      </TouchableOpacity>
    </ContentWithSidePanel>
  );
};

export default HomeLanding;
