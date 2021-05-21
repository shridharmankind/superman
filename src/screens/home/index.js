import React from 'react';
import {TouchableOpacity} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import {ContentWithSidePanel} from 'components/layouts';
import {Label} from 'components/elements';
import theme from 'themes';

import HomeLanding from './landing';
import {ROUTE_HOME_LANDING} from './routes';

const HomeStack = createStackNavigator();

const HomeLandingSecondaryPage = ({navigation}) => {
  return (
    <ContentWithSidePanel>
      <Label title="HomeLandingPageSecondary" />
      <TouchableOpacity onPress={() => navigation.navigate('HomeDetails')}>
        <Label title="route to secondary details" />
      </TouchableOpacity>
    </ContentWithSidePanel>
  );
};

const HomeDetailsPage = ({navigation}) => {
  return (
    <ContentWithSidePanel>
      <Label title="HomePageDetails" />
      <TouchableOpacity onPress={() => navigation.navigate('HomeLanding')}>
        <Label title="route back to secondary landing" />
      </TouchableOpacity>
    </ContentWithSidePanel>
  );
};

const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={ROUTE_HOME_LANDING}
        component={HomeLanding}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      />
      <HomeStack.Screen
        name={'HomeLandingSecondary'}
        component={HomeLandingSecondaryPage}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      />
      <HomeStack.Screen
        name={'HomeDetails'}
        component={HomeDetailsPage}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

export default Home;
