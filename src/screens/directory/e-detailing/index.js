import React from 'react';
import {Label} from 'components/elements';
import {ContentWithSidePanel} from 'components/layouts';
import {Button, LabelVariant} from 'components/elements';
import styles from './styles';
import {TouchableOpacity, View} from 'react-native';
import {Strings} from 'common';
import {ArrowBack} from 'assets';
import {isWeb} from 'helper';

/**
 * Render header
 *
 * @param {Object} {navigation}
 */
const renderHeader = ({navigation}) => (
  <View style={[styles.eDetailingHead]}>
    <View style={[styles.eDetailingHeadCol]}>
      {isWeb() ? null : (
        <TouchableOpacity
          testID="eDetail-back"
          style={styles.eDetailingHeadBack}
          onPress={() => navigation.goBack()}>
          <ArrowBack width={24} height={24} />
        </TouchableOpacity>
      )}
    </View>
    <View style={[styles.eDetailingHeadCol]}>
      <Label
        testID="eDetail-title"
        variant={LabelVariant.h2}
        title={Strings.eDetailing}
      />
    </View>
    <View style={[styles.eDetailingStart]}>
      <Button
        testID="eDetail-start-presentation"
        title={Strings.startPresentation}
        mode="contained"
        contentStyle={styles.eDetailingStartContent}
        labelStyle={styles.eDetailingStartText}
      />
    </View>
  </View>
);

/**
 * E detailing component
 *
 * @param {Object} {navigation}
 * @return {JSX} Edetailing component
 */
const EDetailing = ({navigation}) => {
  return (
    <ContentWithSidePanel header={renderHeader({navigation})}>
      <View style={[styles.eDetailingPriorityProducts]}>
        <Label
          testID="eDetail-priority-products"
          variant={LabelVariant.subtitleLarge}
          title={Strings.priorityProducts}
        />
        <View style={[styles.eDetailingPriorityProductsList]} />
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
