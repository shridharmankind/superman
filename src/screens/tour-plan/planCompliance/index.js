import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ProgressBar, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import styles from './styles';
import {Label, LabelVariant} from 'components/elements';
import {Constants, Strings} from 'common';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPlanComplianceCreator, planComplianceSelector} from './redux';
import {rulesMapping} from './rulesMapping';
import {ErrorIcon} from 'assets';

/**
 * Tab component rendering as a radio button
 * @param {Boolean} isChecked determines if radio button is selected or not
 * @param {String} text button text
 * @param {Function} onTabPress click event
 * @returns button
 */
const PlanCompliance = ({complianceType}) => {
  const dispatch = useDispatch();
  const [complianceData, setComplianceData] = useState();
  /**
   * Fetch complaince rules list
   */
  useEffect(() => {
    dispatch(
      fetchPlanComplianceCreator({
        staffPositionid: 2,
      }),
    );
  }, [dispatch]);

  const complianceRules = useSelector(
    planComplianceSelector.allComplianceRules(),
  );

  useEffect(() => {
    console.log('rules', complianceRules);
    setComplianceData(complianceRules);
  }, [complianceRules]);

  const {colors} = useTheme();

  const renderRules = () => {
    return (complianceData?.rules || []).map(rule => {
      return (
        <View style={styles.rulesContainerSub}>
          <View style={styles.complianceIcon}>
            <ErrorIcon width={12} height={12} />
          </View>
          <View style={styles.rule}>
            <View>
              <Label variant={LabelVariant.label} style={styles.title}>
                {rule.ruleValue} {rulesMapping[rule.ruleShortName].title}
              </Label>
            </View>
            <View>
              <Label variant={LabelVariant.label} style={styles.subtitle}>
                {rulesMapping[rule.ruleShortName].subTitle}
              </Label>
            </View>
          </View>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progressContainer,
          complianceData?.totalPercent === 100
            ? styles.completedComplaince
            : styles.inProgressComplaince,
        ]}>
        <Label variant={LabelVariant.h1} style={styles.percentage}>
          {complianceData?.totalPercent} %
        </Label>
        <ProgressBar
          progress={complianceData?.totalPercent / 100}
          color={'white'}
        />
      </View>
      <View style={styles.rulesContainer}>
        <Label variant={LabelVariant.h6} style={styles.rulesTitle}>
          {Strings.tourPlanRules}
        </Label>
        {renderRules()}
      </View>
    </View>
  );
};

PlanCompliance.propTypes = {
  isChecked: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onTabPress: PropTypes.func,
};

export default PlanCompliance;
