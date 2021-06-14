import 'react-native';
import React from 'react';
import {WeekView} from 'components/widgets';
import {withTheme, cleanup, fireEvent} from 'utils/testHelpers';

afterEach(cleanup);
const onPressHandler = jest.fn();
const workingDays = ['Monday', 'Tuesday', 'Wednesday'];
const stpMockData = [
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 0,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: true,
      isNoOfVisitHigh: true,
    },
    isCompliant: true,
    week: 1,
    weekDay: 'Monday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 3,
      },
      {
        partyType: 'Chemist',
        count: 12,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: false,
      isNoOfVisitHigh: false,
    },
    isCompliant: true,
    week: 1,
    weekDay: 'Tuesday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 3,
      },
      {
        partyType: 'Chemist',
        count: 0,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: false,
      isNoOfVisitHigh: false,
    },
    isCompliant: true,
    week: 1,
    weekDay: 'Wednesday',
  },
  {
    parties: [
      {
        partyType: 'Doctor',
        count: 0,
      },
      {
        partyType: 'Chemist',
        count: 0,
      },
    ],
    noOfKyc: 7,
    patch: {
      Id: 1,
      DefaultName: 'patch1',
      displayName: 'patch1',
      isExStation: false,
      isNoOfVisitHigh: false,
    },
    isCompliant: false,
    week: 1,
    weekDay: 'Thursday',
  },
];
const columnHeader = [1, 2];
function renderComponent({...props}) {
  return withTheme(
    <WeekView
      workingDays={props.workingDays ?? workingDays}
      columnHeader={props.columnHeader ?? columnHeader}
      onPressHandler={props.onPressHandler ?? onPressHandler}
      weekData={stpMockData}
      {...props}
    />,
  );
}

describe('WeekView Test Cases', () => {
  it('should render Component', () => {
    const {getByText} = renderComponent();
    expect(getByText('Mon')).toBeTruthy();
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
