import React from 'react';
import Toast from 'react-native-toast-message';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Button, Label, LabelVariant} from 'components/elements';
import {CloseIcon} from 'assets';
import {Constants} from 'common';

/**
 * component to show toast notification
 */

const CustomToast = () => {
  const getToastView = (type, props) => {
    return (
      <View style={[styles.toastStyleBase, styles[type]]}>
        <TouchableOpacity style={styles.closeIcon} onPress={props.onClose}>
          <CloseIcon width={24} height={24} />
        </TouchableOpacity>
        <Label
          title={props.heading}
          style={styles.toastText}
          variant={LabelVariant.subtitleSmall}
        />
        <Label title={props.subHeading} style={styles.toastText} size={11} />
        <View style={styles.btnContainer}>
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
        </View>
      </View>
    );
  };

  const toastConfig = {
    success: ({props}) => getToastView(Constants.TOAST_TYPES.SUCCESS, props),
    notification: ({props}) =>
      getToastView(Constants.TOAST_TYPES.NOTIFICATION, props),
    warning: ({props}) => getToastView(Constants.TOAST_TYPES.WARNING, props),
    alert: ({props}) => getToastView(Constants.TOAST_TYPES.ALERT, props),
    standard: ({props}) => getToastView(Constants.TOAST_TYPES.STANDARD, props),
    confirm: ({props}) => getToastView(Constants.TOAST_TYPES.CONFIRM, props),
  };

  return <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />;
};

/**
 * method to show toast notification
 * @param {Object} props props to show the toast like visibilityTime, autoHide...
 */
export const showToast = props => {
  const {type, visibilityTime} = props;
  let defaultVisibilityTime = 4000;
  switch (type) {
    case Constants.TOAST_TYPES.SUCCESS:
      defaultVisibilityTime = 1000;
      break;
  }
  Toast.show({
    type,
    visibilityTime: visibilityTime || defaultVisibilityTime,
    ...props,
  });
};

/**
 * method to hide toast notification
 */
export const hideToast = () => {
  Toast.hide();
};

export default CustomToast;
