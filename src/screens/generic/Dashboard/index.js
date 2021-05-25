import React from 'react';
import {ScrollView, View, Modal, Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {BlurView} from '@react-native-community/blur';

import NavMenu from './components/NavMenu';
import {NotificationIcon, SearchIcon} from 'assets';

import {ROUTE_HOME} from 'navigations/routes';
import ROUTES_DASHBOARD from './routes';

import theme from 'themes';
import {isWeb} from 'helper';
import styles from './styles';
import {Button} from 'components/elements';

export const DashboardStack = createStackNavigator();

const Dashboard = ({navigation}) => {
  const scrollRef = React.useRef();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 2000);
  }, []);

  const onActivePageChanged = route => {
    route && navigation && navigation.navigate(route);
    requestAnimationFrame(() => {
      if (isWeb()) {
        window.scrollTo({top: 0, behavior: 'smooth'});
      } else {
        scrollRef && scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
      }
    });
  };

  const renderSideMenu = () => (
    <View style={styles.sidemenuContainer}>
      <NavMenu onNavItemPress={onActivePageChanged} />
    </View>
  );

  const renderScreenActions = () => (
    <View style={styles.actionsContainer}>
      <View style={styles.action}>
        <SearchIcon height={32} width={32} />
      </View>
      <View style={[styles.action, styles.actionPadding]}>
        <NotificationIcon height={32} width={32} />
      </View>
    </View>
  );

  const renderNavigator = () => (
    <DashboardStack.Navigator initialRouteName={ROUTE_HOME}>
      {ROUTES_DASHBOARD.map(route => (
        <DashboardStack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            headerShown: false,
            cardStyle: {
              backgroundColor: theme.colors.background,
            },
          }}
        />
      ))}
    </DashboardStack.Navigator>
  );

  // https://github.com/Kureev/react-native-blur
  // for web https://stackoverflow.com/questions/47207510/react-native-blur-in-modal
  return (
    <ScrollView
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {renderSideMenu()}
        {renderNavigator()}
        {renderScreenActions()}
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setOpen(false)}
          visible={open}>
          <BlurView
            blurType="light"
            blurAmount={1}
            reducedTransparencyFallbackColor="rgba(100,100,100, 0.5)"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              justifyContent: 'center',
              padding: 20,
            }}>
            <View
              style={{
                width: '60%',
                alignSelf: 'center',
                alignItems: 'center',
                padding: 100,
                borderRadius: 10,
              }}>
              <Text>Modal with a sliding animation</Text>
              <Button
                contentStyle={{width: '25%', padding: 10, marginTop: 50}}
                onPress={() => setOpen(false)}
                title={'Close Modal'}
              />
            </View>
          </BlurView>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
