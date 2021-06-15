import {useEffect, useState, useRef} from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-community/async-storage';
import {AppState} from 'react-native';

const LocalAuth = ({navigation}) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [firstLaunch, setfirstLaunch] = useState(null);
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      console.log('value', value);
      if (value == null) {
        LocalAuthentication.hasHardwareAsync()
          .then(response => {
            LocalAuthentication.supportedAuthenticationTypesAsync().then(
              response2 => {
                console.log('available', response2);
              },
            );
            LocalAuthentication.getEnrolledLevelAsync().then(response2 => {
              console.log('enrolled - ', response2);

              LocalAuthentication.authenticateAsync().then(response3 => {
                console.log(response3);
                navigation.navigate('Login');
              });
            });
          })
          .catch(error => console.log(error.message));
        AsyncStorage.setItem('alreadyLaunched', JSON.stringify(true)).then(
          x => {
            setfirstLaunch(true);
          },
        ); // No need to wait for `setItem` to finish, although you might want to handle errors
      } else {
        console.log('first launch nnnnnnnnnnnnnnnnnnnnn', firstLaunch);
        setfirstLaunch(false);
      }
    });
    // LocalAuthentication.hasHardwareAsync()
    //   .then(response => {
    //     LocalAuthentication.supportedAuthenticationTypesAsync().then(
    //       response2 => {
    //         console.log('available', response2);
    //       },
    //     );
    //     LocalAuthentication.getEnrolledLevelAsync().then(response2 => {
    //       console.log('enrolled - ', response2);

    //       LocalAuthentication.authenticateAsync().then(response3 => {
    //         console.log(response3);
    //         navigation.navigate('Login');
    //       });
    //     });
    //   })
    //   .catch(error => console.log(error.message));
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [navigation, appStateVisible, firstLaunch]);
  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };
  // console.log(
  //   'appStateVisible appStateVisible appStateVisible appStateVisible',
  //   appStateVisible,
  // );
  return null;
};

export default LocalAuth;
