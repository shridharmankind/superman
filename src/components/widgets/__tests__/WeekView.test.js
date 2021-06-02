import 'react-native';
import React from 'react';
import {WeekView} from 'components/widgets';
import {withTheme, cleanup, fireEvent} from 'utils/testHelpers';

afterEach(cleanup);
const onPressHandler = jest.fn();
const workingDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const columnHeader = ['Week 1', 'Week 2', 'Week 3'];
function renderComponent({...props}) {
  return withTheme(
    <WeekView
      workingDays={props.workingDays ?? workingDays}
      columnHeader={props.columnHeader ?? columnHeader}
      onPressHandler={props.onPressHandler ?? onPressHandler}
      {...props}
    />,
  );
}

describe('WeekView Test Cases', () => {
  it('should render Component', () => {
    const {getByText} = renderComponent();
    expect(getByText('Sat')).toBeTruthy();
  });

  it('should render Vertical Header', () => {
    const {getAllByTestId} = renderComponent();

    expect(getAllByTestId('label_weekView_verticalHeader_test').length).toEqual(
      workingDays.length,
    );
  });

  it('should render Horizontal Header', () => {
    const {getAllByTestId} = renderComponent();
    expect(getAllByTestId('label_weekView_header_test').length).toEqual(
      columnHeader.length + 1,
    );
  });

  it('should handle cell click', () => {
    const {getAllByTestId} = renderComponent();
    const cellId = getAllByTestId('button_weekView_cell_test')[0];
    fireEvent.press(cellId);
    expect(cellId).toBeTruthy();
  });
});
