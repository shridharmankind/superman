import 'react-native';
import React from 'react';
import Frequency from 'components/elements/Frequency';
import {withTheme, cleanup} from 'utils/testHelpers';

afterEach(cleanup);

function renderComponent(props) {
  return withTheme(<Frequency {...props} />);
}

describe('Frequency Element', () => {
  test('should render component', () => {
    const {getByTestId} = renderComponent({testID: 'testID'});
    expect(getByTestId('testID')).toBeDefined();
  });
  test('should render component with visited', () => {
    const {getByTestId} = renderComponent({visited: true});

    expect(getByTestId('frequency-circle-icon')).toBeDefined();
  });
});
