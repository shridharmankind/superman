import React from 'react';
import {Label} from 'components/elements';
import {ContentWithSidePanel} from 'components/layouts';
import {Button, LabelVariant} from 'components/elements';
import styles from './e-detailing.styles';
import {TouchableOpacity, View} from 'react-native';
import {Strings} from 'common';
import {ArrowBack} from 'assets';

/**
 * Render header
 *
 * @param {*} {navigation}
 */
const renderHeader = ({navigation}) => (
  <View style={[styles.eDetailingHead]}>
    <View style={[styles.eDetailingHead__Col]}>
      <TouchableOpacity
        testID="eDetail-back"
        style={styles.eDetailingHead__Back}
        onPress={() => navigation.goBack()}>
        <ArrowBack width={24} height={24} />
      </TouchableOpacity>
    </View>
    <View style={[styles.eDetailingHead__Col]}>
      <Label
        testID="eDetail-title"
        variant={LabelVariant.h2}
        title={Strings.eDetailing}
      />
    </View>
    <View style={[styles.eDetailing__Start]}>
      <Button
        testID="eDetail-start-presentation"
        title={Strings.startPresentation}
        mode="contained"
        contentStyle={styles.eDetailing__Start__Content}
        labelStyle={styles.eDetailing__Start__Text}
      />
    </View>
  </View>
);

/**
 * E detailing component
 *
 * @param {*} {navigation}
 * @return {*}
 */
const EDetailing = ({navigation}) => {
  return (
    <ContentWithSidePanel header={renderHeader({navigation})}>
      <View style={[styles.eDetailing__PriorityProducts]}>
        <Label
          testID="eDetail-priority-products"
          variant={LabelVariant.subtitleLarge}
          title={Strings.priorityProducts}
        />
        <View style={[styles.eDetailing__PriorityProducts__List]} />
      </View>
      <Label
        testID="eDetail-priority-other-products"
        variant={LabelVariant.subtitleLarge}
        title={Strings.otherProducts}
      />
    </ContentWithSidePanel>
  );
};

export default EDetailing;
