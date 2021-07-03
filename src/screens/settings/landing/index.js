import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {ContentWithSidePanel} from 'components/layouts';
import {Label, LabelVariant, Button} from 'components/elements';
import {Strings, Constants} from 'common';
import {translate} from 'locale';
import styles from './styles';
import {TabBar} from 'components/widgets';
import {Operations, Constants as DBConstants, Sync} from 'database';
import {isWeb} from 'helper';
import {getLocalTimeZone} from 'utils/dateTimeHelper';
import {getBackgrounTaskValue, showToastie} from 'utils/backgroundTask';
import ShowConflictRecords from 'screens/settings/showConflictRecords';
import ShowSuccessfullSync from 'screens/settings/showSuccessfullSync';

/**
 * Custom Landing component of Directory Screen.
 * Initially click on directory left menu this component render
 */
const SettingLanding = ({navigation, route}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [lastSyncRecord, setLastSyncRecord] = useState(null);
  const [getConflictRecords, setConflictRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);

  useEffect(() => {
    const fetchDbRecords = async () => {
      const recordList = await Sync.SyncOperation.getAllConflictRecords();
      setAllRecords(recordList);
    };
    if (!isWeb()) {
      fetchDbRecords();
    }
  }, [lastSyncRecord]);

  useEffect(() => {
    let totalLength = 0;
    let conflictRecords = [];
    allRecords.forEach(records => {
      let getLength = Object.values(records)[0].length;
      if (getLength > 0) {
        conflictRecords.push(records);
      }
      totalLength += Object.values(records)[0].length;
    });
    setConflictRecords(conflictRecords);
    return totalLength;
  }, [allRecords]);

  useEffect(() => {
    fetchSyncTime();
  }, [fetchSyncTime]);

  const fetchSyncTime = useCallback(async () => {
    let masterData = await Operations.getLastSyncTime();
    setSyncListener(masterData);
    masterData.forEach(modifiedData => {
      if (modifiedData.name === DBConstants.APPLICATION_SYNC_STATUS) {
        setSync(modifiedData);
        return;
      }
    });
    return;
  }, [setSyncListener]);

  const setSyncListener = useCallback(masterData => {
    masterData.addListener((masterDataRecord, changes) => {
      changes.insertions.forEach(index => {
        const modifiedData = masterData[index];
        setSync(modifiedData);
      });
      changes.modifications.forEach(index => {
        const modifiedData = masterData[index];
        setSync(modifiedData);
      });
    });
  }, []);

  const setSync = syncRecord => {
    if (syncRecord.name === DBConstants.APPLICATION_SYNC_STATUS) {
      let syncTime = getLocalTimeZone(syncRecord.lastSync);
      setLastSyncRecord(syncTime);
    }
  };

  const data = [
    {
      text: `${Strings.setting.tab.conflicts}`,
    },
  ];

  // For rendering navbars
  const renderNavBar = () => {
    return (
      <View style={styles.mainTabContainer}>
        <TabBar
          values={data}
          onPress={onTabPress}
          customStyle={styles.tabBarContainer}
        />
      </View>
    );
  };

  /**
   * Function to set the state of Tab
   */
  const onTabPress = itemIdx => {
    setSelectedTabIndex(itemIdx);
  };

  // To render the tabs based on selected index
  const renderChildView = () => {
    switch (selectedTabIndex) {
      case 0:
        return conflictTab();
      default:
        return <Label title={Strings.comingSoon} />;
    }
  };

  /**
   * formats current date
   * @returns formatted date
   */
  const getLastSyncFormattedRecord = () => {
    return `${Strings.backgroundTask.lastSync} ${lastSyncRecord}`;
  };

  const handleSyncNow = async () => {
    const getSyncStatus = await getBackgrounTaskValue();
    if (getSyncStatus === Constants.BACKGROUND_TASK.NOT_RUNNING) {
      console.log('do ations');
    } else {
      // showToastie(
      //   Constants.TOAST_TYPES.ALERT,
      //   Strings.backgroundTask.toastBtns.alreadRunningMessage,
      // );
    }
  };

  // Below is the doctor tab under directory page
  const conflictTab = () => {
    return (
      <>
        <View style={styles.heading}>
          <Label
            title={getLastSyncFormattedRecord()}
            variant={LabelVariant.subtitleLarge}
          />
          <Button
            title={translate('backgroundTask.syncNow')}
            mode="contained"
            contentStyle={styles.buttonTabBar}
            labelStyle={styles.buttonTabBarText}
            onPress={handleSyncNow()}
          />
        </View>
        {getConflictRecords.length > 0 && (
          <ShowConflictRecords records={getConflictRecords} />
        )}
        {getConflictRecords.length === 0 && (
          <View>
            <Label
              title={translate('backgroundTask.syncConflict')}
              variant={LabelVariant.h2}
            />
            <Label title={'No Conflict Found'} />
          </View>
        )}
        <View style={[styles.heading, styles.syncHeading]}>
          <Label title={'Synced Tables'} variant={LabelVariant.h2} />
        </View>
        {allRecords.length > 0 && <ShowSuccessfullSync records={allRecords} />}
      </>
    );
  };

  return (
    <ContentWithSidePanel header={renderNavBar()}>
      {renderChildView()}
    </ContentWithSidePanel>
  );
};

export default SettingLanding;
