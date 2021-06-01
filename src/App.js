import 'react-native-gesture-handler';
import * as React from 'react';
import {LogBox, Alert} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';
import * as LocalAuthentication from 'expo-local-authentication';
import SplashScreen from 'react-native-splash-screen';
import theme from 'themes';
import ROUTES, {ROUTE_DASHBOARD, ROUTE_LOGIN} from './navigations/routes';
import {useEffect} from 'react';
import {getStore} from './store/getStore';
import {Provider} from 'react-redux';
import {isWeb} from 'helper';
import {Toast} from 'components/widgets';

const Stack = createStackNavigator();
const store = getStore();
const App = () => {
  LogBox.ignoreAllLogs();
  const isLoggedIn = false;
  const initialRoute = isLoggedIn ? ROUTE_DASHBOARD : ROUTE_LOGIN;
  //const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const fallBackToDefaultAuth = () => {
    console.log('fall back to password authentication');
  };

  const alertComponent = (title, mess, btnTxt, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };

  const handleBiometricAuth = async () => {
    // Check if hardware supports biometrics
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    // Fallback to default authentication method (password) if Fingerprint is not available
    if (!isBiometricAvailable)
      return alertComponent(
        'Please enter your password',
        'Biometric Authentication not supported',
        'OK',
        () => fallBackToDefaultAuth(),
      );

    // Check Biometrics types available (Fingerprint, Facial recognition, Iris recognition)
    let supportedBiometrics;
    if (isBiometricAvailable)
      supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

    // Check Biometrics are saved locally in user's device
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return alertComponent(
        'Biometric record not found',
        'Please login with your password',
        'OK',
        () => fallBackToDefaultAuth(),
      );

    // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      cancelLabel: 'Cancel',
      disableDeviceFallback: true,
    });
    // Log the user in on success
    if (biometricAuth) console.log('success');

    console.log({isBiometricAvailable});
    console.log({supportedBiometrics});
    console.log({savedBiometrics});
    console.log({biometricAuth});
  };
  const checkLocalAuth = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    handleBiometricAuth(compatible);
  }
  useEffect(() => {
    if (!isWeb()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          SplashScreen.hide();
        });
      }, 2000);
    }
    checkLocalAuth();
    // (async () => {
    //   const compatible = await LocalAuthentication.hasHardwareAsync();
    //   handleBiometricAuth(compatible);
    //   // setIsBiometricSupported(compatible);
    // })();
  }, []);

  return (
    // <LocalAuthComp />
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute}>
            {ROUTES.map(route => (
              <Stack.Screen
                key={route.name}
                name={route.name}
                component={route.component}
                options={{
                  headerShown: false,
                }}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </PaperProvider>
    </Provider>
  );
};

export default App;
