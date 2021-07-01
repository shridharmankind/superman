import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import theme from 'themes';

const SettingStack = createStackNavigator();

const Setting = () => {
  const {ROUTES_SETTING} = require('./routes');

  return (
    <SettingStack.Navigator>
      {ROUTES_SETTING.map(routes => (
        <SettingStack.Screen
          key={routes?.name}
          name={routes?.name}
          component={routes?.component}
          options={{
            headerShown: false,
            cardStyle: {
              backgroundColor: theme.colors.background,
            },
          }}
        />
      ))}
    </SettingStack.Navigator>
  );
};

export default Setting;
