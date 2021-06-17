import React from 'react';
import styles from './styles';
import {View, FlatList} from 'react-native';

const renderBorder = (index, total) => {
  if (total === index + 1) {
    return null;
  }
  return (
    <View style={styles.timelineLineContainer}>
      <View style={styles.timelineLine} />
    </View>
  );
};

function _renderHighlight(index) {
  if (index === 0) {
    return (
      <View style={[styles.timelineItemRight]}>{this.renderHighlight()}</View>
    );
  }
  return null;
}

function _renderItem({item, index}) {
  return (
    <View style={[styles.timelineItemContainer]} key={index}>
      {index % 2 === 0 ? (
        <View style={[styles.timelineItemInnerContainer]}>
          <View style={[styles.timelineItem]}>
            {this.renderItem(item, index)}
            {this.renderDate(item, index)}
          </View>
          {renderBorder(index, this.data?.length)}
          {_renderHighlight.call(this, index)}
        </View>
      ) : (
        <View style={[styles.timelineItemInnerContainer]}>
          <View style={[styles.timelineItem]}>
            {this.renderDate(item, index)}
          </View>
          {renderBorder(index, this.data?.length)}
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
        nestedScrollEnabled
        {...props.options}
      />
    </View>
  );
};

Timeline.defaultProps = {
  renderHighlight: () => null,
  data: [],
};

export default Timeline;
