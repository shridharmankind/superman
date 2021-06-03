import 'react-native';
import React from 'react';
import Label from 'components/elements/Label';
import {withTheme, cleanup} from 'utils/testHelpers';
import {Text} from 'react-native';

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

    expect(
      headingClass.props.style.some(
        value => value?.fontFamily === 'Poppins-SemiBold',
      ),
    ).toBeTruthy();
  });

  it('renders component with fontFamily as bold', () => {
    const headingClass = Label({title: 'a', type: 'bold'});
    expect(
      headingClass.props.style.some(
        value => value?.fontFamily === 'Poppins-Bold',
      ),
    ).toBeTruthy();
  });
  it('renders component with fontFamily as regular', () => {
    const headingClass = Label({title: 'a', type: 'regular'});
    expect(
      headingClass.props.style.some(
        value => value?.fontFamily === 'Poppins-Regular',
      ),
    ).toBeTruthy();
  });
  it('renders component with fontFamily as medium', () => {
    const headingClass = Label({title: 'a', type: 'medium'});
    expect(
      headingClass.props.style.some(
        value => value?.fontFamily === 'Poppins-Medium',
      ),
    ).toBeTruthy();
  });
});

describe('Handle Label props', () => {
  test('Variant must apply style', () => {
    const headingClass = Label({title: 'a', variant: 'h5'});
    expect(
      headingClass.props.style.some(value => {
        return value?.fontSize === 12.7;
      }),
    ).toBeTruthy();
  });
  test('isUpperCase must convert text to upper case', () => {
    const headingClass = Label({title: 'a', isUpperCase: true});
    expect(
      headingClass.props.style.some(
        value => value?.textTransform === 'uppercase',
      ),
    ).toBeTruthy();
  });
  test('children must be render', () => {
    const {getByTestId} = withTheme(
      <Label>
        <Text testID="inner-child">A</Text>
      </Label>,
    );

    expect(getByTestId('inner-child')).toBeDefined();
  });

  test('handle empty title', () => {
    const {getByTestId} = renderComponent({testID: 'testID'});
    expect(getByTestId('testID')).toBeDefined();
  });
});
