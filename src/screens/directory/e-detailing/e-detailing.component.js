import React from 'react';
import {Label} from 'components/elements';
import {ContentWithSidePanel} from 'components/layouts';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'components/elements';
import styles from './e-detailing.styles';
import {TouchableOpacity, View} from 'react-native';
import {Strings} from 'common';

const renderHeader = ({navigation}) => (
  <View style={[styles.eDetailingHead]}>
    <View style={[styles.eDetailingHead__Col]}>
      <TouchableOpacity
        testID="eDeatil-back"
        onPress={() => navigation.goBack()}>
        <Icon name="angle-left" size={24} />
      </TouchableOpacity>
    </View>
    <View style={[styles.eDetailingHead__Col]}>
      <Label testID="eDetail-title" title={Strings.eDetailing} size={23} />
    </View>
    <View style={[styles.eDetailing__Start]}>
      <Button
        testID="eDeatil-start-presentation"
        title={Strings.startPresentation}
        mode="contained"
        contentStyle={styles.eDetailing__Start__Content}
        labelStyle={styles.eDetailing__Start__Text}
      />
    </View>
  </View>
);

const EDetailing = ({navigation}) => {
  return (
    <ContentWithSidePanel header={renderHeader({navigation})}>
      <View style={[styles.eDetailing__PriorityProducts]}>
        <Label
          testID="eDetail-priority-products"
          title={Strings.priorityProducts}
          size={16}
        />
        <View style={[styles.eDetailing__PriorityProducts__List]} />
      </View>
      <Label
        testID="eDetail-priority-other-products"
        title={Strings.otherProducts}
        size={16}
      />
    </ContentWithSidePanel>
  );
};

export default EDetailing;
