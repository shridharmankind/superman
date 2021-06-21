import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Label, LabelVariant} from 'components/elements';
import {useDispatch, useSelector} from 'react-redux';
import styles from './style';
import {ArrowUp, Power, ArrowDownRed} from 'assets';
import {Strings} from 'common';
import theme from 'themes';
import {getFormatDate} from 'utils/dateTimeHelper';
import {fetchPriorityProductCreator, productSelector} from './redux';

/**
 * Custom Priority Product component render.
 * This serves the purpose to make the use of prioroty product dynamically
 * @param {Number} staffPostionId postion id
 * @param {Number} partyId party id of particular doctor
 */

const PriorityProduct = ({staffPostionId = 1, partyId}) => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [viewFlag, setViewFlag] = useState(true);
  // dispatching the action
  useEffect(() => {
    dispatch(
      fetchPriorityProductCreator({
        staffPositionID: staffPostionId,
        partyId: partyId,
      }),
    );
  }, [dispatch, partyId, staffPostionId]);
  const priorityProductList = useSelector(
    productSelector.getPriorityProductList(),
  );
  useEffect(() => {
    if (priorityProductList?.length > 4) {
      const result = priorityProductList.slice(0, 4);
      setList(result);
    } else {
      setList(priorityProductList);
    }
  }, [priorityProductList]);

  /**
   * Function to display date
   * @returns date format like 21 May, 2021
   */
  const formatDate = date => {
    const dateValue = getFormatDate({date: date, format: 'DD MMM, YYYY'});
    return dateValue;
  };

  /**
   * Function Display Priority Products behalf of clicking View All and View Less button
   */
  const viewAllHandler = () => {
    setViewFlag(!viewFlag);
    if (list.length === 4) {
      setList(priorityProductList);
    } else {
      const result = priorityProductList.slice(0, 4);
      setList(result);
    }
  };

  /**
   * Function to render the Product Card
   * @returns a Card with Product Detail
   */
  const product = data => {
    return (
      <View style={[styles.cardMainContainer]} key={data.id}>
        <View
          style={[
            styles.cardContainer,
            data.isFocused || data.isPowered ? styles.cardBackground : '',
          ]}>
          <View style={styles.headerProduct}>
            <View style={styles.cardHeaderTitle}>
              <Label
                variant={LabelVariant.subtitleSmall}
                style={styles.labelTitle}
                title={data.name}
              />
            </View>
            {data.isPowered && (
              <View style={styles.powerIcon}>
                <Power width={15} height={15} style={styles.power} />
              </View>
            )}
            {data.isFocused && (
              <View style={styles.focus}>
                <Label
                  variant={LabelVariant.label}
                  style={styles.focusLabel}
                  title={Strings.priorityProductCard.foc}
                />
              </View>
            )}
            {data.priority && (
              <View style={styles.cardHeaderRightTitle}>
                <Label
                  style={styles.priorityLabel}
                  title={'P' + data.priority}
                />
              </View>
            )}
          </View>
          <View style={styles.cardDetail}>
            <Label
              variant={LabelVariant.bodySmall}
              textColor={theme.colors.grey[1100]}
              style={styles.labelSubHeader}
              title={
                Strings.priorityProductCard.description +
                (data.detailedOn ? formatDate(data.detailedOn) : '')
              }
            />
          </View>
          <View style={styles.cardDetail}>
            <View style={styles.ratioClass}>
              <Label
                style={[
                  styles.progressText,
                  !data.prescription ? styles.colorGrey : '',
                ]}
                title={
                  data.prescription
                    ? data.prescription
                    : Strings.priorityProductCard.na
                }
              />
              <Label
                style={[
                  styles.progressLightText,
                  !data.prescription ? styles.colorGrey : '',
                ]}
                title={'/' + data.totalPrescription}
              />
            </View>
            {!data.prescription && (
              <View style={styles.headerProduct}>
                <Label
                  variant={LabelVariant.body}
                  style={styles.conductRcpaLabel}
                  title={Strings.priorityProductCard.conductRcpa}
                />
              </View>
            )}
            {!!data.prescription && (
              <View style={styles.gxClass}>
                <ArrowUp style={styles.arrowUp} width={14} height={14} />
                <Label style={styles.percentageText} title={data.rx + '%'} />
                <Label
                  variant={LabelVariant.label}
                  style={styles.gxLabel}
                  title={Strings.priorityProductCard.gx}
                />
              </View>
            )}
            {!!data.prescription && (
              <View style={styles.gxClass}>
                {data.isGrowthIncrease ? (
                  <ArrowUp style={styles.arrowUp} width={14} height={14} />
                ) : (
                  <ArrowDownRed style={styles.arrowUp} width={14} height={14} />
                )}
                <Label
                  style={[
                    styles.percentageText,
                    !data.isGrowthIncrease ? styles.colorRed : '',
                  ]}
                  title={data.growth + '%'}
                />
                <Label
                  variant={LabelVariant.label}
                  style={styles.gxLabel}
                  title={Strings.priorityProductCard.sow}
                />
              </View>
            )}
          </View>
          <View>
            <Label
              variant={LabelVariant.label}
              textColor={theme.colors.grey[1100]}
              style={styles.descriptionText}
              title={Strings.priorityProductCard.tabDes?.toUpperCase()}
            />
          </View>
        </View>
      </View>
    );
  };

  /**
   * Function dynamically render the Product Card
   * @returns dynamic Card with Product Detail
   */
  const priorityProduct = () => {
    return (list || []).map(data => {
      return product(data);
    });
  };

  return (
    <>
      <View style={styles.headerProduct}>
        <Label
          variant={LabelVariant.h3}
          style={styles.mainHeader}
          title={Strings.priorityProductCard.header}
        />
      </View>
      <View
        style={[
          styles.cardHeadContainer,
          viewFlag ? styles.cardViewHeight : styles.cardViewAllHeight,
        ]}>
        {priorityProduct()}
      </View>
      {priorityProductList && priorityProductList?.length > 4 && (
        <View>
          <Label
            style={styles.footer}
            variant={LabelVariant.h5}
            onPress={viewAllHandler}
            title={
              viewFlag
                ? Strings.doctorDetail.openTasks.viewAll
                : Strings.doctorDetail.openTasks.viewLess
            }
          />
        </View>
      )}
    </>
  );
};

export default PriorityProduct;
