import React from 'react';

import {ContentWithSidePanel} from 'components/layouts';
import {Label} from 'components/elements';
import {Strings} from 'common';

/**
 * Custom Landing component of Directory Screen.
 * Initially click on directory left menu this component render
 */
const DirectoryLanding = () => {
  return (
    <ContentWithSidePanel>
      <Label title={Strings.comingSoon} />
    </ContentWithSidePanel>
  );
};

export default DirectoryLanding;
