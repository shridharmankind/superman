import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import theme from 'themes';
import {Strings} from 'common';

const DirectoryStack = createStackNavigator();

const Directory = ({route}) => {
  const {
    ROUTES_DIRECTORY,
    ROUTE_DIRECTORY_LANDING,
    ROUTE_DIRECTORY_PROFILE,
  } = require('./routes');
  const initialParams = route?.params?.doctorObject || '';
  const initialRoute =
    route?.params?.navigate === Strings.detail
      ? ROUTE_DIRECTORY_PROFILE
      : ROUTE_DIRECTORY_LANDING;

  return (
    <DirectoryStack.Navigator initialRouteName={initialRoute}>
      {ROUTES_DIRECTORY.map(routes => (
        <DirectoryStack.Screen
          initialParams={{data: initialParams}}
          key={routes.name}
          name={routes.name}
          component={routes.component}
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
