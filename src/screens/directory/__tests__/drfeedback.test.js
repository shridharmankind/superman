import 'react-native';
import React from 'react';
import {DoctorFeedback} from 'screens/directory';
import dayjs from 'dayjs';
import {withTheme} from 'utils/testHelpers';

const renderComponent = props => withTheme(<DoctorFeedback {...props} />);
const dataProps = {
  navigation: {},
  route: {params: {data: {name: 'Manoj'}}},
};
test('Should render component ', () => {
  const {container} = renderComponent(dataProps);
  expect(container).toBeTruthy();
});
test('Should render Title', () => {
  const {getByText} = renderComponent(dataProps);
  expect(getByText('Feedback - ')).toBeTruthy();
});

test('Should render doctor name', () => {
  const {getByTestId} = renderComponent(dataProps);
  expect(getByTestId('doctor_name')).toBeTruthy();
});
test('Should render current date of feedback', () => {
  const {getByText} = renderComponent(dataProps);
  expect(getByText(dayjs().format('DD MMM YYYY'))).toBeTruthy();
});
test('Should render Add a doctor', () => {
  const {getByTestId} = renderComponent(dataProps);
  expect(getByTestId('Add_Doctor_link')).toBeTruthy();
});
test('Should have back button', () => {
  const {getByTestId} = renderComponent(dataProps);
  expect(getByTestId('back_btn')).toBeTruthy();
});
