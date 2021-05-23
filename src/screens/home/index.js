import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import {ContentWithSidePanel} from 'components/layouts';
import {Label} from 'components/elements';
import theme from 'themes';

const HomeStack = createStackNavigator();

export const HomeLandingSecondaryScreen = ({navigation}) => {
  return (
    <ContentWithSidePanel>
      <Label title="HomeLandingPageSecondary" />
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Label title="Go back" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('HomeDetails')}>
        <Label title="route to secondary details" />
      </TouchableOpacity>
    </ContentWithSidePanel>
  );
};

export const HomeDetailsScreen = ({navigation}) => {
  return (
    <View>
      <Label title="HomePageDetails" />
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Label title="Go back" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('HomeLanding')}>
        <Label title="route to home landing" />
      </TouchableOpacity>
    </View>
  );
};

const Home = () => {
  const {ROUTES_HOME} = require('./routes');

  return (
    <HomeStack.Navigator>
      {ROUTES_HOME.map(route => (
        <HomeStack.Screen
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
    </HomeStack.Navigator>
  );
};

export default Home;
