import React from 'react';
import EDetailing from '../e-detailing/e-detailing.component';
import {withTheme} from 'utils/testHelpers';

const renderComponent = props => withTheme(<EDetailing {...props} />);

test('should render component', () => {
  const {container} = renderComponent({navigation: {}});
  expect(container).toBeTruthy();
});
