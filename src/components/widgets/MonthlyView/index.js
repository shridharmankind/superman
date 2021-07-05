import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Calendar} from 'react-native-calendars';
import {DailyView} from 'components/widgets';
import theme from 'themes';
import {getMonthDiff, getDateFromMonthYear} from 'utils/dateTimeHelper';
import {ActivityIndicator} from 'components/elements';
import {FetchEnumStatus} from 'reducers';
import {appSelector} from 'selectors';

/**
 * Render Monthly View Calendar created using
 * react-native-calendars.View is rendered
 * according to selected Month. To show daily status
 * DayComponent can be passed via prop
 */
const MonthlyView = ({
  workingDays = [],
  monthSelected,
  previousMonthSelected,
  monthlyCalendarData,
  DayComponent = DailyView,
}) => {
  const textInput = React.useRef(null);
  const currentDate = getDateFromMonthYear(monthSelected);
  const fetchState = useSelector(appSelector.makeGetAppFetch());
  // effect to update month on change of date
  useEffect(() => {
    if (currentDate && previousMonthSelected) {
      const previousDate = getDateFromMonthYear(previousMonthSelected);

      textInput.current.addMonth(getMonthDiff(currentDate, previousDate));
    }
  }, [currentDate, previousMonthSelected]);
  return (
    <>
      {fetchState === FetchEnumStatus.FETCHING && <ActivityIndicator />}
      <Calendar
        current={currentDate}
        ref={textInput}
        hideArrows={true}
        testID={'calendar-monthly-view-test'}
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
              fontSize: 12.7,
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
            selectedMonth={monthSelected?.month}
            workingDays={workingDays}
            monthlyCalendarData={monthlyCalendarData}
          />
        )}
        renderHeader={() => null}
        firstDay={1}
      />
    </>
  );
};

export default MonthlyView;

MonthlyView.propTypes = {
  DayComponent: PropTypes.element,
};
