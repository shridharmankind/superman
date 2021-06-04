import 'react-native';
import React from 'react';
import {StandardPlanContainer} from 'screens/tourPlan';
import {withTheme, cleanup, fireEvent} from 'utils/testHelpers';

afterEach(cleanup);

const standardPlanContainerProps = {
  workingDays: ['Monday', 'Tuesday'],
  navigation: {
    navigate: jest.fn(),
  },
};
function renderComponent(props) {
  return withTheme(<StandardPlanContainer {...props} />);
}

describe('Standard Plan Container', () => {
  test('should render component', () => {
    const {container} = renderComponent(standardPlanContainerProps);

    expect(container).toBeDefined();
  });
  test('should handle cell click', () => {
    const {getAllByTestId} = renderComponent(standardPlanContainerProps);
    const cell = getAllByTestId('week 4-3-test')[0];
    fireEvent.press(cell);
    expect(standardPlanContainerProps.navigation.navigate).toHaveBeenCalled();
  });
});
