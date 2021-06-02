import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {Constants, Strings} from 'common';
import {NetworkService} from 'services';
import {Label} from 'components/elements';
import themes from 'themes';
import {Helper, Constants as DBConstants, Operations, Schemas} from 'database';
import {KeyChain, CircularProgressBarWithStatus, isWeb} from 'helper';
import {Background, LogoMankindWhite} from 'assets';

const downloadStatus = Object.freeze({
  DOWNLOADED: 'DOWNLOADED',
  PENDING: 'PENDING',
});

const MasterDataDownload = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const [indeterminate, setIndeterminate] = useState(true);

  const animate = useCallback(() => {
    let progressStatus = 0;

    setProgress(progressStatus);
    setTimeout(() => {
      setIndeterminate(false);
      const interval = setInterval(() => {
        progressStatus += Math.random() / 5;

        if (progressStatus > 1) {
          progressStatus = 1;
          //navigation.navigate('Dashboard');
          clearInterval(interval);
        }
        setProgress(progressStatus);
      }, 1500);
    }, 3000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      animate();
      try {
        await initMasterTablesDownloadStatus();

        Helper.MASTER_TABLES_DETAILS.forEach(async item => {
          const record = await Operations.getRecord(
            Schemas.masterTablesDownLoadStatus,
            item.name,
          );
          if (record?.status === downloadStatus.DOWNLOADED) {
            return;
          }
          const response = await NetworkService.get(item.apiPath);

          if (response.status === Constants.HTTP_OK) {
            const data = await JSON.stringify(response.data);
            if (item.name === DBConstants.MASTER_TABLE_USER_INFO) {
              await Operations.createUserInfoRecord(
                item.schema,
                JSON.parse(data),
              );
            } else if (item.name === DBConstants.MASTER_TABLE_PARTY) {
              await Operations.createPartyMasterRecord(
                item.schema,
                JSON.parse(data),
              );
            }
            await Operations.updateRecord(
              Schemas.masterTablesDownLoadStatus,
              downloadStatus.DOWNLOADED,
              item.name,
            );
          } else {
            console.log('error', response);
          }
        });
        navigation.navigate('Dashboard');
      } catch (error) {
        console.log('useEffect', error);
      }
    };
    fetchData();
  }, [animate, navigation]);

  const initMasterTablesDownloadStatus = async () => {
    try {
      const accessToken = await KeyChain.getAccessToken();
      await KeyChain.saveDatabaseKey(accessToken);
      Helper.MASTER_TABLES_DETAILS.forEach(async item => {
        await Operations.createRecord(Schemas.masterTablesDownLoadStatus, {
          name: item.name,
          status: downloadStatus.PENDING,
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
        <View style={styles.downloadIconContainer}>
          <Icon name="cloud-download" size={32} color={themes.colors.white} />
          <Label
            title={Strings.downloadingMaster}
            size={16}
            textColor={themes.colors.white}
            type="regular"
            style={styles.downloadTextStyle}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MasterDataDownload;
