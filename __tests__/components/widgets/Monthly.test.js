import 'react-native';
import React from 'react';
import {MonthlyView} from 'components/widgets';
import {withTheme, cleanup} from 'utils/testHelpers';

afterEach(cleanup);

function renderComponent({...props}) {
  return withTheme(<MonthlyView {...props} />);
}

describe('Monthly Test Cases', () => {
  it('should render Component', () => {
    const {container} = renderComponent();
    expect(container.firstChild).toBeTruthy();
  });
});
