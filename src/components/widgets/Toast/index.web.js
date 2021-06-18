import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Button, Label, LabelVariant} from 'components/elements';
import {CloseIcon} from 'assets';
import {Constants} from 'common';

const CustomToast = props => {
  const TOAST_TIMEOUT = 2000;
  const [node] = useState(document.createElement('div'));

  const removeNode = () => {
    if (document.querySelector('#toast').children.length) {
      document.querySelector('#toast').childNodes[0].remove();
    }
  };

  useEffect(() => {
    if (props.show) {
      document.querySelector('#toast').appendChild(node).classList.add('toast');

      setTimeout(() => {
        removeNode();
        props.hideToast();
      }, TOAST_TIMEOUT);
    } else {
      removeNode();
    }

    return () => removeNode();
  }, [node, props]);

  return ReactDOM.createPortal(props.children, node);
};

export default CustomToast;

export const showToast = hideToast => {
  return (
    <View style={[styles.toastStyleBase]}>
      <TouchableOpacity style={styles.closeIcon} onPress={hideToast}>
        <CloseIcon width={24} height={24} />
      </TouchableOpacity>
      <Label
        title={'removed'}
        style={styles.toastText}
        variant={LabelVariant.subtitleSmall}
      />
      <Label title={'undo remove'} style={styles.toastText} size={11} />
      <View style={[styles.btnContainer, styles.btnContainerStyle]}>
        <Button
          title={'OK'}
          mode="text"
          onPress={hideToast}
          contentStyle={styles.button}
          labelStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};
