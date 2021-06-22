import React, {useEffect, useState} from 'react';
import {ProgressBar, useTheme} from 'react-native-paper';
import {View} from 'react-native';
import styles from './styles';
import {Label, LabelVariant} from 'components/elements';
import {Strings} from 'common';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPlanComplianceCreator,
  planComplianceActions,
  planComplianceSelector,
} from './redux';
import {rulesMapping} from './rulesMapping';
import {ErrorIcon, Complaint} from 'assets';
import {getComparisonResult} from 'screens/tourPlan/helper';
import {translate} from 'locale';
import {COMPLAINCE_TYPE} from 'screens/tourPlan/constants';
/**
 * Tab component rendering as a radio button
 * @param {Boolean} isChecked determines if radio button is selected or not
 * @param {String} text button text
 * @param {Function} onTabPress click event
 * @returns button
 */
const PlanCompliance = ({type, selectedData, week, weekDay}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [complianceData, setComplianceData] = useState();
  /**
   * Fetch complaince rules list
   */
  useEffect(() => {
    dispatch(
      fetchPlanComplianceCreator({
        staffPositionId: 1,
        week,
        weekDay,
        type,
      }),
    );
  }, [dispatch, type, week, weekDay]);

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
   *
   * @param {Boolean} isCompliant
   * @returns  Icon on basis of complain check
   */
  const renderIcon = isCompliant => {
    return isCompliant ? (
      <Complaint width={12} height={12} />
    ) : (
      <ErrorIcon width={12} height={12} />
    );
  };

  /**
   * @param {object} ruleMapping object of rule Mapping
   * @param {object} rule defines rule
   * @returns  check complaint and render icon
   */
  const getComplaintCheck = (rule, ruleMapping) => {
    const {checkType, key, showWarningMessage} = ruleMapping;
    if (type === COMPLAINCE_TYPE.MONTHLY || !checkType) {
      return renderIcon(rule?.isCompliant);
    }

    if (checkType && type === COMPLAINCE_TYPE.DAILY) {
      const isCompliant = getComparisonResult(
        selectedData[key],
        rule?.ruleValues?.totalCount,
        checkType,
      );
      if (showWarningMessage && checkType && type === COMPLAINCE_TYPE.DAILY) {
        if (!isCompliant) {
          dispatch(
            planComplianceActions.collectWarningOnRules({
              rule: ruleMapping,
              operation: 'push',
            }),
          );
        } else {
          dispatch(
            planComplianceActions.collectWarningOnRules({
              rule: ruleMapping,
              operation: 'pop',
            }),
          );
        }
      }
      return renderIcon(isCompliant);
    }
  };

  /**
   *
   * @param {Object} ruleValues
   * @param {Object} ruleMapping
   * @returns the value to render on basis of actual and covered data
   */
  const getActulaValue = (rule, ruleMapping) => {
    const {ruleValues} = rule;
    if (!ruleValues) {
      return;
    }
    if (type === COMPLAINCE_TYPE.MONTHLY) {
      return `${ruleValues.coveredCount}/${ruleValues.totalCount}`;
    }
    if (type === COMPLAINCE_TYPE.DAILY) {
      const {key, isDayCheck} = ruleMapping;

      return isDayCheck
        ? `${selectedData[key]}/${rule?.visitDays[0].count}`
        : `${selectedData[key]}/${ruleValues.totalCount}`;
    }
  };

  /**
   * function to render UI of rules
   * @returns jsx of rules UI
   */
  const renderRules = () => {
    return (complianceData?.rules || []).map(rule => {
      const ruleMappingValue = rulesMapping[rule.rulesShortName];
      if (!ruleMappingValue) {
        return;
      }
      return (
        <View key={rule.ruleID} style={styles.rulesContainerSub}>
          <View style={styles.complianceIcon}>
            {getComplaintCheck(rule, ruleMappingValue)}
          </View>
          <View style={styles.rule}>
            <View>
              <Label variant={LabelVariant.label} style={styles.title}>
                {ruleMappingValue?.showFraction
                  ? getActulaValue(rule, ruleMappingValue)
                  : rule.ruleValues.totalCount}{' '}
                {translate(ruleMappingValue.title)}
              </Label>
            </View>
            <View>
              <Label variant={LabelVariant.label} style={styles.subtitle}>
                {translate(ruleMappingValue.subTitle, {
                  xValue: rule.ruleValues.xValue,
                })}
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
          {complianceData?.totalPercent?.toFixed(2)} %
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
