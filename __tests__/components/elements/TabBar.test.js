import 'react-native';
import React from 'react';
import {TabBar} from 'components/elements';
import {withTheme, fireEvent} from 'utils/testHelpers';

function renderComponent(props) {
  return withTheme(<TabBar {...props} />);
}

const props = {
  state: {
    index: 0,
    routes: [{key: 'DailyPlan', name: 'Daily Plan'}],
  },
  descriptors: {
    DailyPlan: {
      options: {
        tabBarTestID: 'dailyPlanButton',
      },
    },
  },
  navigation: {
    navigate: jest.fn(),
    emit: jest.fn(),
  },
  position: {},
};

it('renders tab bar with expected name', () => {
  const {getByText} = renderComponent(props);

  expect(getByText('Daily Plan')).toBeTruthy();
});

it('click rendered tab', () => {
  const {getByText, getByTestId} = renderComponent(props);

  expect(getByText('Daily Plan')).toBeTruthy();
  const button = getByTestId('dailyPlanButton');
  expect(button).toBeTruthy();
  fireEvent.press(button);
  expect(props.navigation.emit).toHaveBeenCalled();
});
