import 'react-native';
import React from 'react';
import {DoctorVisitStates} from 'components/widgets';
import {withTheme} from 'utils/testHelpers';

function renderComponent(props) {
  return withTheme(<DoctorVisitStates {...props} />);
}

it('renders visit states', () => {
  const props = {
    visitDate: '12',
    visitMonth: 'May',
    visitState: 'UPCOMING',
  };
  const {getByText} = renderComponent(props);
  const element = getByText('May');
  expect(element).toBeTruthy();
});
