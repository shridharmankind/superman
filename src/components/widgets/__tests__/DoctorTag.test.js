import 'react-native';
import React from 'react';
import {DoctorTag} from 'components/widgets';
import {withTheme, cleanup} from 'utils/testHelpers';

afterEach(cleanup);

function renderComponent(propsData) {
  return withTheme(<DoctorTag {...propsData} />);
}

describe('Doctor Tag Cases', () => {
  it('should render Component', () => {
    const {getByTestId} = renderComponent({
      title: 'title',
      division: 'kyc',
    });
    expect(getByTestId('doctorTag-title-kyc-test')).toBeDefined();
  });
  it('should render Component for A plus', () => {
    const {getByTestId} = renderComponent({
      title: 'title',
      division: 'a+',
    });
    expect(getByTestId('doctorTag-title-a+-test')).toBeDefined();
  });
  it('should render Component for A ', () => {
    const {getByTestId} = renderComponent({
      title: 'title',
      division: 'a',
    });
    expect(getByTestId('doctorTag-title-a-test')).toBeDefined();
  });
  it('should render Component for B', () => {
    const {getByTestId} = renderComponent({
      title: 'title',
      division: 'b',
    });
    expect(getByTestId('doctorTag-title-b-test')).toBeDefined();
  });
  it('should render Component for C', () => {
    const {getByTestId} = renderComponent({
      title: 'title',
      division: 'c',
    });
    expect(getByTestId('doctorTag-title-c-test')).toBeDefined();
  });
  it('should render Component for default', () => {
    const {getByTestId} = renderComponent({
      division: 'd',
    });
    expect(getByTestId('doctorTag-d-d-test')).toBeDefined();
  });
});
