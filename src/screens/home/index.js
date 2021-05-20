import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import HomeLanding from './landing';
import {ROUTE_HOME_LANDING} from './routes';
import theme from 'themes';

const HomeStack = createStackNavigator();

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
    </HomeStack.Navigator>
  );
};

export default Home;
