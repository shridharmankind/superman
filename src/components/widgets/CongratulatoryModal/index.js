import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Animated} from 'react-native';
import {Modal, LabelVariant, Label} from 'components/elements';
import {Strings} from 'common';
import styles from './styles';

/**
 * Custom congraturatory component using Modal from /component/elmenets.
 * This serves the purpose to open a dialog box with custom title, content and action buttons
 * @param {String} actionTitle  title for the button on bottom
 * @param {Boolean} open boolean flag to decide to open/close dialog box
 * @param {Function} onClose close function to hide modal
 * @param {Object} content JSX for dialog content
 * @param {Function} btnAction dialog bottom button action handler
 * @param {Boolean} closeAction boolean flag to decide whether to show close icon
 */

const CongratulatoryModal = ({
  actionTitle,
  content,
  bottomText,
  btnAction,
  open,
  onClose,
  closeAction,
}) => {
  const opacity = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
    }).start();
  });

  /**method to render title Congratulation on modal*/
  const renderTitle = () => {
    return (
      <View style={styles.title}>
        <Label
          size={28}
          type={'bold'}
          style={styles.title}
          title={Strings.congratulations}
        />
      </View>
    );
  };

  /** method to render content passed as element from parent component  */
  const renderContent = () => {
    return (
      <>
        {content}

        <View style={styles.rightImages}>
          <Animated.Image
            opacity={opacity}
            style={[styles.popImage, styles.topImage]}
            source={require('assets/images/celebrate_1.png')}
          />
          <Animated.Image
            opacity={opacity}
            style={[styles.popImage, styles.topRightImage]}
            source={require('assets/images/ribbons.png')}
          />
          <Animated.Image
            opacity={opacity}
            style={[styles.popImage, styles.topMiddleImage]}
            source={require('assets/images/celebrate_2.png')}
          />
          <Animated.Image
            opacity={opacity}
            style={[styles.popImage, styles.topBottomImage]}
            source={require('assets/images/ribbons.png')}
          />
        </View>
        <View style={styles.bottomTextContent}>
          <Label title={bottomText} variant={LabelVariant.h3} type={'bold'} />
        </View>
        <View style={styles.leftBottomImage}>
          <Animated.Image
            opacity={opacity}
            style={styles.popImage}
            source={require('assets/images/celebrate_2.png')}
          />
        </View>
      </>
    );
  };

  return (
    <Modal
      animationType={'fade'}
      open={open}
      customModalCenteredView={styles.centeredView}
      customModalPosition={styles.modalContent}
      modalTitle={renderTitle()}
      modalContent={renderContent()}
      primaryAction={btnAction}
      primaryActionProps={{
        actionTitle: actionTitle,
        btnStyle: styles.button,
        mode: 'contained',
      }}
      closeAction={closeAction}
      onClose={onClose}
    />
  );
};

CongratulatoryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  actionTitle: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  btnAction: PropTypes.func,
  closeAction: PropTypes.bool,
};

export default CongratulatoryModal;
