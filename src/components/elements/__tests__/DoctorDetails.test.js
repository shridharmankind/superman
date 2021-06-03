import 'react-native';
import React from 'react';
import DoctorDetails from 'components/elements/DoctorDetails';
import {withTheme, cleanup} from 'utils/testHelpers';

afterEach(cleanup);

const doctorDetailProps = {
  title: 'title',
  specialization: ['nero', 'dental'],
  showFrequencyChiclet: true,
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
function renderComponent(props) {
  return withTheme(
    <DoctorDetails title={props?.title || 'title'} {...props} />,
  );
}

describe('Doctor Details Component', () => {
  test('should render component', () => {
    const {getByText} = renderComponent(doctorDetailProps);

    expect(getByText('nero, dental')).toBeDefined();
  });
  test('should render component without custom style & visit data', () => {
    const {getByText} = renderComponent({
      ...doctorDetailProps,
      customStyle: null,
      visitData: null,
    });

    expect(getByText('A+')).toBeDefined();
  });
  test('should render component with division as `kyc`', () => {
    const {getByText} = renderComponent({
      ...doctorDetailProps,
      category: 'kyc',
    });

    expect(getByText('KYC')).toBeDefined();
  });
  test('should render component with division as `b`', () => {
    const {getByText} = renderComponent({
      ...doctorDetailProps,
      category: 'b',
    });

    expect(getByText('B')).toBeDefined();
  });
  test('should handle component with default division', () => {
    const {getByText} = renderComponent({
      ...doctorDetailProps,
      category: '',
    });

    expect(getByText('')).toBeDefined();
  });
});
