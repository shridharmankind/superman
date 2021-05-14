import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

/**
 *
 * @param {*} param0
 * @returns
 */

const STP_DATA = {
  week1: {
    mon: {title: 'mon', visits: '13 visits', kyc: '7 kyc'},
    tue: {title: 'tue', visits: '14 visits', kyc: '73kyc'},
    wed: {title: 'wed'},
    thrs: {title: 'thrs'},
    fri: {title: 'fri'},
    sat: {title: 'sat'},
  },
  week2: {
    mon: {title: 'mon'},
    tue: {title: 'tue'},
    wed: {title: 'wed'},
    thrs: {title: 'thrs'},
    fri: {title: 'fri'},
    sat: {title: 'sat'},
  },
  week3: {
    mon: {title: 'mon'},
    tue: {title: 'tue'},
    wed: {title: 'wed'},
    thrs: {title: 'thrs'},
    fri: {title: 'fri'},
    sat: {title: 'sat'},
  },
  week4: {
    mon: {title: 'mon'},
    tue: {title: 'tue'},
    wed: {title: 'wed'},
    thrs: {title: 'thrs'},
    fri: {title: 'fri'},
    sat: {title: 'sat'},
  },
};

const WeekView = () => {
  const workingWeek = ['Mon', 'Tue', 'Wed', 'Thrs', 'Fri', 'Sat'];
  const headerKeys = [...Object.keys(STP_DATA)];
  const headerData = ['', ...headerKeys];

  const isLastElement = (length, index) => length - index === 1;

  const Column = ({rowHeader, onPress, isLast, header}) => {
    let cellData = STP_DATA[header][rowHeader];
    return (
      <View
        style={[
          styles.cellContainer,
          styles.flexCenterView,
          isLast && styles.lastCell,
        ]}>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.flexFullSpace, styles.flexSpaceBetweenView]}>
          <View style={[styles.cellHeader, styles.flexSpaceBetweenView]}>
            <Text>{cellData?.visits}</Text>
            <Text>{cellData?.kyc}</Text>
          </View>

          <View style={[styles.cellFooter, styles.flexSpaceBetweenView]}>
            <Text>{cellData?.visits}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * Render vertical header
   * @param {*} param0
   * @returns
   */
  const VerticalHeader = ({data}) => (
    <View style={[styles.VerticalHeader, styles.flexCenterView]}>
      <Text>{data}</Text>
    </View>
  );

  /**
   * Render row header
   * @param {*} param0
   * @returns
   */
  const RowHeader = ({data}) =>
    data.map((rowData, index) => {
      return (
        <Text
          key={index}
          style={[
            styles.textCenterAlign,
            styles.upperCaseText,
            index === 0 ? styles.VerticalHeader : styles.flexFullSpace,
          ]}>
          {rowData}
        </Text>
      );
    });

  /**
   *
   * @param {String} rowIndex
   * @returns
   */
  const ColumnList = ({isLast, rowHeader}) =>
    headerKeys.map((header, index) => (
      <Column
        rowHeader={rowHeader.toLowerCase()}
        header={header}
        key={index}
        isLast={isLast}
        onPress={() => console.log('a')}
      />
    ));

  /**
   * Render Row using rowData
   * @param {Array} rows
   * @returns
   */
  const Row = ({rows}) =>
    rows.map((rowData, index) => {
      return (
        <View key={index} style={styles.row}>
          <VerticalHeader data={rowData} />
          <ColumnList
            rowHeader={rowData}
            isLast={isLastElement(rows.length, index)}
          />
        </View>
      );
    });

  return (
    <View style={styles.weekViewContainer}>
      <View style={styles.header}>
        <RowHeader data={headerData} />
      </View>
      <View style={[styles.rowConatiner]}>
        <Row rows={workingWeek} />
      </View>
    </View>
  );
};

export default WeekView;
