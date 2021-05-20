import 'react-native';
import React from 'react';
import {Tab} from 'components/elements';
import {withTheme, fireEvent} from 'utils/testHelpers';

function renderComponent(props) {
  return withTheme(<Tab {...props} />);
}

it('renders tab button', () => {
  const props = {
    isChecked: true,
    text: 'Test',
    onTabPress: jest.fn(),
  };
  const {getByText} = renderComponent(props);
  const tab = getByText('Test');
  expect(tab).toBeTruthy();
  fireEvent.press(tab);
  expect(props.onTabPress).toHaveBeenCalled();
});
