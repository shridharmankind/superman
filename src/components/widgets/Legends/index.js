import React from 'react';
import {Label, LabelVariant} from 'components/elements';
import {View} from 'react-native';
import styles from './styles';
import {Strings} from 'common';
import {TOUR_PLAN_TYPE} from 'screens/tourPlan/constants';
import {LocationIcon} from 'assets';
const legends = Strings.Legends;

const LegendWrapper = props => {
  const {title, style, testID = `legends_${title}_test`} = props;
  return (
    <View style={styles.legendsContainer} testID={testID}>
      {props.children}
      {style && <View style={style} />}
      <Label
        variant={LabelVariant.label}
        style={[styles.contentBasicStyle]}
        title={title}
      />
    </View>
  );
};

/**
 *
 * @returns  kyc visit legend
 */
const renderKycVisit = () => (
  <LegendWrapper title={legends.kycDoctor} style={[styles.dot, styles.kyc]} />
);

/**
 *
 * @returns  schedule visit legend
 */
const renderScheduleVisits = () => (
  <LegendWrapper
    title={[legends.visitSchedule]}
    style={[styles.dot, styles.scheduleVisits]}
  />
);

/**
 *
 * @returns events legend
 */
const renderEvents = () => (
  <LegendWrapper
    title={legends.events}
    style={[styles.verticalBar, styles.events]}
  />
);

/**
 *
 * @returns holiday legends
 */
const renderHolidays = () => (
  <LegendWrapper
    title={legends.holiday}
    style={[styles.verticalBar, styles.holiday]}
  />
);

/**
 *
 * @returns  leaves legends
 */
const renderLeaves = () => (
  <LegendWrapper title={legends.leave}>
    <View style={styles.barContainer}>
      <View style={styles.bar} />
      <View style={styles.bar} />
      <View style={styles.bar} />
    </View>
  </LegendWrapper>
);

/**
 *
 * @returns todays legend
 */

const renderToday = () => (
  <LegendWrapper title={legends.today} style={[styles.today]} />
);

const renderLocation = () => (
  <LegendWrapper title={legends.location}>
    <LocationIcon width={16} height={16} />
  </LegendWrapper>
);
const renderMTPLegends = () => {
  return (
    <View style={[styles.container, styles.monthlycontainer]}>
      {renderKycVisit()}
      {renderScheduleVisits()}
      {renderEvents()}
      {renderHolidays()}
      {renderLeaves()}
      {renderToday()}
    </View>
  );
};

const renderSTPLegends = () => {
  return (
    <View style={[styles.container, styles.standardContainer]}>
      {renderScheduleVisits()}
      {renderKycVisit()}
      {renderLocation()}
    </View>
  );
};

/**
 * @returns Legends for MTP
 */

const Legends = ({tourType}) => {
  return tourType === TOUR_PLAN_TYPE.STANDARD
    ? renderSTPLegends()
    : renderMTPLegends();
};

export default React.memo(Legends);
