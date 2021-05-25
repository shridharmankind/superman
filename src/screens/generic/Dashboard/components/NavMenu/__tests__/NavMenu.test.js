import React from 'react';
import {withTheme, fireEvent} from 'utils/testHelpers';
import NavMenu from 'screens/generic/Dashboard/components/NavMenu';

const renderComponent = props => withTheme(<NavMenu {...props} />);

test('should render when no props are passed', () => {
  const {container} = renderComponent();
  expect(container).toBeTruthy();
});

test('should trigger on nav item press', () => {
  const onNavItemPress = jest.fn();

  const {getByTestId} = renderComponent({onNavItemPress});

  const homeNavItem = getByTestId('button_Home');
  fireEvent.press(homeNavItem);

  expect(onNavItemPress).toBeCalledTimes(1);
});
