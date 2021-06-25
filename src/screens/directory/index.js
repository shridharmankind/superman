import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import theme from 'themes';

const DirectoryStack = createStackNavigator();

const Directory = () => {
  const {ROUTES_DIRECTORY} = require('./routes');

  return (
    <DirectoryStack.Navigator>
      {ROUTES_DIRECTORY.map(routes => (
        <DirectoryStack.Screen
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
    </DirectoryStack.Navigator>
  );
};

export default Directory;

export {default as DoctorFeedback} from './doctorDetails/doctorFeedback';
export {default as OpenTask} from './doctorDetails/openTask';
export {default as PriorityProduct} from './priorityProduct';
export {default as DirectoryLanding} from './landing';
