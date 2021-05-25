import React from 'react';
import {ScrollView, View, Modal, Text, Button} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import NavMenu from './components/NavMenu';
import {NotificationIcon, SearchIcon} from 'assets';

import {ROUTE_HOME} from 'navigations/routes';
import ROUTES_DASHBOARD from './routes';

import theme from 'themes';
import {isWeb} from 'helper';
import styles from './styles';
import {Label} from 'components/elements';

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
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              backgroundColor: 'rgba(100,100,100, 0.5)',
              padding: 20,
            }}>
            <View
              style={{
                width: '70%',
                alignSelf: 'center',
                padding: 100,
                backgroundColor: 'white',
                borderRadius: 10,
              }}>
              <Text>Modal with "animationType" of</Text>
              <Button onPress={() => setOpen(false)} title={'Close Modal'} />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
