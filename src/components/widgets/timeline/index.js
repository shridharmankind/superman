import React from 'react';
import styles from './styles';
import {View, FlatList} from 'react-native';

function _renderItem({item, index}) {
  return (
    <View style={[styles.timelineItemContainer]} key={index}>
      {index % 2 === 0 ? (
        <View style={[styles.timelineItemInnerContainer]}>
          <View style={[styles.timelineItem]}>
            {this.renderItem(item, index)}
            {this.renderDate(item, index)}
          </View>
          {/* <View style={[styles.timeline__line]}></View> */}
        </View>
      ) : (
        <View style={[styles.timelineItemInnerContainer]}>
          <View style={[styles.timelineItem]}>
            {this.renderDate(item, index)}
          </View>
          {/* <View style={[styles.timeline__line]}></View> */}
          <View style={[styles.timelineItemRight]}>
            {this.renderItem(item, index)}
          </View>
        </View>
      )}
    </View>
  );
}

const Timeline = props => {
  return (
    <View style={[styles.timeline, props.style]}>
      <FlatList
        style={[styles.timelineList, props.listViewStyle]}
        contentContainerStyle={props.listViewContainerStyle}
        data={props.data}
        renderItem={_renderItem.bind(props)}
        keyExtractor={(item, index) => index + ''}
        {...props.options}
      />
    </View>
  );
};

export default Timeline;
