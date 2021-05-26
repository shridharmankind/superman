import React from 'react';
import {Provider} from 'react-redux';
import {render} from '@testing-library/react-native';
import {getStore} from './../getStore';
import {Settings} from 'screens/generic';

it('Check Store', () => {
  const result = renderWithRedux(<Settings />);
  expect(result[1]).toEqual(getStore());
});

export function renderWithRedux(component) {
  const store = getStore();
  const queries = render(<Provider store={store}>{component}</Provider>);

  return {
    ...queries,
    store,
  };
}
