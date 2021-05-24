import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import PerformanceLanding from './landing';
import {ROUTE_PERFORMANCE_LANDING} from './routes';
import theme from 'themes';

export const PerformanceStack = createStackNavigator();

const Performance = () => {
  return (
    <PerformanceStack.Navigator>
      <PerformanceStack.Screen
        name={ROUTE_PERFORMANCE_LANDING}
        component={PerformanceLanding}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      />
    </PerformanceStack.Navigator>
  );
};

export default Performance;
