import * as React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import {Label, LabelVariant} from 'components/elements';
import styles from './styles';
import theme from 'themes';
import {DoctorTag, DivisionType} from 'components/widgets';
import {LocationIcon, ErrorIcon} from 'assets';
import {Strings} from 'common';
import {getPartyTitle} from 'screens/tourPlan/helper';

/**
 * @param {Object} patchData
 * @returns patch name string
 */
const getPatchName = patchData => {
  const {isExStation, displayName = ''} = patchData;
  return isExStation ? `(${Strings.exStation}) ${displayName}` : displayName;
};

// max number of character for Days to show
const maxDaysLength = 3;

/** Render Week View
 * @param {Array} workingDays represents the  data for row header
 * @param {Array} columnHeader represents the  data for col header
 * @param {Object} weekData Data for all cells
 * @param {Function} onPressHandler Handles cell click
 */
const WeekView = ({workingDays, columnHeader, onPressHandler, weekData}) => {
  const headerData = ['', ...columnHeader];

  /**
   * Returns whether the value is last element or not
   * @param {number} length length of array
   * @param {number} index  index of current value
   * @returns  Boolean
   */
  const isLastElement = (length, index) => length - index === 1;

  /**
   * Returns value from data on basic of row and column value
   * @param {Object} weekData Data  for week
   * @param {string} column column key
   * @param {string} row row key
   */
  const getCellData = (data, column, row) =>
    data &&
    data.length &&
    data.filter(item => item.week === column && item.weekDay === row)[0];

  /**
   * Renders data of each cell
   * @param {cellData} represnt cell info
   */
  const renderCellData = cellData => {
    if (!cellData) {
      return;
    }
    const {
      parties,
      noOfKyc,
      patch,
      isCompliant,
      noOfCampaign = null,
    } = cellData;

    return (
      <View style={styles.cellDataContainer}>
        <View style={[styles.cellHeader, styles.flexSpaceBetweenView]}>
          <View style={styles.flexDirectionRow}>
            <Label
              title={parties && getPartyTitle(parties)}
              variant={LabelVariant.h5}
            />
            {!isCompliant && <ErrorIcon width={20} height={20} />}
          </View>
          <View style={styles.divisionContainer}>
            {noOfCampaign ? (
              <DoctorTag
                division={DivisionType.CAMPAIGN}
                title={`${noOfCampaign} ${DivisionType.CAMPAIGN}`}
              />
            ) : null}
            {noOfKyc ? (
              <DoctorTag
                division={DivisionType.KYC}
                title={`${noOfKyc} ${DivisionType.KYC}`}
              />
            ) : null}
          </View>
        </View>

        <View style={[styles.cellFooter]}>
          <LocationIcon width={16} height={16} />
          <Label
            variant={LabelVariant.label}
            title={getPatchName(patch)}
            numberOfLines={1}
            style={styles.locationLabelText}
            textColor={theme.colors.grey[900]}
          />
        </View>
      </View>
    );
  };

  /**
   * @param {String} rowHeader
   * @param {fn} onPress
   * @param {Boolean} isLast
   * @param {string} header
   */
  const Cell = ({rowHeader, onPress, isLast, header, testID}) => {
    const cellData = getCellData(weekData, header, rowHeader);

    return (
      <View
        testID={testID}
        style={[styles.cellContainer, isLast && styles.lastCell]}>
        {cellData?.patch?.isNoOfVisitHigh && (
          <Label style={styles.highVisitBar} title="" />
        )}
        <TouchableOpacity
          style={[styles.cellBorder]}
          testID="button_weekView_cell_test"
          onPress={onPress}>
          {renderCellData(cellData)}
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Renders individual row content
   * It consit of cells whic are based on columnHeader count
   * @param {Boolean} isLast
   * @param {String} rowHeader
   *
   */
  const Row = ({isLast, rowHeader}) =>
    columnHeader.map((header, index) => (
      <Cell
        testID={`${header}-${index}-test`}
        header={header}
        key={index}
        isLast={isLast}
        rowHeader={rowHeader}
        onPress={() => onPressHandler(header, rowHeader)}
      />
    ));

  /**
   * Render vertical header
   * @param {string} label represents column  header
   */
  const VerticalHeader = ({label}) => (
    <View style={[styles.verticalHeader, styles.flexCenterView]}>
      <Label
        testID="label_weekView_verticalHeader_test"
        variant={LabelVariant.body}
        textColor={theme.colors.grey[200]}
        isUpperCase={true}
        style={[styles.textAlignStart]}
        title={label.substring(0, maxDaysLength)}
      />
    </View>
  );

  /**
   * Render rows and rows header - days repreneny individual row header
   * @param {Array} rows data representing rows info
   */
  const Rows = ({rows}) => {
    const rowCount = rows.length;
    return rows.map((rowLabel, index) => {
      return (
        <View key={index} style={styles.row}>
          <VerticalHeader label={rowLabel} />
          <Row rowHeader={rowLabel} isLast={isLastElement(rowCount, index)} />
        </View>
      );
    });
  };

  /**
   * Render  header of table
   * @param {string} label represents name of label
   */
  const Header = ({label}) =>
    label?.map((_, index) => {
      return (
        <Label
          key={index}
          variant={LabelVariant.body}
          textColor={theme.colors.grey[200]}
          testID="label_weekView_header_test"
          isUpperCase={true}
          title={index !== 0 && `${Strings.weekText} ${index}`}
          style={[
            styles.textCenterAlign,
            index === 0 ? styles.verticalHeader : styles.flexFullSpace,
          ]}
        />
      );
    });

  return (
    <View>
      <View style={styles.headerContainer}>
        <Header label={headerData} />
      </View>
      <View style={[styles.rowContainer]}>
        <Rows rows={workingDays} />
      </View>
    </View>
  );
};

WeekView.propTypes = {
  workingDays: PropTypes.array.isRequired,
  columnHeader: PropTypes.array.isRequired,
  weekData: PropTypes.array,
  onPressHandler: PropTypes.func,
};

export default React.memo(WeekView);
