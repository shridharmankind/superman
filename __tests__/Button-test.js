import 'react-native';
import React from 'react';
import Button from '../src/components/elements/Button';
import {withTheme} from 'utils/testHelpers';
import {fireEvent} from '@testing-library/react-native';

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
