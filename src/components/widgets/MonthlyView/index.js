import React from 'react';
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
const MonthlyView = ({DayComponent = DailyView}) => {
  return (
    <Calendar
      hideArrows={true}
      style={{backgroundColor: 'white'}}
      theme={{
        //for web inline style applied
        'stylesheet.calendar.header': {
          week: {
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderBottomWidth: 1,
            borderColor: theme.colors.grey[100],
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
      dayComponent={props => <DayComponent props={props} />}
      renderHeader={() => null}
    />
  );
};

export default MonthlyView;

MonthlyView.propTypes = {
  DayComponent: PropTypes.element,
};
