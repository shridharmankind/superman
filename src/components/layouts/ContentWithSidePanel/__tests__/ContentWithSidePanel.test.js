import React from 'react';
import {ContentWithSidePanel} from 'components/layouts';
import {withTheme} from 'utils/testHelpers';
import {Label} from 'components/elements';

const renderComponent = props => withTheme(<ContentWithSidePanel {...props} />);

test('should render when no props are passed', () => {
  const {container} = renderComponent();
  expect(container).toBeTruthy();
});

test('should render side panel when prop is passed', () => {
  const sidePanelText = 'Side Panel';

  const {getByText} = renderComponent({
    sidePanel: <Label title={sidePanelText} />,
  });
  expect(getByText(sidePanelText)).toBeTruthy();
});

test('should render header when prop is passed', () => {
  const headerText = 'Header';

  const {getByText} = renderComponent({
    header: <Label title={headerText} />,
  });
  expect(getByText(headerText)).toBeTruthy();
});
