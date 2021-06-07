import React from 'react';
import styles from './timeline.styles';
import {View, FlatList} from 'react-native';

function _renderItem({item, index}) {
  return (
    <View style={[styles.timeline__itemContainer]} key={index}>
      {index % 2 === 0 ? (
        <View style={[styles.timeline__itemInnerContainer]}>
          <View style={[styles.timeline__item]}>
            {this.renderItem(item, index)}
          </View>
          <View style={[styles.timeline__date]}>
            {this.renderDate(item, index)}
          </View>
        </View>
      ) : (
        <View style={[styles.timeline__itemInnerContainer]}>
          <View style={[styles.timeline__item]}></View>
          <View style={[styles.timeline__date]}>
            {this.renderDate(item, index)}
          </View>
          <View style={[styles.timeline__itemRight]}>
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
        style={[styles.timeline__list, props.listViewStyle]}
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
