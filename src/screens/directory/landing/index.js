import React from 'react';

import {ContentWithSidePanel} from 'components/layouts';
import {Label} from 'components/elements';

/**
 * Custom Landing component of Directory Screen.
 * Initially click on directory left menu this component render
 */
const DirectoryLanding = () => {
  return (
    <ContentWithSidePanel>
      <Label title="Coming soon ***" />
    </ContentWithSidePanel>
  );
};

export default DirectoryLanding;
