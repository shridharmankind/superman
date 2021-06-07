import React from 'react';

import {ContentWithSidePanel} from 'components/layouts';
import {Label, LabelVariant} from 'components/elements';

const PerformanceLanding = () => {
  return (
    <ContentWithSidePanel>
      <Label variant={LabelVariant.subtitleLarge} title="Coming soon!" />
    </ContentWithSidePanel>
  );
};

export default PerformanceLanding;
