import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-native-testing-library';
import { getStore } from './../../src/store';
 
export function renderWithRedux(component) {
  const store = getStore();
  const queries = render(<Provider store={store}>{component}</Provider>);
 
  return {
    ...queries,
    store,
  };
};