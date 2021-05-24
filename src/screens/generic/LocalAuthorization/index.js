import React from 'react';
import { View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

// ...
class LocalAuthorization extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    
    LocalAuthentication.hasHardwareAsync()
    .then(response => {
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