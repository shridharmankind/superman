import React from 'react';
import {renderer, fireEvent} from 'utils/testHelpers';

import Dashboard from 'screens/generic/Dashboard';
import {ROUTE_HOME} from '../routes';
import * as helpers from 'helper';

beforeEach(() => {
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
});

afterEach(() => {
  window.requestAnimationFrame.mockRestore();
});

const renderComponent = props => renderer(<Dashboard {...props} />);

test('should render when no props are passed', () => {
  const {container} = renderComponent();
  expect(container).toBeTruthy();
});

test('should trigger on nav item press', () => {
  const navigate = jest.fn();
  const navigation = {
    navigate,
  };

  const {getByTestId} = renderComponent({navigation});

  const homeNavItem = getByTestId('button_Home');
  fireEvent.press(homeNavItem);

  expect(navigate).toBeCalledTimes(1);
  expect(navigate).toBeCalledWith(ROUTE_HOME);
});

test('should trigger on nav item press for web', () => {
  const navigate = jest.fn();
  const navigation = {
    navigate,
  };

  jest.spyOn(helpers, 'isWeb').mockReturnValue(true);

  const {getByTestId} = renderComponent({navigation});

  const homeNavItem = getByTestId('button_Home');
  fireEvent.press(homeNavItem);

  expect(navigate).toBeCalledTimes(1);
  expect(navigate).toBeCalledWith(ROUTE_HOME);
});
