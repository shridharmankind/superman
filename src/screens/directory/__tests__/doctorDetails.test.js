import 'react-native';
import React from 'react';
import DoctorProfile from '../doctorDetails';
import {withTheme, cleanup} from 'utils/testHelpers';

afterEach(cleanup);
const doctorDetailProps = {
  title: 'title',
  specialization: ['nero', 'dental'],
  showFrequencyChiclet: true,
  birthday: '2021-05-19T18:25:11',
  anniversary: '2021-05-19T18:25:11',
  selfDispensing: false,
  engagement: [
    {startDate: '2020-01-19T00:00:00', endDate: null},
    {startDate: '2020-05-20T00:00:00', endDate: '2020-06-21T00:00:00'},
    {startDate: '2020-07-25T00:00:00', endDate: '2020-12-17T00:00:00'},
  ],
  alreadyVisited: 1,
  frequency: 3,
  selectedVistedFrequency: 1,
  selected: true,
  location: 'Karog Bagh',
  isTicked: true,
  showTile: true,
  showVisitPlan: true,
  category: 'a+',
  customStyle: {
    detailsContainerCustom: {},
    divisionSize: 9,
    imageCustom: '',
    nameContainerCustom: '',
    subTitleSize: 10,
    specialization: 'dr',
  },
  visitData: [{date: '12', month: '1', state: 'Delhi'}],
};
const routes = {
  params: {
    data: doctorDetailProps,
  },
};
const navigationObject = {
  navigate: jest.fn(),
};
function renderComponent(props) {
  return withTheme(
    <DoctorProfile route={routes} navigation={navigationObject} />,
  );
}

describe('Doctor Details Component', () => {
  test('should render component', () => {
    const {getByText} = renderComponent();
    expect(getByText('nero, dental')).toBeDefined();
  });
});
