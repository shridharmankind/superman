import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
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
}) => {
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

  const renderContent = () => {
    return (
      <>
        {content}
        <View style={styles.rightImages}>
          <Image
            style={[styles.topImage, styles.popImage]}
            source={require('../../../assets/images/avatar.png')}
          />
          <Image
            style={[styles.topRightImage, styles.popImage]}
            source={require('../../../assets/images/avatar.png')}
          />
          <Image
            style={[styles.topMiddleImage, styles.popImage]}
            source={require('../../../assets/images/avatar.png')}
          />
          <Image
            style={[styles.topBottomImage, styles.popImage]}
            source={require('../../../assets/images/avatar.png')}
          />
        </View>
        <View style={styles.bottomTextContent}>
          <Label title={bottomText} variant={LabelVariant.h3} type={'bold'} />
        </View>
        <View style={styles.leftBottomImage}>
          <Image
            style={styles.popImage}
            source={require('../../../assets/images/avatar.png')}
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
