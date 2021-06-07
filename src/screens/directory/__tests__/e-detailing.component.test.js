import React from 'react';
import EDetailing from '../e-detailing/e-detailing.component';
import {withTheme, fireEvent} from 'utils/testHelpers';

const renderComponent = props => withTheme(<EDetailing {...props} />);

test('should render component', () => {
  const {container} = renderComponent({navigation: {goBack: () => {}}});
  expect(container).toBeTruthy();
});

test('should have title', () => {
  const {getByTestId} = renderComponent({navigation: {}});
  const lblTitle = getByTestId('eDetail-title');
  expect(lblTitle).toBeTruthy();
});

test('should have button for starting presentation', () => {
  const {getByTestId} = renderComponent({navigation: {}});
  const btnPresentation = getByTestId('eDetail-start-presentation');
  expect(btnPresentation).toBeTruthy();
});

test('should have priority products title', () => {
  const {getByTestId} = renderComponent({navigation: {}});
  const lblTitle = getByTestId('eDetail-priority-products');
  expect(lblTitle).toBeTruthy();
});

test('should have other products title', () => {
  const {getByTestId} = renderComponent({navigation: {}});
  const lblTitle = getByTestId('eDetail-priority-other-products');
  expect(lblTitle).toBeTruthy();
});

test('should have back button', () => {
  const {getByTestId} = renderComponent({navigation: {}});
  const btnPresentation = getByTestId('eDetail-back');
  expect(btnPresentation).toBeTruthy();
});

test('should able to go back using back button', () => {
  const onPressMock = jest.fn();
  const {getByTestId} = renderComponent({navigation: {goBack: onPressMock}});
  const btnPresentation = getByTestId('eDetail-back');
  fireEvent.press(btnPresentation);
  expect(onPressMock).toHaveBeenCalled();
});
