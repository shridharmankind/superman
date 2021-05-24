import 'react-native';
import React from 'react';
import Label from 'components/elements/Label';
import {withTheme, cleanup} from 'utils/testHelpers';

afterEach(cleanup);
function renderComponent(props) {
  return withTheme(<Label {...props} />);
}

describe('Label Test Cases', () => {
  it('renders component with Title', () => {
    const {getByText} = renderComponent({title: 'Text Test'});
    expect(getByText('Text Test')).toBeTruthy();
  });

  it('renders component with fontFamily as semiBold', () => {
    const headingClass = Label({title: 'a', type: 'semiBold'});
    expect(headingClass.props.style[0]).toEqual({
      fontFamily: 'Poppins-SemiBold',
      fontSize: 18,
    });
  });

  it('renders component with fontFamily as bold', () => {
    const headingClass = Label({title: 'a', type: 'bold'});
    expect(headingClass.props.style[0]).toEqual({
      fontFamily: 'Poppins-Bold',
      fontSize: 18,
    });
  });
  it('renders component with fontFamily as regular', () => {
    const headingClass = Label({title: 'a', type: 'regular'});
    expect(headingClass.props.style[0]).toEqual({
      fontFamily: 'Poppins-Regular',
      fontSize: 18,
    });
  });
});
