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
import {Helper, Operations, Schemas} from 'database';
import {KeyChain, CircularProgressBarWithStatus, isWeb} from 'helper';
import {Background, LogoMankindWhite} from 'assets';

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
          navigation.navigate('Dashboard');
          clearInterval(interval);
        }
        setProgress(progressStatus);
      }, 1500);
    }, 3000);
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      animate();
      /* await initMasterTablesDownloadStatus();
      const result = await NetworkService.get('Party/partyBySpId/1');
      if (result.status === Constants.HTTP_OK) {
        console.log('success', result.data);
        navigation.navigate('Dashboard');
      } else {
        console.log('error', result.statusText);
      } */
    };
    fetchData();
  }, [animate]);

  const initMasterTablesDownloadStatus = async () => {
    const accessToken = await KeyChain.getAccessToken();
    await KeyChain.saveDatabaseKey(accessToken);
    await Operations.openSchema(Schemas.masterTablesDownLoadStatus);
    for (let item in Helper.MASTER_TABLES_DETAILS) {
      Operations.createRecord(Schemas.masterTablesDownLoadStatus, {
        name: item,
        status: 'pending',
      });
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
