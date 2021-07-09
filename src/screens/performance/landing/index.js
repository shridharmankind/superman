import React from 'react';
import { ContentWithSidePanel } from 'components/layouts';
import { Label, LabelVariant } from 'components/elements';
import styles from './styles';
import { translate } from 'locale';
import { View } from 'react-native';
import { PerformanceInside } from 'assets';

const PerformanceLanding = () => {
  const renderHeader = () => (
    <View style={styles.header}>
      <Label
        style={styles.headerLabel}
        type="semiBold"
        title={translate('performance.title')}
      />
    </View>
  );
  return (
    <ContentWithSidePanel header={renderHeader()}>
      <View style={styles.sectionsContainer}>
        <View style={styles.performanceSectionContainer}>
          <PerformanceInside
            style={styles.birthdayBorder}
            width={50}
            height={50}
          />
          <Label
            style={styles.headerLabel}
            type="semiBold"
            title={translate('performance.myPerformance')}
          />
        </View>
        <View style={styles.leaderboardSectionContainer}>
          <Label
            style={styles.headerLabel}
            type="semiBold"
            title={translate('performance.leaderboard')}
          />
        </View>
      </View>
    </ContentWithSidePanel>
  );
};

export default PerformanceLanding;
