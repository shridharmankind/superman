import React from 'react';
import {renderer} from 'utils/testHelpers';

import Performance from 'screens/performance';

const renderComponent = props => renderer(<Performance {...props} />);

test('should render when no props are passed', () => {
  const {container} = renderComponent();
  expect(container).toBeTruthy();
});
