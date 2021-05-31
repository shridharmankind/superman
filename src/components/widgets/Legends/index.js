import React from 'react';
import {Label} from 'components/elements';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from 'themes';
import styles from './styles';
import {Strings} from 'common';
import {TOUR_PLAN_TYPE} from 'screens/tourPlan/constants';

const legends = Strings.Legends;

const LegendWrapper = props => {
  const {title, style, testID = `legends_${title}_test`} = props;
  return (
    <View style={styles.legendsContainer} testID={testID}>
      {props.children}
      {style && <View style={style} />}
      <Label style={[styles.contentBasicStyle]} title={title} size={14} />
    </View>
  );
};

/**
 *
 * @returns  kyc visit legend
 */
const renderKycVisit = () => (
  <LegendWrapper title={legends.kycDoctor}>
    <Icon name={'star'} size={14} color={theme.colors.orange[100]} />
  </LegendWrapper>
);

/**
 *
 * @returns  schedule visit legend
 */
const renderScheduleVisits = () => (
  <LegendWrapper
    title={[legends.visitSchedule]}
    style={[styles.verticalBar, styles.scheduleVisits]}
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
const renderMTPLegends = () => {
  return (
    <View style={[styles.container, styles.Monthlycontainer]}>
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
    <View style={[styles.container, styles.StandardContainer]}>
      {renderScheduleVisits()}
      {renderKycVisit()}
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
