import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {Button} from 'components/elements';
import theme from 'themes';
import styles from './styles';

/**
 * Custom button component using Button from react-native-paper.
 * This serves the purpose to make the use of button consistent throughtout the app
 * @param {String} color  color of button
 * @param {Object} contentStyle custom style to be passed from consuming component for the button
 * @param {Boolean} disabled disable the button
 * @param {Object} labelStyle custom style for title text
 * @param {String} mode can be 'text', 'outline' or 'contained'
 * @param {Function} onPress click event
 * @param {String} testID date test id
 * @param {String} title button title
 * @param {Boolean} uppercase boolean flag to show title in uppercase or camelcase
 */

const CustomButton = ({
  animationType = 'slide',
  open,
  onClose,
  modalTitle,
  modalContent,
  primaryAction,
  primaryActionProps,
  ...rest
}) => {
  const {colors} = useTheme();

  const primaryActionHandler = () => {
    primaryActionProps.onPress();
    onClose();
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType={animationType}
        transparent={true}
        visible={open}
        onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {modalTitle}
            {modalContent}
            {...rest}
            {primaryAction && (
              <Button
                title={primaryAction.actionTitle}
                mode={primaryAction.mode}
                onPress={primaryActionHandler}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomButton;
