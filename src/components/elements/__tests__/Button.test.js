import 'react-native';
import React from 'react';
import {Button} from 'components/elements';
import {withTheme, fireEvent} from 'utils/testHelpers';

function renderComponent(props) {
  return withTheme(<Button {...props} />);
}

it('renders outlined button', () => {
  const {getByText} = renderComponent({
    mode: 'outlined',
    title: 'Test',
  });

  expect(getByText('Test')).toBeTruthy();
});

it('renders contained button', () => {
  const {getByText} = renderComponent({
    mode: 'contained',
    title: 'Test',
  });

  expect(getByText('Test')).toBeTruthy();
});

it('onPress is called', () => {
  const onPressMock = jest.fn();
  const {getByText} = renderComponent({
    mode: 'outlined',
    title: 'Test',
    onPress: onPressMock,
  });
  fireEvent.press(getByText('Test'));
  expect(onPressMock).toHaveBeenCalled();
});
