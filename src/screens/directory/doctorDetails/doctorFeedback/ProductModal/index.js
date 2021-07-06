import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ArrowBack} from 'assets';
import styles from './style';
import {Label, LabelVariant, Button, Modal} from 'components/elements';
import {isWeb} from 'helper';
import ProductWithCheckBox from '../ProductWithCheckBox';
import {translate} from 'locale';

/**
 * Custom modal component using Modal from react-native.
 * This serves the purpose to open a dialog box with custom title, content and action buttons
 * @param {Boolean} showModal boolean flag to decide to open/close dialog box
 * @param {Function} closeModal close function to hide modal
 * @param {Object} data Modal Data
 * @param {Object} doneHandler button props of primary action
 * @param {String} motherBrandId motherBrandId from item
 * @param {Object} discussedListData discussed data
 */

const ProductModal = ({
  data,
  showModal,
  closeModal,
  doneHandler,
  motherBrandId,
  discussedListData,
}) => {
  const [currentList, setCurrentList] = useState(
    JSON.parse(JSON.stringify(data)),
  );
  const [discussedList, setDiscussedList] = useState([]);

  useEffect(() => {
    const list = [];
    for (const iterator of currentList) {
      if (iterator.isChecked) {
        list.push(iterator);
      }
    }
    setDiscussedList(list);
  }, [currentList]);

  const onItemChecked = (item, index) => {
    const isChecked = !item.isChecked;
    const mutatedItem = {
      ...item,
      isChecked,
    };
    const mutatedList = [...currentList];
    mutatedList[index] = mutatedItem;
    setCurrentList(mutatedList);
  };

  const getModalContent = () => {
    return (
      <View style={[styles.subBrandList]}>
        {currentList.map((item, index) => (
          <ProductWithCheckBox
            key={index}
            data={item}
            onItemChecked={() => onItemChecked(item, index)}
          />
        ))}
      </View>
    );
  };

  const onDone = () => {
    doneHandler(discussedList, motherBrandId, currentList);
  };
  const getModalTitle = () => {
    return (
      <View style={styles.modalTitle}>
        {isWeb() ? null : (
          <TouchableOpacity
            testID="eDetail-modal-back"
            onPress={closeModal}
            style={[styles.modalTitleBack]}>
            <ArrowBack width={24} height={24} />
          </TouchableOpacity>
        )}
        <Label
          testID="eDetail-modal-title"
          variant={LabelVariant.h2}
          title={translate('dcrSecondTab.SelectBrandLabel')}
        />
        <View style={[styles.modalTitleDone]}>
          <Button
            testID="eDetail-done"
            title={translate('dcrSecondTab.done')}
            mode="contained"
            onPress={onDone}
            contentStyle={styles.eDetailingStartContent}
            labelStyle={styles.eDetailingStartText}
          />
        </View>
      </View>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        animationType="fade"
        open={showModal}
        onClose={closeModal}
        modalTitle={getModalTitle()}
        modalContent={getModalContent()}
        presentationStyle="fullScreen"
        customModalPosition={styles.modalPosition}
        customModalCenteredView={styles.centerModal}
      />
    );
  };

  return <View>{renderModal()}</View>;
};

export default ProductModal;
