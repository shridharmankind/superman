import React, {useEffect, useState} from 'react';
import {View, Button} from 'react-native';
import {Card} from 'react-native-paper';

import {Label, LabelVariant} from 'components/elements';
import styles from './styles';
import {
  Helper,
  Constants as DBConstants,
  Operations,
  Schemas,
  getDBInstance,
  Sync,
} from 'database';

import {ContentWithSidePanel} from 'components/layouts';
import {translate} from 'locale';
import {getLocalTimeZone} from 'utils/dateTimeHelper';
import {checkForPendingMasterDataDownload} from 'src/database/helper';

const HomeLanding = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [lastSync, setLastSync] = useState('--:--:--');

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

    loadData();
    fetchSyncTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   console.log('Landing Screen');
  //   Sync.SyncService.syncInit();
  // }, []);

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

  const renderSidePanel = () => (
    <View style={styles.sidePanel}>
      <View style={styles.descContainer}>
        <Label type="bold" size={14} title="Last Sync:" />
        <Label size={14} title={`${lastSync}`} />
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
