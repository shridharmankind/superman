import React from 'react';
import {getActionFromState, getStateFromPath} from '@react-navigation/native';

import linking from './linking';
import {isWeb} from 'helper';

export const navigationRef = React.createRef();
export const isReadyRef = React.createRef();

const linkTo = (path, navigation) => {
  var state = getStateFromPath(path, linking.config);
  var action = getActionFromState(state);

  action !== undefined &&
    (navigation || navigationRef.current).dispatch(action);
};

export const navigate = (route, params, navigation) => {
  if (navigation || (isReadyRef.current && navigationRef.current)) {
    if (isWeb()) {
      const path = linking.config.screens[route];
      linkTo(path, navigation);
    } else {
      (navigation || navigationRef.current).navigate(route, params);
    }
  }
};
