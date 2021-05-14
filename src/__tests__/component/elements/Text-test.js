import 'react-native';
import React from 'react';
import Text from 'components/elements/Text';
import {withTheme} from 'utils/testHelpers';
import {fireEvent} from '@testing-library/react-native';

function renderComponent(props) {
  return withTheme(<Text {...props} />);
}

it('renders outlined button', () => {
  const {getByText} = renderComponent({title: 'Text Test'});
  expect(getByText('Text Test')).toBeTruthy();
});
