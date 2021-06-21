import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import {Label, LabelVariant} from 'components/elements';
import styles from './styles';
import {
  Helper,
  Constants as DBConstants,
  Schemas,
  getDBInstance,
} from 'database';
import {isWeb} from 'helper';
import {ContentWithSidePanel} from 'components/layouts';
import {translate} from 'locale';
import {getLocalTimeZone} from 'utils/dateTimeHelper';
import {Sync} from 'database';
import {Strings} from 'common';

const HomeLanding = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [lastSync, setLastSync] = useState('--:--:--');
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const firstName = await Helper.getUserFirstName();
      firstName ? setUserName(firstName) : setUserName('');
    };

    const fetchSyncTime = async () => {
      let masterData = getDBInstance().objects(
        Schemas.masterTablesDownLoadStatus.name,
      );
      setSyncListener(masterData);
      masterData.forEach(modifiedData => {
        if (modifiedData.name == DBConstants.APPLICATION_SYNC_STATUS) {
          setSync(modifiedData);
          return;
        }
      });
      return;
    };
    let subscribeNetworkCheck = null;
    if (!isWeb()) {
      loadData();
      fetchSyncTime();
      subscribeNetworkCheck = NetInfo.addEventListener(handleConnectivityChange);
      Sync.SyncService.RegisterBackgroundTask();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return async () => {
      if(!isWeb()){
        if(subscribeNetworkCheck){
          subscribeNetworkCheck();
          subscribeNetworkCheck = null;
        }
      }
    }
  }, []);

  useEffect(() => {
    if(isConnected){
      Sync.SyncService.syncNow();
    }
  },[isConnected]);


  const handleConnectivityChange = (connection) => {
    setConnected(connection.isConnected);
  }


  const setSyncListener = masterData => {
    masterData.addListener((masterData, changes) => {
      changes.insertions.forEach(index => {
        const modifiedData = masterData[index];
        setSync(modifiedData);
      });
      changes.modifications.forEach(index => {
        const modifiedData = masterData[index];
        setSync(modifiedData);
      });
    });
  };

  const setSync = syncRecord => {
    if (syncRecord.name == DBConstants.APPLICATION_SYNC_STATUS) {
      let date = getLocalTimeZone(syncRecord.lastSync);
      setLastSync(date);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Label style={styles.headerLabel} title={`Hi ${userName || ''}`} />
      <Label
        style={styles.headerLabel}
        type="semiBold"
        title={translate('goodMorning')}
      />
    </View>
  );

  const renderSyncAt = () => {
    if (!isWeb()) {
      return (
        <>
          <Label size={10.5} title={`${Strings.backgroundTask.lastSync} ${lastSync}`} />
        </>
      );
    }
  };

  const renderSidePanel = () => (
    <View style={styles.sidePanel}>
      <View style={styles.descContainer}>
        {renderSyncAt()}
        <Label
          style={styles.desc}
          type="bold"
          size={14}
          title="Upcoming Events"
        />
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
