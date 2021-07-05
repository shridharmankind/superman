import React, {useState, useEffect} from 'react';
import {Platform, SafeAreaView, Image, ImageBackground} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import RouteHandler from '../RouteHandler';
import * as LocalAuthBelowVersion from 'react-native-local-auth';
import {Background, LogoMankindWhite} from 'assets';
import {Label} from 'components/elements';
import themes from 'themes';
import styles from './styles';

const LocalAuth = () => {
  const [allowLogin, setLogin] = useState(false);
  const [triedOnRender, updateTriedOnRender] = useState(true);

  // Added for API 29 and Below
  const authBelowVersion = async () => {
    const isSecure = await LocalAuthBelowVersion.isDeviceSecure();
    if (isSecure) {
      LocalAuthBelowVersion.authenticate({
        reason: 'Authenticate',
        fallbackToPasscode: true,
      })
        .then(success => {
          if (success) {
            setLogin(true);
          }
        })
        .catch(() => {});
    } else {
      setLogin(true); // Need prompt to add security
    }
  };

  // Added for API 30 and Above
  const authLaterVersion = isFallBackValue => {
    LocalAuthentication.authenticateAsync({
      cancelLabel: 'Cancel',
      disableDeviceFallback: isFallBackValue,
    })
      .then(response => {
        if (response.success) {
          setLogin(true);
        }
      })
      .catch(() => {});
  };

  const authenticateDevice = async () => {
    const {Version} = Platform;
    const isSupported = await LocalAuthentication.isEnrolledAsync();
    if (Version > 29) {
      authLaterVersion(false);
    } else if (isSupported) {
      authLaterVersion(true);
    } else {
      authBelowVersion();
    }
  };

  useEffect(() => {
    if (triedOnRender) {
      updateTriedOnRender(false);
      authenticateDevice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triedOnRender]);

  return (
    <SafeAreaView style={styles.container}>
      {!allowLogin ? (
        <ImageBackground source={Background} style={styles.imageBg}>
          <Image style={styles.logo} source={LogoMankindWhite} />
          <Label
            title={'Superman Locked'}
            size={30}
            textColor={themes.colors.white}
            type="semiBold"
            style={styles.textStyle}
          />
          <Label
            title={'Unlock'}
            size={30}
            textColor={themes.colors.white}
            type="semiBold"
            style={styles.buttonTextStyle}
            onPress={() => authenticateDevice()}
          />
        </ImageBackground>
      ) : (
        <RouteHandler />
      )}
    </SafeAreaView>
  );
};
export default LocalAuth;
