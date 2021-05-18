import React from 'react';

import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

import {render} from '@testing-library/react-native';

import theme from 'themes';
import store from 'store';

export const withTheme = component =>
  render(<PaperProvider theme={theme}>{component}</PaperProvider>);

export const renderer = (component, mockStore = store) =>
  render(
    <StoreProvider store={mockStore}>
      <PaperProvider theme={theme}>{component}</PaperProvider>
    </StoreProvider>,
  );

export * from '@testing-library/react-native';
