import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {
  Label,
  Modal,
  Button,
  LabelVariant,
  ActivityIndicator,
} from 'components/elements';
import {getFormatDate} from 'utils/dateTimeHelper';
import {translate} from 'locale';

const MtpPerDayPlanRightPanel = ({route}) => {
  return (
    <View style={styles.container}>
      <Label variant={LabelVariant.h3} title={'coming soon right'} />
    </View>
  );
};

export default MtpPerDayPlanRightPanel;
