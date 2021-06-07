import React from 'react';
import styles from './timeline.styles';
import {TouchableOpacity, View, FlatList, Image, Text} from 'react-native';

const defaultCircleSize = 16;
const defaultCircleColor = '#007AFF';
const defaultLineWidth = 2;
const defaultLineColor = '#007AFF';
const defaultTimeTextColor = 'black';
const defaultDotColor = 'white';
const defaultInnerCircle = 'none';

const Timeline = props => {
  const _this = {};
  const _renderItem = ({item, index}) => {
    const content =
      !item.position && index % 2 === 0 ? (
        (item.position && item.position === 'right') || (
          <View style={[styles.rowContainer, _this.props.rowContainerStyle]}>
            {_this.renderTime(item, index)}
            {_this.renderEvent(item, index)}
            {_this.renderCircle(item, index)}
          </View>
        )
      ) : (
        <View style={[styles.rowContainer, _this.props.rowContainerStyle]}>
          {_this.renderEvent(item, index)}
          {_this.renderTime(item, index)}
          {_this.renderCircle(item, index)}
        </View>
      );
    return <View key={index}>{content}</View>;
  };

  const _renderTime = (rowData, rowID) => {
    if (!_this.props.showTime) {
      return null;
    }
    const timeWrapper = {
      flex: 1,
      alignItems:
        (rowData.position && rowData.position === 'right') ||
        (!rowData.position && rowID % 2 === 0)
          ? 'flex-end'
          : 'flex-start',
    };

    const {isAllowFontScaling} = _this.props;
    return (
      <View style={timeWrapper}>
        <View style={[styles.timeContainer, _this.props.timeContainerStyle]}>
          <Text
            style={[styles.time, _this.props.timeStyle]}
            allowFontScaling={isAllowFontScaling}>
            {rowData.time}
          </Text>
        </View>
      </View>
    );
  };

  const _renderDetail = (rowData, rowID) => {
    const {isAllowFontScaling} = _this.props;
    let description;
    if (typeof rowData.description === 'string') {
      description = (
        <Text
          style={[
            styles.description,
            _this.props.descriptionStyle,
            rowData.descriptionStyle,
          ]}
          allowFontScaling={isAllowFontScaling}>
          {rowData.description}
        </Text>
      );
    } else if (typeof rowData.description === 'object') {
      description = rowData.description;
    }

    return (
      <View style={styles.container}>
        <Text
          style={[styles.title, _this.props.titleStyle, rowData.titleStyle]}
          allowFontScaling={isAllowFontScaling}>
          {rowData.title}
        </Text>
        {description}
      </View>
    );
  };

  const _renderCircle = (rowData, rowID) => {
    let circleSize = rowData.circleSize
      ? rowData.circleSize
      : _this.props.circleSize
      ? _this.props.circleSize
      : defaultCircleSize;
    let circleColor = rowData.circleColor
      ? rowData.circleColor
      : _this.props.circleColor
      ? _this.props.circleColor
      : defaultCircleColor;
    let lineWidth = rowData.lineWidth
      ? rowData.lineWidth
      : _this.props.lineWidth
      ? _this.props.lineWidth
      : defaultLineWidth;

    let circleStyle = {
      width: _this.state.width ? circleSize : 0,
      height: _this.state.width ? circleSize : 0,
      borderRadius: circleSize / 2,
      backgroundColor: circleColor,
      left: _this.state.width - circleSize / 2 - (lineWidth - 1) / 2,
    };

    var innerCircle = null;
    switch (_this.props.innerCircle) {
      case 'icon':
        let iconDefault = rowData.iconDefault
          ? rowData.iconDefault
          : _this.props.iconDefault;
        let iconSource = rowData.icon ? rowData.icon : iconDefault;
        if (React.isValidElement(iconSource)) {
          innerCircle = iconSource;
          break;
        }
        if (rowData.icon) {
          iconSource =
            rowData.icon.constructor === String
              ? {uri: rowData.icon}
              : rowData.icon;
        }
        let iconStyle = {
          height: circleSize,
          width: circleSize,
        };
        innerCircle = (
          <Image
            source={iconSource}
            defaultSource={typeof iconDefault === 'number' && iconDefault}
            style={[iconStyle, _this.props.iconStyle]}
          />
        );
        break;
      case 'dot':
        const dotSize = _this.props.dotSize
          ? _this.props.dotSize
          : circleSize / 2;
        let dotStyle = {
          height: dotSize,
          width: dotSize,
          borderRadius: circleSize / 4,
          backgroundColor: rowData.dotColor
            ? rowData.dotColor
            : _this.props.dotColor
            ? _this.props.dotColor
            : defaultDotColor,
        };
        innerCircle = <View style={[styles.dot, dotStyle]} />;
        break;
      case 'element':
        innerCircle = rowData.icon;
        break;
    }
    return (
      <View style={[styles.circle, circleStyle, _this.props.circleStyle]}>
        {innerCircle}
      </View>
    );
  };

  const _renderSeparator = () => {
    if (!_this.props.separator) {
      return null;
    }
    return <View style={[styles.separator, _this.props.separatorStyle]} />;
  };

  const _renderEvent = (rowData, rowID) => {
    const lineWidth = rowData.lineWidth
      ? rowData.lineWidth
      : _this.props.lineWidth;
    const isLast = _this.props.renderFullLine
      ? !_this.props.renderFullLine
      : _this.state.data.slice(-1)[0] === rowData;
    const lineColor = isLast
      ? 'rgba(0,0,0,0)'
      : rowData.lineColor
      ? rowData.lineColor
      : _this.props.lineColor;
    const opStyle =
      (rowData.position && rowData.position === 'right') ||
      (!rowData.position && rowID % 2 === 0)
        ? {
            borderColor: lineColor,
            borderLeftWidth: lineWidth,
            borderRightWidth: 0,
            marginLeft: 20,
            paddingLeft: 20,
          }
        : {
            borderColor: lineColor,
            borderLeftWidth: 0,
            borderRightWidth: lineWidth,
            marginRight: 20,
            paddingRight: 20,
          };

    return (
      <View
        style={[
          styles.details,
          opStyle,
          _this.props.eventContainerStyle,
          rowData.eventContainerStyle,
        ]}
        onLayout={evt => {
          if (!_this.state.x && !_this.state.width) {
            const {x, width} = evt.nativeEvent.layout;
            _this.state = {x, width};
          }
        }}>
        <TouchableOpacity
          disabled={_this.props.onEventPress == null}
          style={[_this.props.detailContainerStyle]}
          onPress={() =>
            _this.props.onEventPress ? _this.props.onEventPress(rowData) : null
          }>
          <View style={[styles.detail, _this.props.eventDetailStyle]}>
            {_this.renderDetail(rowData, rowID)}
          </View>
          {_this._renderSeparator()}
        </TouchableOpacity>
      </View>
    );
  };

  _this.props = props;
  _this._renderItem = _renderItem.bind(_this);
  _this.renderTime = (
    _this.props.renderTime ? _this.props.renderTime : _renderTime
  ).bind(_this);
  _this.renderDetail = (
    _this.props.renderDetail ? _this.props.renderDetail : _renderDetail
  ).bind(_this);
  _this.renderCircle = (
    _this.props.renderCircle ? _this.props.renderCircle : _renderCircle
  ).bind(_this);
  _this.renderEvent = _renderEvent.bind(_this);
  _this.state = {
    data: _this.props.data,
    x: 0,
    width: 0,
  };
  _this._renderSeparator = _renderSeparator.bind(_this);
  return (
    <View style={[styles.container, _this.props.style]}>
      <FlatList
        style={[styles.listview, _this.props.listViewStyle]}
        contentContainerStyle={_this.props.listViewContainerStyle}
        data={_this.state.data}
        extraData={_this.state}
        renderItem={_this._renderItem}
        keyExtractor={(item, index) => index + ''}
        {..._this.props.options}
      />
    </View>
  );
};

Timeline.defaultProps = {
  circleSize: defaultCircleSize,
  circleColor: defaultCircleColor,
  lineWidth: defaultLineWidth,
  lineColor: defaultLineColor,
  innerCircle: defaultInnerCircle,
  columnFormat: 'single-column-left',
  separator: false,
  showTime: true,
  isAllowFontScaling: true,
};

export default Timeline;
