import 'react-native';
import React from 'react';
import {DailyView} from 'components/widgets';
import {withTheme, cleanup} from 'utils/testHelpers';

afterEach(cleanup);
const currentDate = new Date();
const dailyProps = {
  date: {
    dateString: currentDate.toISOString().split('T')[0],
    day: new Date().getDate(),
  },
  children: '6',
};

function renderComponent(data, additionalProps) {
  return withTheme(
    <DailyView props={data} workingDays={['monday']} {...additionalProps} />,
  );
}

describe('Daily Test Cases', () => {
  it('should render Component', () => {
    const {getByTestId} = renderComponent(dailyProps);
    expect(getByTestId('label_dailyView_date_test')).toBeDefined();
  });
  it('should disable Cell for future months', () => {
    const {getByTestId} = renderComponent(dailyProps, {
      selectedMonth: new Date().getMonth() - 1,
    });
    expect(getByTestId('label_dailyView_leftContent_test')).toBeDefined();
  });
});
