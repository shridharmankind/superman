import * as React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import {Label} from 'components/elements';
import {Constants} from 'common';
import styles from './styles';

/** Render Week View
 * @param {Array} workingDays represents the  data for row header
 * @param {Array} columnHeader represents the  data for col header
 * @param {Object} weekData Data for all cells
 */
const WeekView = ({workingDays, columnHeader, weekData = {}}) => {
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
  const getCellData = (weekData, column, row) =>
    Object.keys(weekData).length && weekData[column][row];

  /**
   * Renders data of each cell
   * @param {cellData} represnt cell info
   */
  const renderCellData = cellData => (
    <>
      <View style={[styles.cellHeader, styles.flexSpaceBetweenView]}>
        <Label title="" />
      </View>

      <View style={[styles.cellFooter, styles.flexSpaceBetweenView]}>
        <Label title="" />
      </View>
    </>
  );

  /**
   * @param {*} rowHeader
   * @param {fn} onPress
   * @param {Boolean} isLast
   * @param {string} header
   */
  const Cell = ({rowHeader, onPress, isLast, header}) => (
    <View
      style={[
        styles.cellContainer,
        styles.flexCenterView,
        isLast && styles.lastCell,
      ]}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.flexFullSpace, styles.flexSpaceBetweenView]}>
        {renderCellData(getCellData(weekData, header, rowHeader))}
      </TouchableOpacity>
    </View>
  );

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
        header={header}
        key={index}
        isLast={isLast}
        rowHeader={rowHeader}
        onPress={() => console.log('a')}
      />
    ));

  /**
   * Render vertical header
   * @param {string} label represents column  header
   */
  const VerticalHeader = ({label}) => (
    <View style={[styles.VerticalHeader, styles.flexCenterView]}>
      <Label
        isUpperCase={true}
        style={[styles.textCenterAlign]}
        title={label.substring(0, Constants.maxDaysLength)}
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
    label.map((value, index) => {
      return (
        <Label
          key={index}
          isUpperCase={true}
          title={value}
          style={[
            styles.textCenterAlign,

            index === 0 ? styles.VerticalHeader : styles.flexFullSpace,
          ]}
        />
      );
    });

  return (
    <View style={styles.weekViewContainer}>
      <View style={styles.headerContainer}>
        <Header label={headerData} />
      </View>
      <View style={[styles.rowConatiner]}>
        <Rows rows={workingDays} />
      </View>
    </View>
  );
};

WeekView.propTypes = {
  workingDays: PropTypes.array.isRequired,
  columnHeader: PropTypes.array,
  weekData: PropTypes.object,
};

export default WeekView;
