import React from 'react';

import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';

import theme from 'themes';
import {getStore} from 'store';

export const withTheme = component =>
  render(<PaperProvider theme={theme}>{component}</PaperProvider>);

const store = getStore();

export const renderer = (component, mockStore = store) =>
  render(
    <StoreProvider store={mockStore}>
      <PaperProvider theme={theme}>
        <NavigationContainer>{component}</NavigationContainer>
      </PaperProvider>
    </StoreProvider>,
  );

export * from '@testing-library/react-native';
