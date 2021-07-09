/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {Label, LabelVariant} from 'components/elements';
import styles from './styles.web';
import {DailyCell} from 'components/widgets';
import {getDateFromMonthYear, isSameDate,getFormatDate,addDays,startOfDate, endOfDate} from 'utils/dateTimeHelper';
import dayjs from 'dayjs';
import theme from 'themes';

/**./webStyles
 * Render Monthly Web View Calendar created using
 * react-native-calendars.View is rendered
 * according to selected Month. To show daily status
 * DayComponent can be passed via prop
 */
const MonthlyView = ({
  workingDays = [],
  monthSelected,
  monthlyCalendarData,
}) => {
  const currentMonth = new Date(getDateFromMonthYear(monthSelected));
  const onDateClick = day => {};
  /**
   *
   * @returns Days for header
   */
  const renderDays = () => {
    const dateFormat = 'ddd';
    const days = [];
    let startDate =  dayjs(currentMonth).startOf('isoWeek').toDate();


    for (let i = 0; i < 7; i++) {
      days.push(
        <View style={[styles.col, styles.colCenter]} key={i}>
          <Label
            testID="label_weekView_verticalHeader_test"
            variant={LabelVariant.body}
            textColor={theme.colors.grey[200]}
            isUpperCase={true}
            style={styles.dayStyle} title={addDays(startDate,i).format(dateFormat)}/>
        </View>,
      );
    }
    return <View style={[styles.days, styles.row]}>{days}</View>;
  };

  /**
   *
   * @returns cell Data
   */
  const renderCells = () => {
    const monthStart = startOfDate(currentMonth,'month');
    const monthEnd = endOfDate(monthStart,'month');
    const startDate = startOfDate(monthStart,'isoWeek');
    const endDate = endOfDate(monthEnd,'isoWeek');

    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';
    let formattedMonth = '';
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate =   getFormatDate({date:day, format:'D'});
        formattedMonth =  getFormatDate({date:day, format:'M'});

        const cloneDay = day;
        const propsDate = {
          date: {
            day: formattedDate,
            month: formattedMonth,
            dateString: new Date(
              getDateFromMonthYear({
                ...monthSelected,
                date: getFormatDate({date:day, format:'DD'}),
              }),
            ).toString(),
          },
        };
        days.push(
          <View
            style={[
              styles.col,
              styles.cell,
              i === 6 && styles.cellLastchild,
              isSameDate(propsDate.date.dateString) &&
                styles.currentDailyContainer,
            ]}
            key={day}
            onClick={() => onDateClick(cloneDay)}>
            <DailyCell
              props={propsDate}
              selectedMonth={monthSelected?.month}
              workingDays={workingDays}
              monthlyCalendarData={monthlyCalendarData}
              showSameDayContainer={false}
            />
          </View>,
        );
        day = addDays(day,1);
      }
      rows.push(
        <View style={styles.row} key={day}>
          {days}
        </View>,
      );
      days = [];
    }
    return <View>{rows}</View>;
  };

  return (
    <>
      {renderDays()}
      <View style={styles.calendar}>{renderCells()}</View>
    </>
  );
};

export default MonthlyView;
