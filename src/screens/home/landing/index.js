import React, {useEffect, useState} from 'react';
import {View,Button} from 'react-native';
import {Card} from 'react-native-paper';

import {Label} from 'components/elements';
import SyncAdapter from 'react-native-sync-adapter';
import styles from './styles';
import {Helper} from 'database';
import {View} from 'react-native';
import {Card} from 'react-native-paper';

const syncInterval = 60; // 1 minute
const syncFlexTime = 15; // 15 seconds




const HomeLanding = ({navigation}) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const firstName = await Helper.getUserFirstName();
      firstName ? setUserName(firstName) : setUserName('');
    };
    loadData();
  });
  
  useEffect(() => {
    SyncAdapter.syncImmediately({
      syncInterval,
      syncFlexTime,
    });
  },[]);

  const onSyncPress = () => {
    console.log("[EVENT_GENERATED_FOREGROUND_TASK] ");
    SyncAdapter.syncImmediately({
      syncInterval,
      syncFlexTime,
    });
  };
  

  const renderHeader = () => (
    <View style={styles.header}>
      <Label style={styles.headerLabel} title={`Hi ${userName || ''}`} />
      <Label
        style={styles.headerLabel}
        type="semiBold"
        title={translate('goodMorning')}
      />
      {/* <Button onPress={() => onSyncPress()} title="Sync now" /> */}
    </View>
  );

  const renderSidePanel = () => (
    <View style={styles.sidePanel}>
      <View style={styles.descContainer}>
        <Label type="bold" size={14} title="Upcoming Events" />
        <Label
          size={12}
          style={styles.desc}
          title="Birthdays & Anniversaries"
        />
      </View>
      <Card style={styles.card}>
        <Label size={12.7} title="Dr. Brijesh Agarwal" />
      </Card>
      <Card style={styles.card}>
        <Label size={12.7} title="Dr. Radhika Rao" />
      </Card>
      <Card style={styles.card}>
        <Label size={12.7} title="Dr. Priya Singh" />
      </Card>
      <Card style={styles.card}>
        <Label size={12.7} title="Dr. Rajesh Chouhan" />
      </Card>
    </View>
  );

  return (
    <ContentWithSidePanel header={renderHeader()} sidePanel={renderSidePanel()}>
      <Label
        variant={LabelVariant.subtitleLarge}
        title="Welcome to our Home Page"
      />
    </ContentWithSidePanel>
  );
};

export default HomeLanding;
