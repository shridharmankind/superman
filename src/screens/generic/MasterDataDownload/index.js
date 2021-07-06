import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {Strings} from 'common';
import {NetworkService} from 'services';
import {Label} from 'components/elements';
import themes from 'themes';
import {
  Helper,
  Constants as DBConstants,
  Operations,
  MonthlyPlan,
  PartyCategories,
  Schemas,
  Skus,
  Organizations,
  Divisions,
  MotherBrands,
  Weeklyoff,
  Qualifications,
  Specialities,
} from 'database';
import {KeyChain, CircularProgressBarWithStatus, isWeb} from 'helper';
import {Background, LogoMankindWhite} from 'assets';
import {Constants} from 'common';
import {ROUTE_DASHBOARD} from '../../../navigations/routes';
import {useDispatch} from 'react-redux';
import {authTokenActions} from '../RouteHandler/redux';

const MasterDataDownload = () => {
  const dispatch = useDispatch();
  const progressBarSyncParam = 60 / 10; // (it will be in multiple of 10 and near to actual total tables to download)/10
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
      const onDownloadError = error => {
        console.log('DB error downloading master data', error);
      };

      const onDownloadComplete = () => {
        dispatch(authTokenActions.updateScreen({screen: ROUTE_DASHBOARD}));
      };

      try {
        await initMasterTablesDownloadStatus();

        const updateRecordDownloaded = async recordName => {
          await Operations.updateRecord(
            Schemas.masterTablesDownLoadStatus,
            DBConstants.downloadStatus.DOWNLOADED,
            recordName,
          );
        };

        const fetchQualifications = async qualificationInfo => {
          const {name, apiPath} = qualificationInfo;
          let failedToSaveQualifications = false;

          const response = await NetworkService.get(apiPath);

          if (response && response.status === Constants.HTTP_OK) {
            const {data} = response;
            const recordsUpdated = await Qualifications.storeQualifications(
              data,
            );

            if (!recordsUpdated) {
              failedToSaveQualifications = true;
            }
          } else {
            failedToSaveQualifications = true;
          }
          !failedToSaveQualifications && updateRecordDownloaded(name);
        };

        const fetchSpecialities = async specialityInfo => {
          const {name, apiPath} = specialityInfo;
          let failedToSaveSpecialities = false;

          const response = await NetworkService.get(apiPath);

          if (response && response.status === Constants.HTTP_OK) {
            const {data} = response;
            const recordsUpdated = await Specialities.storeSpecialities(data);

            if (!recordsUpdated) {
              failedToSaveSpecialities = true;
            }
          } else {
            failedToSaveSpecialities = true;
          }

          !failedToSaveSpecialities && updateRecordDownloaded(name);
        };

        for (let i = 0; i < Helper.MASTER_TABLES_DETAILS.length; i++) {
          let item = Helper.MASTER_TABLES_DETAILS[i];
          const record = await Operations.getRecord(
            Schemas.masterTablesDownLoadStatus,
            item.name,
          );
          if (record?.status === DBConstants.downloadStatus.DOWNLOADED) {
            return;
          }
          let response;
          switch (item.name) {
            case DBConstants.MASTER_TABLE_USER_INFO:
              response = await NetworkService.get(item.apiPath);
              break;
            case DBConstants.MASTER_TABLE_WEEKLYOFF:
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
            case DBConstants.MASTER_TABLE_SKU:
              response = await NetworkService.get(item.apiPath);
              console.log(item.name, '- -', response);
              break;
            case DBConstants.MASTER_TABLE_PARTY_CATEGORIES:
              response = await NetworkService.get(item.apiPath);
              break;
            case DBConstants.MASTER_TABLE_ORGANIZATION:
              response = await NetworkService.get(item.apiPath);
              break;
            case DBConstants.MASTER_TABLE_DIVISION:
              response = await NetworkService.get(item.apiPath);
              break;
            case DBConstants.MASTER_TABLE_MOTHER_BRAND:
              response = await NetworkService.get(item.apiPath);
              break;
            case DBConstants.QUALIFICATIONS:
              fetchQualifications(item);
              break;
            case DBConstants.SPECIALITIES:
              fetchSpecialities(item);
              break;
            case DBConstants.MASTER_MONTHLY_TABLE_PLAN:
              {
                const staffPositionId = await Helper.getStaffPositionId();
                response = await NetworkService.get(
                  `${item.apiPath}${staffPositionId}`,
                );
              }
              break;
          }
          console.log(item.name, '- -', response?.status);
          if (response && response.status === Constants.HTTP_OK) {
            const data = JSON.stringify(response.data);
            switch (item.name) {
              case DBConstants.MASTER_TABLE_USER_INFO:
                await Operations.createUserInfoRecord(
                  item.schema,
                  JSON.parse(data),
                );
                updateRecordDownloaded(item.name);
                break;

              case DBConstants.MASTER_TABLE_PARTY:
                await Operations.createPartyMasterRecord(
                  item.schema,
                  JSON.parse(data),
                );
                updateRecordDownloaded(item.name);
                break;
              case DBConstants.MASTER_MONTHLY_TABLE_PLAN:
                await MonthlyPlan.createMonthlyMasterRecord(
                  item.schema,
                  JSON.parse(data),
                );
                updateRecordDownloaded(item.name);
                break;
              case DBConstants.MASTER_TABLE_DIVISION:
                const divisionsUpdated = await Divisions.storeDivisions(
                  JSON.parse(data),
                );
                divisionsUpdated && updateRecordDownloaded(item.name);
                break;
              case DBConstants.MASTER_TABLE_MOTHER_BRAND:
                const updatedMotherBrands =
                  await MotherBrands.storeMotherBrands(JSON.parse(data));
                updatedMotherBrands && updateRecordDownloaded(item.name);
                break;
              case DBConstants.MASTER_TABLE_ORGANIZATION:
                const organizationsUpdated =
                  await Organizations.storeOrganizations(JSON.parse(data));
                organizationsUpdated && updateRecordDownloaded(item.name);
                break;

              case DBConstants.MASTER_TABLE_SKU:
                const skusUpdated = await Skus.storeSkus(JSON.parse(data));
                console.log('skuSUpdate', skusUpdated);
                skusUpdated && updateRecordDownloaded(item.name);
                console.log('working');
                break;

              case DBConstants.MASTER_TABLE_PARTY_CATEGORIES:
                const partyCategoriesUpdated =
                  await PartyCategories.storePartyCategories(JSON.parse(data));
                partyCategoriesUpdated && updateRecordDownloaded(item.name);
                break;
              case DBConstants.MASTER_TABLE_WEEKLYOFF:
                const weeklyresponse = await Weeklyoff.storeWeeklyoffs(
                  JSON.parse(data),
                );
                weeklyresponse && updateRecordDownloaded(item.name);
                break;
            }

            if (i % progressBarSyncParam === 0) {
              setProgress(prevProgress => prevProgress + 0.1);
            }
          } else {
            onDownloadError(item.name);
          }
        }
        await Operations.createRecord(Schemas.masterTablesDownLoadStatus, {
          name: DBConstants.APPLICATION_SYNC_STATUS,
          status: DBConstants.downloadStatus.DOWNLOADED,
          lastSync: new Date(),
        });
        onDownloadComplete();
      } catch (error) {
        onDownloadError(error);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [progressBarSyncParam, dispatch]);

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
          lastSync: new Date(),
        });
      });
    } catch (error) {
      console.log('DB initMasterTablesDownloadStatus', error);
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
