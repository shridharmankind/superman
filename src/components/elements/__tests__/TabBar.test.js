import 'react-native';
import React from 'react';
import {TabBar} from 'components/elements';
import {withTheme, fireEvent} from 'utils/testHelpers';
import {Strings} from 'common';

function renderComponent(props) {
  return withTheme(<TabBar {...props} />);
}

const tabValues = [
  {
    text: `${Strings.dailyPlan}`,
  },
  {
    text: `${Strings.tourPlan}`,
  },
];

const props = {
  values: tabValues,
  onPress: jest.fn(),
};

it('renders tab bar with expected name', () => {
  const {getByText} = renderComponent(props);

  expect(getByText(`${Strings.dailyPlan}`)).toBeTruthy();
});

it('click rendered tab', () => {
  const {getByText} = renderComponent(props);
  const button = getByText(`${Strings.dailyPlan}`);
  expect(button).toBeTruthy();
  fireEvent.press(button);
  expect(props.onPress).toHaveBeenCalled();
});
