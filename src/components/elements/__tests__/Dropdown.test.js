import 'react-native';
import React from 'react';
import Dropdown from 'components/elements/Dropdown';
import {withTheme, cleanup} from 'utils/testHelpers';

afterEach(cleanup);

const valueSelectedHandler = jest.fn();
const dropdownProps = {
  defaultLabel: 'label',
  valueSelected: valueSelectedHandler,
  testID: 'testID',
  data: [{option: 'A', value: 1}],
};
function renderComponent(props) {
  return withTheme(<Dropdown {...props} />);
}

describe('Dropdown Component', () => {
  test('should render component', () => {
    const {getByText} = renderComponent(dropdownProps);
    expect(getByText('label')).toBeDefined();
  });
});
