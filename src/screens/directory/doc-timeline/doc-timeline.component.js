import React from 'react';
import {Timeline} from 'components/widgets';
import {Label, LabelVariant} from 'components/elements';
import {Strings} from 'common';
import {View} from 'react-native';
import styles from './doc-timeline.styles';
import {getFormatDate, startOf, isAfter} from 'utils/dateTimeHelper';
import {List} from 'react-native-paper';

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
    <View
      style={
        item.isMissed
          ? [
              styles.timeline__dateContainer,
              styles.timeline__dateContainer__missed,
            ]
          : isCompleted(item)
          ? [
              styles.timeline__dateContainer,
              styles.timeline__dateContainer__completed,
            ]
          : [styles.timeline__dateContainer]
      }>
      <Label
        testID="timeline-date"
        title={getFormatDate({date: item.date, format: 'DD'})}
        style={[styles.timeline__date]}
        style={
          item.isMissed
            ? [styles.timeline__date, styles.timeline__date__missed]
            : isCompleted(item)
            ? [styles.timeline__date, styles.timeline__date__completed]
            : [styles.timeline__date]
        }
      />
      <Label
        testID="timeline-month"
        title={getFormatDate({date: item.date, format: 'MMM'})}
        style={[styles.timeline__month]}
        style={
          item.isMissed
            ? [styles.timeline__month, styles.timeline__month__missed]
            : isCompleted(item)
            ? [styles.timeline__month, styles.timeline__month__completed]
            : [styles.timeline__month]
        }
      />
    </View>
  );
}

const isCompleted = item => {
  const today = startOf(new Date());
  return isAfter(today, item.date);
};

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
    <Timeline data={data} renderItem={renderItem} renderDate={renderDate} />
  );
};

export default DocTimeline;
