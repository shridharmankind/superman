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
import {appSelector} from 'selectors';
import {rulesMapping} from './rulesMapping';
import {ErrorIcon, Complaint} from 'assets';
import {getComparisonResult} from 'screens/tourPlan/helper';
import {translate} from 'locale';
import {
  COMPLAINCE_TYPE,
  RULE_KEY,
  ARRAY_OPERATION,
  COMPARISION_TYPE,
} from 'screens/tourPlan/constants';

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
  const staffPositionId = useSelector(appSelector.getStaffPositionId());
  const gapRuleErrorCode = useSelector(
    planComplianceSelector.getGapRuleError(),
  );
  const [gapRuleCode, setGapRuleCode] = useState();
  /**
   * Fetch complaince rules list
   */
  useEffect(() => {
    staffPositionId &&
      dispatch(
        fetchPlanComplianceCreator({
          staffPositionId,
          week,
          weekDay,
          type,
        }),
      );
  }, [dispatch, type, week, weekDay, staffPositionId]);

  useEffect(() => {
    setGapRuleCode(gapRuleErrorCode);
  }, [gapRuleErrorCode]);
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
    if (type === COMPLAINCE_TYPE.DAILY) {
      if (checkType === COMPARISION_TYPE.MINGAP) {
        const compliantCheckForMinGap =
          gapRuleCode !== null && gapRuleCode === ruleMapping?.errorCode;
        return renderIcon(!compliantCheckForMinGap);
      } else if (checkType) {
        const isCompliant = getComparisonResult(
          key === RULE_KEY.AREA
            ? selectedData[key] ?? rule?.ruleValues?.coveredCount
            : selectedData[key],
          rule?.ruleValues?.totalCount,
          checkType,
        );
        if (showWarningMessage && checkType) {
          if (!isCompliant) {
            dispatch(
              planComplianceActions.collectWarningOnRules({
                rule: ruleMapping,
                operation: ARRAY_OPERATION.PUSH,
              }),
            );
          } else {
            dispatch(
              planComplianceActions.collectWarningOnRules({
                rule: ruleMapping,
                operation: ARRAY_OPERATION.POP,
              }),
            );
          }
        }
        return renderIcon(isCompliant);
      }
    }
  };
  /**
   *
   * @param {Object} visitDays
   * @returns
   */
  const getDayData = visitDays => {
    return visitDays.filter(
      item => item.weekNumber === week && item.weekDay === weekDay,
    )[0]?.count;
  };

  const getSelectedCount = (key, ruleValues) => {
    if (key === RULE_KEY.AREA) {
      return selectedData[key] ?? ruleValues?.coveredCount;
    } else {
      return selectedData[key];
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
        ? `${getDayData(rule?.visitDays, ruleValues?.coveredCount)}/${
            ruleValues.totalCount
          }`
        : `${getSelectedCount(key, ruleValues)}/${ruleValues.totalCount}`;
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
                {ruleMappingValue.title && translate(ruleMappingValue.title)}
              </Label>
            </View>
            <View>
              <Label variant={LabelVariant.label} style={styles.subtitle}>
                {translate(ruleMappingValue.subTitle, {
                  xValue: rule?.ruleValues?.xValue,
                })}
              </Label>
            </View>
          </View>
        </View>
      );
    });
  };

  /**
   *
   * @returns render component when complaince data available
   */
  const render = () => {
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
            {Number.isInteger(complianceData?.totalPercent)
              ? complianceData?.totalPercent
              : complianceData?.totalPercent?.toFixed(2)}{' '}
            %
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

  return !complianceData || !Object.values(complianceData)?.length
    ? null
    : render();
};

export default React.memo(PlanCompliance);
