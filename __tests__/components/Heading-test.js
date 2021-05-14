import 'react-native';
import React from 'react';
import Heading from 'components/elements/Heading';
import {withTheme, cleanup} from 'utils/testHelpers';

afterEach(cleanup);
function renderComponent(props) {
  return withTheme(<Heading {...props} />);
}

it('renders component with Title', () => {
  const {getByText} = renderComponent({title: 'Text Test'});
  expect(getByText('Text Test')).toBeTruthy();
});

it('renders component with fontFamily as semiBold', () => {
  const headingClass = Heading({title: 'a', type: 'bold'});
  expect(headingClass.props.style[0]).toEqual({
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  });
});
