import React from 'react';
import { View } from 'react-native';
// import LocalAuthentication from 'rn-local-authentication';
// import PasscodeAuth from 'react-native-passcode-auth';
import DeviceInfo from 'react-native-device-info';
import { Constants } from 'react-native-unimodules';
import * as LocalAuthentication from 'expo-local-authentication';

// ...
class LocalAuthorization extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    console.log('1',Constants.systemFonts);
    LocalAuthentication.hasHardwareAsync()
    .then(response => {
      console.log(response)
      LocalAuthentication.supportedAuthenticationTypesAsync()
      .then(response2 => {
        console.log("available",response2)
      })
      LocalAuthentication.getEnrolledLevelAsync()
      .then(response2 => {
        console.log("enrolled - ",response2);

        LocalAuthentication.authenticateAsync()
        .then(response3 => {
          console.log(response3);
          this.props.navigation.navigate('Login');
        })
      })
      
    })
    // LocalAuthentication.authenticateAsync({
    //     reason: "Very important reason to authenticate",
    //     fallbackEnabled: true,
    //     fallbackTitle: "Enter password",
    //     cancelTitle: "Cancel",
    //     reuseDuration: "300"
    // }).then(response => {
    //   if (response.success) {
    //     console.log('Authorized successfully!');
    //     this.props.navigation.navigate('Login');
    //   } else {
    //     console.log(DeviceInfo.isPinOrFingerprintSetSync());
    //     console.log(DeviceInfo.isPinOrFingerprintSet());
    //     console.log(DeviceInfo.getFingerprint());
    //     console.log(DeviceInfo.getFingerprintSync());
    //     console.log(DeviceInfo.getPhoneNumber());
    //     console.log(`Something went wrong. Error: ${response.error}`);
    //     //fetchPassword();
    //   }
    // })

    fetchPassword = () => {
      PasscodeAuth.authenticate('to demo this react-native component')
      .then(success => {
        // Success code
        console.log('Authorized successfully!');
        this.props.navigation.navigate('Login');
      })
      .catch(error => {
        // Failure code
        console.log(`Something went wrong. Error: ${error}`);
      });
    }
  }

  render() {
    return (<View />);
  }

  // ...
}

export default LocalAuthorization;