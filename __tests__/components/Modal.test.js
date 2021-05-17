import 'react-native';
import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {Modal} from 'components/elements';
import {withTheme} from 'utils/testHelpers';
import {fireEvent} from '@testing-library/react-native';

function renderComponent(props) {
  return withTheme(<Modal {...props} />);
}

const planOptions = [
  {
    id: 1,
    text: 'Standard Tour Plan (STP)',
  },
  {
    id: 2,
    text: 'March 2021',
  },
  {
    id: 3,
    text: 'April 2021',
  },
  {
    id: 4,
    text: 'May 2021',
  },
];

const getModalTitle = () => {
  return (
    <View>
      <Text>View Tour Plan for</Text>
    </View>
  );
};

const getModalContent = () => {
  return (
    <View>
      {planOptions.map((option, index) => (
        <TouchableWithoutFeedback key={index} onPress={() => {}}>
          <Text>{option.text}</Text>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const props = {
  open: true,
  onClose: jest.fn(),
  modalTitle: getModalTitle(),
  modalContent: getModalContent(),
  primaryAction: () => {},
  primaryActionProps: {
    testID: 'modalBtn',
    actionTitle: 'close',
    mode: 'contained',
  },
  closeAction: true,
  closeTestId: 'modalCloseIcon',
};

it('renders modal', () => {
  const {getByText} = renderComponent(props);

  expect(getByText('View Tour Plan for')).toBeTruthy();
});

it('renders close icon and click it', () => {
  const {getByTestId} = renderComponent(props);
  const closeIcon = getByTestId('modalCloseIcon');
  expect(closeIcon).toBeTruthy();
  fireEvent.press(closeIcon);
  expect(props.onClose).toHaveBeenCalled();
});

it('renders primary action and click it', () => {
  const {getByText} = renderComponent(props);
  const primaryActionButton = getByText('close');
  expect(primaryActionButton).toBeTruthy();
  fireEvent.press(primaryActionButton);
  expect(props.onClose).toHaveBeenCalled();
});
