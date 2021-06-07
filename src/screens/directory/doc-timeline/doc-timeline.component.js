import React from 'react';
import {Timeline} from 'components/widgets';
import {Label} from 'components/elements';

function renderItem(item, index) {
  return <Label testID="eDetail-priority" title={item.title} size={16} />;
}

function renderDate(item, index) {
  return (
    <Label
      testID="eDetail-priority-other-products"
      title={item.time}
      size={16}
    />
  );
}

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
    <Timeline data={data} renderItem={renderItem} renderDate={renderDate} />
  );
};

export default DocTimeline;
