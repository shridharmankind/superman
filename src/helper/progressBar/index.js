import React from 'react';
import * as Progress from 'react-native-progress';
import {StyleSheet} from 'react-native';
import themes from 'themes';

const CircularProgressBarWithStatus = props => {
  return (
    <Progress.Circle
      style={styles.progress}
      progress={props.progress}
      indeterminate={props.indeterminate}
      size={110}
      borderWidth={2}
      thickness={6}
      showsText={true}
      color={themes.colors.white}
    />
  );
};

const styles = StyleSheet.create({
  progress: {
    marginTop: 40,
    alignSelf: 'center',
  },
});

export default CircularProgressBarWithStatus;
