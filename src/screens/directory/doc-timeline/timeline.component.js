import React from 'react';
import {Label} from 'components/elements';
import {ContentWithSidePanel} from 'components/layouts';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'components/elements';
import styles from './timeline.styles';
import {TouchableOpacity, View} from 'react-native';
import {Strings} from 'common';
import Timeline from '../timeline/timeline.component';

const DocTimeline = () => {
  const data = [
    {
      time: '09:00',
      title: 'BreakFast',
      description:
        'I had breakfast from a wonderful restaurant and the food was super tasty.',
    },
    {
      time: '11:00',
      title: 'Tea Break',
      description:
        'I made a tea myself and drink it with a packet of biscuits.',
    },
    {
      time: '13:00',
      title: 'Lunch',
      description: 'I ate lunch from nearby hotel but food was just okay.',
    },
    {time: '16:00', title: 'Tea Break', description: 'Ate two snacks.'},
    {
      time: '20:00',
      title: 'Dinner',
      description: 'This time I prepared dinner looking a youtube tutorial.',
    },
  ];
  return (
    <View style={styles.container}>
      <Timeline
        circleSize={20}
        circleColor="blue"
        lineColor="gray"
        timeStyle={styles.time}
        descriptionStyle={styles.description}
        data={data}
        columnFormat="two-column"
      />
    </View>
  );
};

export default DocTimeline;
