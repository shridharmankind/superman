import React from 'react';
import {Timeline} from 'components/widgets';
import {Label, LabelVariant} from 'components/elements';
import {Strings} from 'common';
import {View} from 'react-native';
import styles from './doc-timeline.styles';
import {getFormatDate, startOf, isAfter} from 'utils/dateTimeHelper';
import {List} from 'react-native-paper';

const isCompleted = item => {
  const today = startOf(new Date());
  return isAfter(today, item.date);
};

const getDateContainerStyle = item => {
  const style = [styles.timeline__dateContainer];
  if (item.isMissed) {
    style.push(styles.timeline__dateContainer__missed);
  } else if (isCompleted(item)) {
    style.push(styles.timeline__dateContainer__completed);
  }
  return style;
};

const getDateStyle = item => {
  const style = [styles.timeline__date];
  if (item.isMissed) {
    style.push(styles.timeline__date__missed);
  } else if (isCompleted(item)) {
    style.push(styles.timeline__date__completed);
  }
  return style;
};

const getMonthStyle = item => {
  const style = [styles.timeline__month];
  if (item.isMissed) {
    style.push(styles.timeline__month__missed);
  } else if (isCompleted(item)) {
    style.push(styles.timeline__month__completed);
  }
  return style;
};

function renderItem(item, index) {
  return (
    <View style={[styles.timeline__item]}>
      <List.Accordion
        title={item.title}
        titleStyle={[styles.timeline__item__title]}
        style={[styles.timeline__item__accordion]}
        left={props => <List.Icon {...props} icon="folder" />}>
        <Label variant={LabelVariant.bodySmall} title="This is sample" />
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
    <View style={[styles.timeline__wrapper]}>
      <Label
        testID="timeline-year"
        variant={LabelVariant.h4}
        title={getFormatDate({date: new Date(), format: 'YYYY'})}
        style={[styles.timeline__year]}
      />
      <Timeline data={data} renderItem={renderItem} renderDate={renderDate} />
    </View>
  );
};

export default DocTimeline;
