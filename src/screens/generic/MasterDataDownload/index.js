import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
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
  Activities,
  ActivityType,
  geoLocations,
  Leaves,
  LeaveTypes,
} from 'database';
import {KeyChain, CircularProgressBarWithStatus, isWeb} from 'helper';
import {Background, LogoMankindWhite} from 'assets';
import {Constants} from 'common';
import {ROUTE_DASHBOARD} from '../../../navigations/routes';
import {useDispatch} from 'react-redux';
import {authTokenActions} from '../RouteHandler/redux';
import {showToastie} from 'utils/backgroundTask';

const MasterDataDownload = () => {
  const dispatch = useDispatch();
  const progressBarSyncParam = 60 / 10; // (it will be in multiple of 10 and near to actual total tables to download)/10
  const [progress, setProgress] = useState(0);
  const [indeterminate, setIndeterminate] = useState(true);
  const [isConnected, setConnected] = useState(true);

  useEffect(() => {
    let subscribeNetworkCheck = null;
    if (!isWeb()) {
      subscribeNetworkCheck = NetInfo.addEventListener(
        handleConnectivityChange,
      );
    }
    return async () => {
      if (!isWeb()) {
        if (subscribeNetworkCheck) {
          subscribeNetworkCheck();
          subscribeNetworkCheck = null;
        }
      }
    };
  }, []);

  const handleConnectivityChange = connection => {
    setConnected(connection.isConnected);
  };

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

        const fetchQualifications = async (qualificationInfo, response) => {
          const {name} = qualificationInfo;
          let failedToSaveQualifications = false;

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

        const fetchSpecialities = async (specialityInfo, response) => {
          const {name} = specialityInfo;
          let failedToSaveSpecialities = false;

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

        for (let i = 0; i < Helper.MASTER_TABLES_DETAILS.length; ) {
          if (isConnected) {
            let item = Helper.MASTER_TABLES_DETAILS[i];
            const record = await Operations.getRecord(
              Schemas.masterTablesDownLoadStatus,
              item.name,
            );
            if (record?.status === DBConstants.downloadStatus.DOWNLOADED) {
              if (i % progressBarSyncParam === 0) {
                setProgress(prevProgress => prevProgress + 0.1);
              }
              i = i + 1;
              return;
            }
            let response;
            switch (item.name) {
              case DBConstants.MASTER_TABLE_USER_INFO:
              case DBConstants.MASTER_TABLE_SKU:
              case DBConstants.MASTER_TABLE_PARTY_CATEGORIES:
              case DBConstants.MASTER_TABLE_ORGANIZATION:
              case DBConstants.MASTER_TABLE_DIVISION:
              case DBConstants.MASTER_TABLE_MOTHER_BRAND:
              case DBConstants.MASTER_TABLE_WEEKLYOFF:
              case DBConstants.LEAVE_TYPES:
              case DBConstants.MASTER_TABLE_GEO_LOCATIONS:
              case DBConstants.MASTER_TABLE_ACTIVITIES:
              case DBConstants.ACTIVITY_TYPE:
              case DBConstants.QUALIFICATIONS:
              case DBConstants.SPECIALITIES:
                response = await NetworkService.get(item.apiPath);
                break;
              case DBConstants.MASTER_TABLE_PARTY:
              case DBConstants.MASTER_MONTHLY_TABLE_PLAN:
                {
                  const staffPositionId = await Helper.getStaffPositionId();
                  response = await NetworkService.get(
                    `${item.apiPath}${staffPositionId}`,
                  );
                }
                break;
              case DBConstants.LEAVES:
                {
                  const userId = await Helper.getUserId();
                  response = await NetworkService.get(
                    `${item.apiPath}/${userId}`,
                  );
                }
                break;
            }
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
                case DBConstants.QUALIFICATIONS:
                  await fetchQualifications(item, response);
                  break;
                case DBConstants.SPECIALITIES:
                  await fetchSpecialities(item, response);
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
                  skusUpdated && updateRecordDownloaded(item.name);
                  break;

                case DBConstants.MASTER_TABLE_ACTIVITIES:
                  const activitiesUpdated = await Activities.storeActivities(
                    JSON.parse(data),
                  );
                  activitiesUpdated && updateRecordDownloaded(item.name);
                  break;

                case DBConstants.ACTIVITY_TYPE:
                  const activityTypeUpdated =
                    await ActivityType.storeActivityType(JSON.parse(data));
                  activityTypeUpdated && updateRecordDownloaded(item.name);
                  break;

                case DBConstants.MASTER_TABLE_PARTY_CATEGORIES:
                  const partyCategoriesUpdated =
                    await PartyCategories.storePartyCategories(
                      JSON.parse(data),
                    );
                  partyCategoriesUpdated && updateRecordDownloaded(item.name);
                  break;
                case DBConstants.MASTER_TABLE_GEO_LOCATIONS:
                  const geoLocationUpdated =
                    await geoLocations.storeGeoLocations(JSON.parse(data));
                  geoLocationUpdated && updateRecordDownloaded(item.name);
                  break;
                case DBConstants.MASTER_TABLE_WEEKLYOFF:
                  const weeklyresponse = await Weeklyoff.storeWeeklyoffs(
                    JSON.parse(data),
                  );
                  weeklyresponse && updateRecordDownloaded(item.name);
                  break;
                case DBConstants.LEAVES:
                  const leavesUpdated = await Leaves.storeLeaves(
                    response?.data,
                  );
                  leavesUpdated && updateRecordDownloaded(item.name);
                  break;
                case DBConstants.LEAVE_TYPES:
                  const leaveTypessUpdated = await LeaveTypes.storeLeaveTypes(
                    response?.data,
                  );
                  leaveTypessUpdated && updateRecordDownloaded(item.name);
                  break;
              }
              if (i % progressBarSyncParam === 0) {
                setProgress(prevProgress => prevProgress + 0.1);
              }
              i = i + 1;
            } else {
              onDownloadError(item.name);
            }
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
    if (isConnected) {
      fetchData();
    } else {
      showToastie(Constants.TOAST_TYPES.ALERT, Strings.checkInternet);
    }
    return () => {
      isMounted = false;
    };
  }, [progressBarSyncParam, dispatch, isConnected]);

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

        {!isConnected ? (
          <Label
            title={Strings.checkInternet}
            size={30}
            textColor={themes.colors.white}
            type="regular"
            style={styles.noInternetTextStyle}
          />
        ) : null}

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
