import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Image,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './styles';
import {Strings} from 'common';
import {NetworkService} from 'services';
import {Label} from 'components/elements';
import themes from 'themes';
import {Helper, Constants as DBConstants, Operations, Schemas,MonthlyPlan} from 'database';
import {KeyChain, CircularProgressBarWithStatus, isWeb} from 'helper';
import {Background, LogoMankindWhite} from 'assets';
import {Constants} from 'common';
import {Routes} from 'navigations';

const MasterDataDownload = ({navigation}) => {
  const progressBarSyncParam = 10 / 10; // (it will be in multiple of 10 and near to actual total tables to download)/10
  const [progress, setProgress] = useState(0);
  const [indeterminate, setIndeterminate] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) {
        setIndeterminate(false);
      }
    }, 3000);

    const fetchData = async () => {
      try {
        await initMasterTablesDownloadStatus();
        
        for (let i = 0; i < Helper.MASTER_TABLES_DETAILS.length; i++) {
          let item = Helper.MASTER_TABLES_DETAILS[i];
          const record = await Operations.getRecord(
            Schemas.masterTablesDownLoadStatus,
            item.name,
          );  
          if (record?.status === DBConstants.downloadStatus.DOWNLOADED) {
            return;
          }
          let response = await getAPIResponse(item);
          if (response.status === Constants.HTTP_OK) {
            const data = JSON.stringify(response.data);
            await createMasterRecord(item,data);
            await Operations.updateRecord(
              Schemas.masterTablesDownLoadStatus,
              DBConstants.downloadStatus.DOWNLOADED,
              item.name,
            );
            if (i % progressBarSyncParam === 0) {
              setProgress(prevProgress => prevProgress + 0.1);
            }
          } else {
            Alert.alert(Strings.info, response);
          }
        }
        await Operations.createRecord(Schemas.masterTablesDownLoadStatus, {
          name: DBConstants.APPLICATION_SYNC_STATUS,
          status: DBConstants.downloadStatus.DOWNLOADED,
          lastSync: new Date()
        });
        navigation.reset({
          routes: [{name: Routes.ROUTE_DASHBOARD}],
        });
      } catch (error) {
        Alert.alert(Strings.info, error);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [navigation, progressBarSyncParam]);


  const createMasterRecord = async (item,data) => {
    switch (item.name) {
      case DBConstants.MASTER_TABLE_USER_INFO:
        await Operations.createUserInfoRecord(
          item.schema,
          JSON.parse(data),
        );
        break;

      case DBConstants.MASTER_TABLE_PARTY:
        await Operations.createPartyMasterRecord(
          item.schema,
          JSON.parse(data),
        );
        break;
      case DBConstants.MASTER_MONTHLY_TABLE_PLAN:
        await MonthlyPlan.createMonthlyMasterRecord(
          item.schema,
          JSON.parse(data),
        );
        break;
    }
  }
  const getAPIResponse = async (item) => {
    try{
      let response;
      switch (item.name) {
        case DBConstants.MASTER_TABLE_USER_INFO:
          response = await NetworkService.get(item.apiPath);
          break;
        case DBConstants.MASTER_TABLE_PARTY:
          {
            const staffPositionId = await Helper.getStaffPositionId();
            response = await NetworkService.get(
              `${item.apiPath}${staffPositionId}`,
            );
          }
          break;
        case DBConstants.MASTER_MONTHLY_TABLE_PLAN:
          {
            const staffPositionId = await Helper.getStaffPositionId();
            response = await NetworkService.get(
              `${item.apiPath}2`,
            );
          } 
          break;   
      }
      return response;
    }catch(err){
      console.log("getAPIResponse", err);
    }
  }

  const initMasterTablesDownloadStatus = async () => {
    try {
      const accessToken = await KeyChain.getAccessToken();
      await KeyChain.saveDatabaseKey(accessToken);
      Helper.MASTER_TABLES_DETAILS.forEach(async item => {
        if (item?.status === DBConstants.downloadStatus.DOWNLOADED) {
          return;
        }
        await Operations.createRecord(Schemas.masterTablesDownLoadStatus, {
          name: item.name,
          status: DBConstants.downloadStatus.PENDING,
          lastSync: new Date()
        });
      });
    } catch (error) {
      console.log('initMasterTablesDownloadStatus', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Background} style={styles.imageBg}>
        <Image style={styles.logo} source={LogoMankindWhite} />
        <Label
          title={Strings.superman}
          size={80}
          textColor={themes.colors.white}
          type="semiBold"
          style={styles.textStyle}
        />

        <Label
          title={Strings.downloadingContent}
          size={20}
          textColor={themes.colors.white}
          type="regular"
          style={styles.downloadingTextStyle}
        />

        {isWeb() ? (
          <ActivityIndicator
            animating={!indeterminate}
            color={themes.colors.darkBlue}
            size="large"
            style={styles.activityIndicator}
          />
        ) : (
          <CircularProgressBarWithStatus
            progress={progress}
            indeterminate={indeterminate}
          />
        )}
        {/* <View style={styles.downloadIconContainer}>
          <Icon name="cloud-download" size={32} color={themes.colors.white} />
          <Label
            title={Strings.downloadingMaster}
            size={16}
            textColor={themes.colors.white}
            type="regular"
            style={styles.downloadTextStyle}
          />
        </View> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MasterDataDownload;
