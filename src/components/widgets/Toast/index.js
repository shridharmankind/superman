import React from 'react';
import Toast from 'react-native-toast-message';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Button, Label} from 'components/elements';
import {CloseIcon} from 'assets';

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
    success: ({props}) => getToastView('success', props),
    notification: ({props}) => getToastView('notification', props),
    warning: ({props}) => getToastView('warning', props),
    alert: ({props}) => getToastView('alert', props),
    standard: ({props}) => getToastView('standard', props),
    confirm: ({props}) => getToastView('confirm', props),
  };

  return <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />;
};

export default CustomToast;
