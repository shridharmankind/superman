import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Calendar} from 'react-native-calendars';
import {DailyView} from 'components/widgets';
import theme from 'themes';
/**
 * Render Monthly View Calendar created using
 * react-native-calendars.View is rendered
 * according to selected Month. To show daily status
 * DayComponent can be passed via prop
 */

const getCurrentData = (year, month, date = '01') => {
  return year && month ? `${year}-${month}-${date}` : new Date();
};
const MonthlyView = ({
  workingDays = [],
  DayComponent = DailyView,
  previousMonthSelected,
  monthSelected,
  year,
}) => {
  const textInput = React.useRef(null);
  useEffect(() => {
    if (monthSelected) {
      textInput.current.addMonth(monthSelected - previousMonthSelected);
    }
  }, [monthSelected, previousMonthSelected]);
  return (
    <Calendar
      current={() => getCurrentData(year, monthSelected)}
      ref={textInput}
      hideArrows={true}
      style={{backgroundColor: theme.colors.white}}
      theme={{
        textMonthFontSize: 18,
        //for web inline style applied
        'stylesheet.calendar.header': {
          week: {
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderBottomWidth: 1,
            borderColor: theme.colors.grey[100],
          },
          dayHeader: {
            marginTop: 2,
            marginBottom: 7,
            textAlign: 'center',
            textTransform: 'uppercase',
            fontFamily: theme.fonts.fontRegular,
            color: theme.colors.grey[500],
          },
        },
        'stylesheet.calendar.main': {
          week: {
            margin: 0,
            padding: 0,
            flexDirection: 'row',
            borderRightWidth: 1,
            borderColor: theme.colors.grey[100],
            justifyContent: 'space-around',
          },
        },
      }}
      dayComponent={props => (
        <DayComponent
          props={props}
          selectedMonth={monthSelected}
          workingDays={workingDays}
        />
      )}
      renderHeader={() => null}
      firstDay={1}
    />
  );
};

export default MonthlyView;

MonthlyView.propTypes = {
  DayComponent: PropTypes.element,
};
