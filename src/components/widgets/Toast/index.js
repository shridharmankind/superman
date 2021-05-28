import React from 'react';
import Toast from 'react-native-toast-message';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Button, Label} from 'components/elements';
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
        <Label title={props.heading} style={styles.toastText} size={12} />
        <Label title={props.subHeading} style={styles.toastText} size={12} />
        <Button
          title={props.actionTitle}
          mode="text"
          onPress={props.onPress}
          contentStyle={styles.button}
          labelStyle={styles.buttonText}
        />
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

export default CustomToast;
