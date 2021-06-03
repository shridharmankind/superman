import 'react-native';
import React from 'react';
import DoctorDetailsWrapper from 'components/elements/DoctorDetailsWrapper';
import {withTheme, cleanup, fireEvent} from 'utils/testHelpers';

afterEach(cleanup);
const onPressHandler = jest.fn();

const doctorDetailsWrapperProps = {
  party: {frequency: 3, alreadyVisited: 2},
  title: 'title',
  specialization: ['nero', 'dental'],
  category: 'kyc',
  selected: true,
  location: 'karol Bagh',
  testID: 'testID',
  onPress: onPressHandler,
  isPatchedData: true,
};

function renderComponent(props) {
  return withTheme(<DoctorDetailsWrapper {...props} />);
}

describe('Doctor Details Wrapper Component', () => {
  test('must render component', () => {
    const {getByText} = renderComponent(doctorDetailsWrapperProps);

    expect(getByText('title')).toBeDefined();
  });
  test('must render component for PatchedData having all visits completed', () => {
    const {container} = renderComponent({
      ...doctorDetailsWrapperProps,
      isPatchedData: false,
      party: {
        frequency: 3,
        alreadyVisited: 3,
      },
    });

    expect(container.firstChild).toBeUndefined();
  });
  test('must render component for non PatchedData having all visits completed', () => {
    const {getByText} = renderComponent({
      ...doctorDetailsWrapperProps,
      isPatchedData: true,
      party: {
        frequency: 3,
        alreadyVisited: 3,
      },
    });
    expect(getByText('karol Bagh')).toBeDefined();
  });
  test('must handle onPress', () => {
    const {getByTestId} = renderComponent(doctorDetailsWrapperProps);
    const comp = getByTestId('testID');
    fireEvent.press(comp);
    expect(onPressHandler).toHaveBeenCalled();
  });
});
