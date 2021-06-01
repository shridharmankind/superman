// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Button,
//   TouchableHighlight,
//   Alert,
//   StatusBar as RnStatusBar,
// } from 'react-native';
// import * as LocalAuthentication from 'expo-local-authentication';

// export default function App() {
//   const [isBiometricSupported, setIsBiometricSupported] = useState(false);

//   // Check if hardware supports biometrics
//   useEffect(() => {
//     (async () => {
//       const compatible = await LocalAuthentication.hasHardwareAsync();
//       const x = await LocalAuthentication.getEnrolledLevelAsync();
//       console.log(
//         'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
//         x,
//         Boolean(compatible),
//       );
//       setIsBiometricSupported(compatible);
//     })();
//   });

//   const fallBackToDefaultAuth = () => {
//     console.log('fall back to password authentication');
//   };

//   const alertComponent = (title, mess, btnTxt, btnFunc) => {
//     return Alert.alert(title, mess, [
//       {
//         text: btnTxt,
//         onPress: btnFunc,
//       },
//     ]);
//   };

//   const handleBiometricAuth = async () => {
//     // Check if hardware supports biometrics
//     const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

//     // Fallback to default authentication method (password) if Fingerprint is not available
//     if (!isBiometricAvailable)
//       return alertComponent(
//         'Please enter your password',
//         'Biometric Authentication not supported',
//         'OK',
//         () => fallBackToDefaultAuth(),
//       );

//     // Check Biometrics types available (Fingerprint, Facial recognition, Iris recognition)
//     let supportedBiometrics;
//     if (isBiometricAvailable)
//       supportedBiometrics =
//         await LocalAuthentication.supportedAuthenticationTypesAsync();

//     // Check Biometrics are saved locally in user's device
//     const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
//     if (!savedBiometrics)
//       return alertComponent(
//         'Biometric record not found',
//         'Please login with your password',
//         'OK',
//         () => fallBackToDefaultAuth(),
//       );

//     // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)

//     const biometricAuth = await LocalAuthentication.authenticateAsync({
//       promptMessage: 'Login with Biometrics',
//       cancelLabel: 'Cancel',
//       disableDeviceFallback: true,
//     });
//     // Log the user in on success
//     if (biometricAuth) console.log('success');

//     console.log({isBiometricAvailable});
//     console.log({supportedBiometrics});
//     console.log({savedBiometrics});
//     console.log({biometricAuth});
//   };
//   return (
//     <SafeAreaView>
//       {console.log(
//         'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
//         isBiometricSupported,
//       )}
//       <Text>
//         {isBiometricSupported
//           ? 'Your device is compatible with Biometrics'
//           : 'We need to use fallback method'}
//       </Text>
//       <View style={styles.container}>
//         <TouchableHighlight
//           style={{
//             height: 60,
//           }}>
//           <Button
//             title="Login with Biometrics"
//             color="#fe7005"
//             onPress={handleBiometricAuth}
//           />
//         </TouchableHighlight>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 100,
//     flex: 1,
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
// });
