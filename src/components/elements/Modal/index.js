import React from 'react';
import {Modal, View, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from 'react-native-paper';
import {BlurView} from '@react-native-community/blur';
import {CloseIcon} from 'assets';
import PropTypes from 'prop-types';
import {Button} from 'components/elements';
import styles from './styles';

// https://github.com/Kureev/react-native-blur
// for web https://stackoverflow.com/questions/47207510/react-native-blur-in-modal
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
 * @param {Boolean} blurView flag to show blur background or not
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
  blurView,
  ...props
}) => {
  const {colors} = useTheme();
  const primaryActionHandler = () => {
    primaryAction();
    onClose();
  };

  const renderModal = () => {
    return (
      <View style={[styles.centeredView, props?.customModalCenteredView]}>
        <View style={[styles.modalView, customModalPosition]}>
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
              contentStyle={primaryActionProps.btnStyle}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View>
      <Modal
        animationType={animationType}
        transparent={true}
        visible={open}
        onRequestClose={onClose}>
        {blurView && (
          <BlurView
            blurType="light"
            blurAmount={1}
            reducedTransparencyFallbackColor={colors.grey[800]}
            style={styles.blurView}>
            {renderModal()}
          </BlurView>
        )}
        {!blurView && renderModal()}
      </Modal>
    </View>
  );
};

CustomModal.defaultProps = {
  blurView: true,
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
  blurView: PropTypes.bool,
};

export default CustomModal;
