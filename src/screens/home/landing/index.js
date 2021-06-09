import React, {useEffect, useState} from 'react';
import {View,Button} from 'react-native';
import {Card} from 'react-native-paper';

import {Label,LabelVariant} from 'components/elements';
import SyncAdapter from 'react-native-sync-adapter';
import styles from './styles';
import {Helper,Constants as DBConstants,Operations,Schemas} from 'database';

import {ContentWithSidePanel} from 'components/layouts';
import {translate} from 'locale';


const syncInterval = 60; // 1 minute
const syncFlexTime = 15; // 15 seconds




const HomeLanding = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [lastSync, setLastSync] = useState('--:--:--');

  useEffect(() => {
    const loadData = async () => {
      const firstName = await Helper.getUserFirstName();
      firstName ? setUserName(firstName) : setUserName('');
    };
    const fetchSyncTime = async () => {
      let schemaName = Helper.MASTER_TABLES_DETAILS[1].name;
      const record = await Operations.getRecord(
        Schemas.masterTablesDownLoadStatus,
        schemaName,
      ); 
      if (record?.status === DBConstants.downloadStatus.PENDING) {
        setLastSync(`--:--:--`);
      }
      else{
        setLastSync(record.lastSync)
      }
      return;
    }
    loadData();
    fetchSyncTime();
    setTimeout(() => {
      fetchSyncTime();
    },5000);
    
  },[]);
  
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
      <Label style={styles.headerLabel} title={`Last Sync : ${lastSync}`} />
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
