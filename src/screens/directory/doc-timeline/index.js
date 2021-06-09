import React from 'react';
import {Timeline} from 'components/widgets';
import {Label, LabelVariant} from 'components/elements';
import {Strings} from 'common';
import {View} from 'react-native';
import styles from './styles';
import {getFormatDate, startOf, isAfter} from 'utils/dateTimeHelper';
import {List} from 'react-native-paper';
import {DoctorVisit, MissedVisit} from 'assets';

const isCompleted = item => {
  const today = startOf(new Date());
  return isAfter(today, item.date);
};

const getDateContainerStyle = item => {
  const style = [styles.timelineDateContainer];
  if (item.isMissed) {
    style.push(styles.timelineDateContainerMissed);
  } else if (isCompleted(item)) {
    style.push(styles.timelineDateContainerCompleted);
  }
  return style;
};

const getDateStyle = item => {
  const style = [styles.timelineDate];
  if (item.isMissed) {
    style.push(styles.timelineDateMissed);
  } else if (isCompleted(item)) {
    style.push(styles.timelineDateCompleted);
  }
  return style;
};

const getMonthStyle = item => {
  const style = [styles.timelineMonth];
  if (item.isMissed) {
    style.push(styles.timelineMonthMissed);
  } else if (isCompleted(item)) {
    style.push(styles.timelineMonthCompleted);
  }
  return style;
};

function renderItemDetails(item) {
  if (item.isMissed) {
    return (
      <View style={[styles.itemDetailsSection, styles.itemDetailsContainer]}>
        <Label
          variant={LabelVariant.bodySmall}
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </View>
    );
  } else if (isCompleted(item)) {
    return (
      <View style={[styles.itemDetailsContainer]}>
        <View style={[styles.itemDetailsSection]}>
          <Label style={[styles.itemDetailsTitle]} title="Samples Given" />
          <Label
            variant={LabelVariant.bodySmall}
            title="Amlokind, Cevakind, Telmekind"
          />
        </View>
        <View style={[styles.itemDetailsSection]}>
          <Label style={[styles.itemDetailsTitle]} title="Samples Requested" />
          <Label
            variant={LabelVariant.bodySmall}
            title="Amlokind AT, Gudacef"
          />
        </View>
        <View style={[styles.itemDetailsSection]}>
          <Label style={[styles.itemDetailsTitle]} title="Items Given" />
          <Label
            variant={LabelVariant.bodySmall}
            title="Booklet, Pens, Diary, Calendar"
          />
        </View>
        <View style={[styles.itemDetailsSection]}>
          <Label style={[styles.itemDetailsTitle]} title="Items Requested" />
          <Label
            variant={LabelVariant.bodySmall}
            title="Faceshields(2), Masks(12), Sanitizer(4)"
          />
        </View>
        <View style={[styles.itemDetailsSection]}>
          <Label style={[styles.itemDetailsTitle]} title="Visit Notes" />
          <Label
            variant={LabelVariant.bodySmall}
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={[styles.itemDetailsSection, styles.itemDetailsContainer]}>
        <Label
          variant={LabelVariant.bodySmall}
          title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </View>
    );
  }
}

function renderItem(item, index) {
  return (
    <View style={[styles.timelineItem]}>
      <List.Accordion
        title={item.title}
        titleStyle={[styles.timelineItemTitle]}
        style={[styles.timelineItemAccordion]}
        left={props => {
          if (item.isMissed) {
            return (
              <DoctorVisit
                style={[styles.timelineItemIcon]}
                height={20}
                width={20}
              />
            );
          }
          return (
            <DoctorVisit
              style={[styles.timelineItemIcon]}
              height={20}
              width={20}
            />
          );
        }}>
        {renderItemDetails(item)}
      </List.Accordion>
    </View>
  );
}

function renderDate(item, index) {
  return (
    <View style={getDateContainerStyle(item)}>
      <Label
        testID="timeline-date"
        title={getFormatDate({date: item.date, format: 'DD'})}
        style={getDateStyle(item)}
      />
      <Label
        testID="timeline-month"
        title={getFormatDate({date: item.date, format: 'MMM'})}
        style={getMonthStyle(item)}
      />
    </View>
  );
}

const DocTimeline = () => {
  const data = [
    {
      id: 4,
      date: '2021-06-11T05:00:00',
      isMissed: false,
      title: 'Upcoming Doctor Visit',
    },
    {
      id: 4,
      date: '2021-06-10T05:00:00',
      isMissed: false,
      title: 'Upcoming Doctor Visit',
    },
    {
      id: 4,
      date: '2021-06-07T05:00:00',
      isMissed: true,
      title: 'Missed call',
    },
    {
      id: 4,
      date: '2021-06-01T05:00:00',
      isMissed: false,
      title: 'Visit for Amlokind AT and Neurokind',
    },
    {
      id: 4,
      date: '2021-05-30T05:00:00',
      isMissed: false,
      title: 'Visit for Amlokind AT and Neurokind',
    },
  ];

  return (
    <View style={[styles.timelineWrapper]}>
      <Label
        testID="timeline-year"
        variant={LabelVariant.h4}
        title={getFormatDate({date: new Date(), format: 'YYYY'})}
        style={[styles.timelineYear]}
      />
      <View style={[styles.timelineScrollContainer]}>
        <Timeline
          style={[styles.timeline]}
          data={data}
          renderItem={renderItem}
          renderDate={renderDate}
        />
      </View>
    </View>
  );
};

export default DocTimeline;
