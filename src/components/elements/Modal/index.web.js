import React from 'react';
import {Modal, View, TouchableWithoutFeedback} from 'react-native';
import {CloseIcon} from 'assets';
import PropTypes from 'prop-types';
import {Button} from 'components/elements';
import stylesWeb from './styles.web';
import styles from './styles';

/**
 * Custom modal component using Modal from react-native.
 * This serves the purpose to open a dialog box with custom title, content and action buttons
 * @param {String} animationType  animation to open dialog box
 * @param {Boolean} open boolean flag to decide to open/close dialog box
 * @param {Function} onClose close function to hide modal
 * @param {Object} modalTitle JSX for dialog title
 * @param {Object} modalContent JSX for dialog content
 * @param {Function} primaryAction dialog primary action handler
 * @param {Object} primaryActionProps button props of primary action
 * @param {Boolean} closeAction boolean flag to decide whether to show close icon
 * @param {String} closeTestId test id for close icon
 * @param {Object} customModalPosition styling for custom modal position
 */

const CustomModal = ({
  animationType = 'fade',
  open,
  onClose,
  modalTitle,
  modalContent,
  primaryAction,
  primaryActionProps,
  closeAction,
  closeTestId,
  customModalPosition,
}) => {
  const primaryActionHandler = () => {
    primaryAction();
    onClose();
  };
  return (
    <View>
      <Modal
        animationType={animationType}
        transparent={true}
        visible={open}
        onRequestClose={onClose}>
        <View style={[stylesWeb.centeredView]}>
          <View style={[stylesWeb.modalView, customModalPosition]}>
            <View style={styles.titleView}>
              <View style={styles.title}>{modalTitle}</View>
              {closeAction && (
                <TouchableWithoutFeedback
                  style={styles.close}
                  onPress={onClose}
                  testID={closeTestId}>
                  <CloseIcon width={32} height={32} />
                </TouchableWithoutFeedback>
              )}
            </View>
            {modalContent}
            {primaryAction && (
              <Button
                testID={primaryActionProps.testID}
                title={primaryActionProps.actionTitle}
                mode={primaryActionProps.mode}
                onPress={primaryActionHandler}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

CustomModal.propTypes = {
  animationType: PropTypes.oneOf(['slide', 'fade', 'none']),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  modalTitle: PropTypes.element.isRequired,
  modalContent: PropTypes.element.isRequired,
  primaryAction: PropTypes.func,
  primaryActionProps: PropTypes.object,
  closeAction: PropTypes.bool,
  closeTestId: PropTypes.string,
  customModalPosition: PropTypes.object,
  customModalView: PropTypes.object,
};

export default CustomModal;
