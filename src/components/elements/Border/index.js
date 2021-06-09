import React from 'react';
import {View} from 'react-native';

import styles from './styles';

const Border = ({container = {}, border = {}, borderStyle = 'dashed'}) => {
  return (
    <View style={[styles.container, container]}>
      <View style={[styles.border, border, {borderStyle}]} />
    </View>
  );
};

export default Border;
