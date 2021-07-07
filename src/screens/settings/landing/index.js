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
import {showToastie, setOnDemandSyncStatusRunning} from 'utils/backgroundTask';
import ShowConflictRecords from 'screens/settings/showConflictRecords';
import ShowSuccessfullSync from 'screens/settings/showSuccessfullSync';
import theme from 'themes';
import {appSelector} from 'selectors';
import {useSelector} from 'react-redux';

/**
 * Custom Landing component of Directory Screen.
 * Initially click on directory left menu this component render
 */
const SettingLanding = ({navigation, route}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [lastSyncRecord, setLastSyncRecord] = useState(null);
  const [getConflictRecords, setConflictRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const syncStatus = useSelector(appSelector.getSyncStatus());
  const syncCompletionStatus = useSelector(
    appSelector.getSyncCompletionStatus(),
  );
  const syncCompletionMessage = [
    `${translate('backgroundTask.conflictScreen.syncCompleted')}`,
    `${translate('backgroundTask.conflictScreen.completedWithConflicts')}`,
    `${translate('backgroundTask.conflictScreen.failureInSync')}`,
  ];

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
    if (!isWeb()) {
      let conflictRecords = [];
      allRecords.forEach(records => {
        let getLength = Object.values(records)[0].length;
        if (getLength > 0) {
          conflictRecords.push(records);
        }
        totalLength += Object.values(records)[0].length;
      });
      setConflictRecords(conflictRecords);
    }
    return totalLength;
  }, [allRecords]);

  useEffect(() => {
    if (!isWeb()) {
      fetchSyncTime();
    }
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
      text: `${translate('backgroundTask.syncSummary')}`,
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
    return `${translate('backgroundTask.lastSync')} ${lastSyncRecord}`;
  };

  const handleSyncNow = async () => {
    if (syncStatus === Constants.BACKGROUND_TASK.NOT_RUNNING) {
      await setOnDemandSyncStatusRunning();
      Sync.SyncService.syncNow();
    } else {
      showToastie(
        Constants.TOAST_TYPES.ALERT,
        `${translate('backgroundTask.toastBtns.alreadRunningMessage')}`,
      );
    }
  };

  const getSyncStatus = () => {
    return syncStatus === 'NOT_RUNNING'
      ? ''
      : `${translate('backgroundTask.toastBtns.alreadRunningMessage')}`;
  };

  // Below is the doctor tab under directory page
  const conflictTab = () => {
    return (
      <>
        <View style={[styles.heading]}>
          <Label
            title={getSyncStatus()}
            variant={LabelVariant.subtitleLarge}
            textColor={theme.colors.red[100]}
          />
        </View>
        <View style={styles.heading}>
          <Label
            title={getLastSyncFormattedRecord()}
            variant={LabelVariant.subtitleLarge}
          />
          <Label
            title={
              syncCompletionStatus !== ''
                ? `${syncCompletionMessage[syncCompletionStatus]}`
                : ''
            }
            variant={LabelVariant.h5}
            textColor={
              syncCompletionStatus === 0
                ? theme.colors.green[100]
                : theme.colors.orange[200]
            }
          />
          <Button
            title={translate('backgroundTask.syncNow')}
            mode="contained"
            contentStyle={styles.buttonTabBar}
            labelStyle={styles.buttonTabBarText}
            onPress={handleSyncNow}
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
            <Label
              title={translate('backgroundTask.conflictScreen.noConflictFound')}
            />
          </View>
        )}
        <View style={[styles.heading, styles.syncHeading]}>
          <Label
            title={translate('backgroundTask.conflictScreen.tableProcessed')}
            variant={LabelVariant.h2}
          />
        </View>
        {allRecords.length > 0 && <ShowSuccessfullSync records={allRecords} />}
      </>
    );
  };

  if (isWeb()) {
    return (
      <ContentWithSidePanel>
        <Label variant={LabelVariant.subtitleLarge} title="Coming soon!" />
      </ContentWithSidePanel>
    );
  }

  return (
    <ContentWithSidePanel header={renderNavBar()}>
      {renderChildView()}
    </ContentWithSidePanel>
  );
};

export default SettingLanding;
