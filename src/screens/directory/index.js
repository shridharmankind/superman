import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import theme from 'themes';

const DirectoryStack = createStackNavigator();

const Directory = () => {
  const {ROUTES_DIRECTORY} = require('./routes');

  return (
    <DirectoryStack.Navigator>
      {ROUTES_DIRECTORY.map(route => (
        <DirectoryStack.Screen
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
    </DirectoryStack.Navigator>
  );
};

export default Directory;
