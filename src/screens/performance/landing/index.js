import React from 'react';
import {ContentWithSidePanel} from 'components/layouts';
import {Label, LabelVariant} from 'components/elements';
import styles from './styles';
import {translate} from 'locale';
import {View} from 'react-native';
import {PerformanceInside, Leaderboard} from 'assets';

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
      <View style={styles.flexRow}>
        <View style={styles.performanceSectionContainer}>
          <PerformanceInside width={50} height={50} />
          <Label
            style={styles.sectionsTitle}
            type="semiBold"
            title={translate('performance.myPerformance')}
          />

          <View style={styles.flexRow}>
            <Label
              style={styles.sectionNumber}
              type="semiBold"
              title={'4,000,000'}
            />
            <Label
              style={styles.sectionNumber2}
              type="semiBold"
              title={'/5,000,000'}
            />
          </View>
          <Label style={styles.sales} title={translate('performance.sales')} />
          <Label
            style={styles.colorPrimary}
            type="semiBold"
            title={translate('performance.youAreOnTrack')}
          />
        </View>
        <View style={styles.leaderboardSectionContainer}>
          <Leaderboard width={50} height={50} />
          <Label
            style={styles.sectionsTitle}
            type="semiBold"
            title={translate('performance.leaderboard')}
          />

          <View style={styles.flexRow}>
            <Label style={styles.sectionNumber} type="semiBold" title={'2'} />
          </View>
          <Label
            style={styles.sales}
            title={translate('performance.rankInTerritory')}
          />
          <Label
            style={styles.colorPrimary}
            type="semiBold"
            title={translate('performance.youGainedPositionFromLastMonth')}
          />
        </View>
      </View>
    </ContentWithSidePanel>
  );
};

export default PerformanceLanding;
