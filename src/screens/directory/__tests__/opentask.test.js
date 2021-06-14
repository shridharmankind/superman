import 'react-native';
import React from 'react';
import {OpenTask} from 'screens/directory';
import {renderer, fireEvent} from 'utils/testHelpers';
import configureStore from 'redux-mock-store';
const initialState = {
  openTaskState: {
    task: {
      count: 4,
      opentasks: [
        {
          id: 1,
          description: 'face shield',
          dueOn: '2021-06-06',
          type: 'Gift Request',
        },
        {
          id: 2,
          description:
            'ware of the application it processes the DateTime format to convert in specific format. And passes',
          dueOn: '2021-06-05',
          type: 'Sample Request',
        },
        {
          id: 3,
          description:
            'ware of the application it processes the DateTime format to convert in specific format. And passes',
          dueOn: '2021-06-05',
          type: 'Sample Request',
        },
        {
          id: 4,
          description:
            'ware of the application it processes the DateTime format to convert in specific format. And passes',
          dueOn: '2021-06-05',
          type: 'Sample Request',
        },
      ],
    },
  },
};

const mockStore = configureStore([]);
const store = mockStore(initialState);

const renderComponent = props => renderer(<OpenTask {...props} />, store);

afterEach(() => {
  store.clearActions();
});

test('component should render', () => {
  const {container} = renderComponent();
  expect(container).toBeTruthy();
});
test('Task Header should come', () => {
  const {getByTestId} = renderComponent();
  expect(getByTestId('task_header')).toBeTruthy();
});
test('Task Count should come', () => {
  const {getByTestId} = renderComponent();
  expect(getByTestId('task_count')).toBeTruthy();
});
test('it should dispatch fetch task actions', () => {
  const {getByText} = renderComponent();
  const actions = store.getActions();
  expect(actions.length).toBe(1);
  expect(actions[0].type).toEqual('FETCH_OPEN_TASKS');
  expect(getByText('face shield')).toBeTruthy();
});

test('it should render 4 tasks', () => {
  const {getByText} = renderComponent();
  const actions = store.getActions();
  expect(actions.length).toBe(1);
  expect(actions[0].type).toEqual('FETCH_OPEN_TASKS');
  expect(getByText('4')).toBeTruthy();
});
test('it should show ViewAll', () => {
  const {getByText} = renderComponent();
  const viewAll = getByText('View All');
  expect(viewAll).toBeTruthy();
  fireEvent.press(viewAll);
  expect(getByText('View Less')).toBeTruthy();
});
