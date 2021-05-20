import React from 'react';
import PropTypes from 'prop-types';
import {Calendar} from 'react-native-calendars';
import {DailyView} from 'components/widgets';
import styles from './styles';
/**
 * Render Monthly View Calendar created using
 * react-native-calendars.View is rendered
 * according to selected Month.It nest of DailyView
 * container.
 */
const MonthlyView = () => {
  return (
    <Calendar
      style={styles.calendarContainer}
      hideArrows={true}
      theme={{
        //for web fix doing inline style
        'stylesheet.calendar.main': {
          week: {
            margin: 0,
            padding: 0,
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderLeftWidth: 1,
          },
        },
      }}
      dayComponent={props => <DailyView props={props} />}
      renderHeader={() => null}
    />
  );
};

export default MonthlyView;

MonthlyView.defaultProps = {};
MonthlyView.propTypes = {};
