import React from 'react';
import { View } from 'react-native';
import LocalAuthentication from 'rn-local-authentication';

// ...
class LocalAuthorization extends React.Component {
  constructor(props){
    super();
  }

  componentDidMount() {
    LocalAuthentication.authenticateAsync({
      reason: "Authorize please!"
    }).then(response => {
      if (response.success) {
        console.log('Authorized successfully!');
        this.props.navigation.navigate('Login');
      } else {
        console.log(`Something went wrong. Error: ${response.error}`);
      }
    })
  }

  render() {
    return (<View />);
  }

  // ...
}

export default LocalAuthorization;