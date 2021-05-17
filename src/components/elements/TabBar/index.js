import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';


/**
 * Custom tab bar component using react navigation.
 * This serves the purpose show top tab bars
 * @param {Object} state  state object
 * @param {Object} descriptors state descriptors like tab bar label
 * @param {Object} navigation object containging navigation functions like navigate, emit
 */
const TabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={{flexDirection: 'row', paddingTop: 20}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        // modify inputRange for custom behavior
        // const inputRange = state.routes.map((_, i) => i);
        // const opacity = Animated.interpolate(position, {
        //   inputRange,
        //   outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        // });
        return (
          <View style={styles.tabWrapper} key={index}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tab, isFocused && styles.focusedTab]}>
              <View style={styles.tabWrapper}>
                <Text
                  style={[styles.tabText, isFocused && styles.focusedTabText]}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

TabBar.propTypes = {
  state: PropTypes.object,
  descriptors: PropTypes.object,
  navigation: PropTypes.object,
};

export default TabBar;
