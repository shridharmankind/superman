import * as React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity} from 'react-native';
import {Label} from 'components/elements';
import styles from './styles';

const maxDaysLength = 3;
/** Render Week View
 * @param {Array} workingDays represents the  data for row header
 * @param {Array} columnHeader represents the  data for col header
 * @param {Object} weekData Data for all cells
 */
const WeekView = ({
  workingDays,
  columnHeader,
  onPressHandler,
  weekData = {},
}) => {
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
    Object.keys(data).length && weekData[column][row];

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
        testID="button_weekView_cell_test"
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
    label.map((value, index) => {
      return (
        <Label
          key={index}
          testID="label_weekView_header_test"
          isUpperCase={true}
          title={value}
          style={[
            styles.textCenterAlign,
            index === 0 ? styles.verticalHeader : styles.flexFullSpace,
          ]}
        />
      );
    });

  return (
    <View style={styles.container}>
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
  weekData: PropTypes.object,
  onPressHandler: PropTypes.func,
};

export default WeekView;
