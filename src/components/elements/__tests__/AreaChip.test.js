import 'react-native';
import React from 'react';
import AreaChip from 'components/elements/AreaChip';
import {withTheme, cleanup, fireEvent} from 'utils/testHelpers';

afterEach(cleanup);
function renderComponent(props) {
  return withTheme(<AreaChip {...props} />);
}

describe('Area Chip', () => {
  test('should render component', () => {
    const {getByTestId} = renderComponent({testID: 'testID'});

    expect(getByTestId('testID')).toBeDefined();
  });
  test('should render title', () => {
    const {getByText} = renderComponent({title: 'title'});

    expect(getByText('title')).toBeDefined();
  });
  test('should render count', () => {
    const {getByText} = renderComponent({title: 'title', count: '1'});
    expect(getByText('title (1)')).toBeDefined();
  });
  test('should handle on Press handler', () => {
    const onPressHandler = jest.fn();
    const {getByTestId} = renderComponent({
      testID: 'testID',
      title: 'title',
      selected: true,
      selectedColor: 'red',
      onPress: onPressHandler,
    });

    const chip = getByTestId('testID');
    fireEvent.press(chip);
    expect(onPressHandler).toHaveBeenCalled();
  });
});
