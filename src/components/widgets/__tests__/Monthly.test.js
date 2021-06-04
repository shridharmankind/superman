import 'react-native';
import React from 'react';
import {MonthlyView} from 'components/widgets';
import {withTheme, cleanup} from 'utils/testHelpers';

afterEach(cleanup);

const monthlyProps = {
  previousMonthSelected: new Date().getMonth() - 2,
  monthSelected: new Date().getMonth() - 1,
};
function renderComponent(props) {
  return withTheme(<MonthlyView {...props} />);
}

describe('Monthly Test Cases', () => {
  it('should render Component', () => {
    const {container} = renderComponent(monthlyProps);
    expect(container).toBeTruthy();
  });
  it('should render Component with working Days', () => {
    const {getByTestId} = renderComponent({
      ...monthlyProps,
      workingDays: ['monday', 'tuesday'],
    });
    expect(getByTestId('calendar-monthly-view-test')).toBeDefined();
  });
  it('should handle when prevoius month is not selected', () => {
    const {getByTestId} = renderComponent({
      monthSelected: new Date().getMonth() - 1,
      workingDays: ['monday', 'tuesday'],
    });
    expect(getByTestId('calendar-monthly-view-test')).toBeDefined();
  });
});
