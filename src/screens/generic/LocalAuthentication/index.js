import {useEffect} from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

const LocalAuth = () => {
  useEffect(() => {
    LocalAuthentication.hasHardwareAsync().then(response => {
      LocalAuthentication.supportedAuthenticationTypesAsync().then(
        response2 => {
          console.log('available', response2);
        },
      );
      LocalAuthentication.getEnrolledLevelAsync().then(response2 => {
        console.log('enrolled - ', response2);

        LocalAuthentication.authenticateAsync().then(response3 => {
          console.log(response3);
          this.props.navigation.navigate('Login');
        });
      });
    });
  }, []);
  return null;
};

export default LocalAuth;
