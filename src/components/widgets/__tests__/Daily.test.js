import 'react-native';
import React from 'react';
import {DailyView} from 'components/widgets';
import {withTheme, cleanup} from 'utils/testHelpers';

afterEach(cleanup);
const currentDate = new Date();
const props = {
  date: {
    dateString: currentDate.toISOString().split('T')[0],
    day: new Date().getDate(),
  },
  children: '6',
};

function renderComponent(props) {
  return withTheme(<DailyView {...props} />);
}

describe('Daily Test Cases', () => {
  it('should render Component', () => {
    const {getByTestId} = renderComponent({props});
    expect(getByTestId('label_dailyView_date_test')).toBeDefined();
  });
});
