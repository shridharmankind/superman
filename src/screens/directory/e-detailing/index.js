import React from 'react';
import {Label} from 'components/elements';
import {ContentWithSidePanel} from 'components/layouts';
import {Button, LabelVariant} from 'components/elements';
import styles from './styles';
import {TouchableOpacity, View} from 'react-native';
import {Strings, Constants} from 'common';
import {ArrowBack} from 'assets';
import {isWeb} from 'helper';
import {API_PATH} from 'screens/directory/apiPath';
import {NetworkService} from 'services';
import {showToast, hideToast} from 'components/widgets/Toast';
/**
 * Render header
 *
 * @param {Object} {navigation}
 */
const renderHeader = ({navigation, docData}) => (
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
        onPress={() => startPresentation(docData)}
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
const EDetailing = ({navigation, route}) => {
  let docData = route?.params?.data || null;
  return (
    <ContentWithSidePanel header={renderHeader({navigation, docData})}>
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

// Function to be called on Start Presentation
const startPresentation = docData => {
  if (!!docData && !docData.isScheduledToday) {
    const addDocToDailyPlan = async () => {
      const result = await NetworkService.post(
        API_PATH.ADD_TODAY_PLAN,
        {},
        {staffPositionId: 1, partyId: docData.doctorID},
      );
      if (result.status === Constants.HTTP_OK) {
        docData.updateCallbk(docData.doctorID);
        showToast({
          type: Constants.TOAST_TYPES.SUCCESS,
          autoHide: true,
          props: {
            heading: Strings.directory.docAddedTodayPlan,
            onClose: () => hideToast(),
          },
        });
      } else {
        console.log('error', result.statusText);
      }
    };
    addDocToDailyPlan();
  }
};

export default EDetailing;
