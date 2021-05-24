import 'react-native';
import React from 'react';
import {Legends} from 'components/widgets';
import {withTheme, cleanup} from 'utils/testHelpers';

afterEach(cleanup);

function renderComponent(props) {
  return withTheme(<Legends {...props} />);
}

describe('Legends Test Cases : MTP', () => {
  it('should render Legend with text : Today', () => {
    const {getByText} = renderComponent();
    expect(getByText('Today')).toBeTruthy();
  });
  it('should render Legend with text : Leaves', () => {
    const {getByText} = renderComponent();
    expect(getByText('Leave')).toBeTruthy();
  });
  it('should render Legend with text : KYC Doctors', () => {
    const {getByText} = renderComponent();
    expect(getByText('KYC Doctors')).toBeTruthy();
  });
  it('should render Legend with text : Events', () => {
    const {getByText} = renderComponent();
    expect(getByText('Events')).toBeTruthy();
  });
  it('should render Legend with text : Holiday', () => {
    const {getByText} = renderComponent();
    expect(getByText('Holiday')).toBeTruthy();
  });
  it('should render Legend with text : High number of visits scheduled', () => {
    const {getByText} = renderComponent();
    expect(getByText('High number of visits scheduled')).toBeTruthy();
  });
});

describe('Legends Test Cases : STP', () => {
  it('should render Legend with text : High number of visits scheduled', () => {
    const {getByText} = renderComponent({tourType: 'STANDARD'});
    expect(getByText('High number of visits scheduled')).toBeTruthy();
  });
});
