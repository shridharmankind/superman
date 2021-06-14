import React, {useEffect, useRef} from 'react';
import {TouchableOpacity, View, Animated, Text} from 'react-native';
import styles from './styles';
import {Button, Label, LabelVariant} from 'components/elements';
import {CloseIcon} from 'assets';
import {Constants} from 'common';

/**
 * component to show toast notification
 */

const CustomToast = props => {
  console.log('props', props);
  const opacity = useRef(new Animated.Value(0)).current;
  console.log('opacity', opacity);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.onHide();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
          margin: 10,
          marginBottom: 5,
          backgroundColor: 'red',
          padding: 10,
          borderRadius: 4,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.15,
          shadowRadius: 5,
          elevation: 6,
        }}>
        {/* <View style={[styles.toastStyleBase, styles[props.type || 'success']]}> */}
        <TouchableOpacity style={styles.closeIcon} onPress={props?.onHide}>
          <CloseIcon width={24} height={24} />
        </TouchableOpacity>
        <Label
          title={props.heading}
          style={styles.toastText}
          variant={LabelVariant.subtitleSmall}
        />
        <Label title={props.subHeading} style={styles.toastText} size={11} />
        {/* <View style={[styles.btnContainer, props?.btnContainerStyle]}>
          {props.actionLeftTitle && (
            <Button
              title={props.actionLeftTitle}
              mode="text"
              onPress={props.onPressLeftBtn}
              contentStyle={styles.button}
              labelStyle={styles.buttonText}
            />
          )}
          {props.actionRightTitle && (
            <Button
              title={props.actionRightTitle}
              mode="text"
              onPress={props.onPressRightBtn}
              contentStyle={styles.button}
              labelStyle={styles.buttonText}
            />
          )}
        </View> */}
        {/* </View> */}
      </Animated.View>
    </>
  );
};

/**
 * method to hide toast notification
 */
// export const hideToast = () => {
//   return null;
// };

export default CustomToast;
