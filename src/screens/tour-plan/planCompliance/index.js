import React, {useEffect, useState} from 'react';
import {ProgressBar, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import styles from './styles';
import {Label, LabelVariant} from 'components/elements';
import {Strings} from 'common';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPlanComplianceCreator, planComplianceSelector} from './redux';
import {rulesMapping} from './rulesMapping';
import {ErrorIcon, Complaint} from 'assets';

/**
 * Tab component rendering as a radio button
 * @param {Boolean} isChecked determines if radio button is selected or not
 * @param {String} text button text
 * @param {Function} onTabPress click event
 * @returns button
 */
const PlanCompliance = ({type}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [complianceData, setComplianceData] = useState();
  /**
   * Fetch complaince rules list
   */
  useEffect(() => {
    dispatch(
      fetchPlanComplianceCreator({
        staffPositionId: 2,
        type,
      }),
    );
  }, [dispatch, type]);

  /**
   * fetch data from selector
   */
  const complianceRules = useSelector(
    planComplianceSelector.allComplianceRules(),
  );

  /**
   * effect to set fetched data in state
   */
  useEffect(() => {
    setComplianceData(complianceRules[type]);
  }, [complianceRules, type]);

  /**
   * function to render UI of rules
   * @returns jsx of rules UI
   */
  const renderRules = () => {
    return (complianceData?.rules || []).map(rule => {
      return (
        <View key={rule.ruleID} style={styles.rulesContainerSub}>
          <View style={styles.complianceIcon}>
            {rule.isCompliant ? (
              <Complaint width={12} height={12} />
            ) : (
              <ErrorIcon width={12} height={12} />
            )}
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

  if (!complianceData) {
    return null;
  }
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
          color={colors.white}
        />
      </View>
      <View style={styles.rulesContainer}>
        <View style={styles.header}>
          <Label
            variant={LabelVariant.h6}
            style={styles.rulesTitle}
            isCapitalise={true}>
            {type}{' '}
          </Label>
          <Label variant={LabelVariant.h6} style={styles.rulesTitle}>
            {Strings.tourPlanRules}
          </Label>
        </View>
        {renderRules()}
      </View>
    </View>
  );
};

export default PlanCompliance;
