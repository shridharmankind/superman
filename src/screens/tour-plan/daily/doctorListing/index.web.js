import React from 'react';
import {View} from 'react-native';
import {Label, LabelVariant} from 'components/elements';
import styles from '../styles';
import {DailyPlanParties} from 'components/widgets';
import {translate} from 'locale';

/**
 * render list of doctors
 * @param {Object} dayPlanData array of parties
 * @param {Function} onTileNamePress click function on name of doctor in party tile
 * @param {Function} onTilePress click function on party tile
 */
const PartyList = ({dayPlanData, onTileNamePress, onTilePress}) => {
  const doctorDetailStyleObject = {
    nameContainerCustom: styles.nameContainer,
    specialization: styles.specialization,
    divisionContainerCustom: styles.divisionContainer,
    imageCustom: styles.image,
    detailsContainerCustom: styles.detailsContainer,
    titleSize: 21,
    subTitleSize: 14,
    divisionSize: 10,
  };

  /**
   * Render UI for completed visits
   */
  const renderCompletedVisits = () => {
    return dayPlanData?.completedVisits.map((data, index) => (
      <View style={styles.doctorDetailWrapper}>
        <View key={index} style={styles.doctorDetailContainer}>
          <DailyPlanParties
            title={data.name}
            specialization={data.specialities}
            isKyc={data.isKyc}
            isCampaign={data.isCampaign}
            gender={data.gender}
            category={data.category}
            location={data.areas}
            partyType={data?.partyTypes?.name}
            customStyle={doctorDetailStyleObject}
            showFrequencyChiclet={false}
            showVisitPlan={true}
            visitData={data.visits}
            showTile={true}
            showCompletedTitle={true}
            showAdhocTitle={false}
            onTileNamePress={() => {
              onTileNamePress(data);
            }}
            onTilePress={() => {
              onTilePress(data);
            }}
          />
        </View>
      </View>
    ));
  };

  /**
   * function to render the list of doctor's planned visits
   * @returns list of doctors planned for current day visit
   */
  const renderDayPlan = () => {
    return (
      <View style={styles.contentView}>
        {(dayPlanData?.toDoVisits || []).map((plan, index) => {
          return (
            <View style={styles.doctorDetailWrapper} key={index}>
              <View key={index} style={styles.doctorDetailContainer}>
                <DailyPlanParties
                  title={plan.name}
                  gender={plan.gender}
                  specialization={plan.specialities}
                  category={plan.category}
                  location={plan.areas}
                  isCampaign={plan.isCampaign}
                  isKyc={plan.isKyc}
                  customStyle={doctorDetailStyleObject}
                  showFrequencyChiclet={false}
                  showVisitPlan={true}
                  visitData={plan.visits}
                  showTile={true}
                  showCompletedTitle={false}
                  showAdhocTitle={true}
                  onTileNamePress={() => {
                    onTileNamePress(plan);
                  }}
                  onTilePress={() => {
                    onTilePress(plan);
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <>
      {renderDayPlan()}
      <Label
        variant={LabelVariant.h6}
        style={styles.visitCompleted}
        title={translate('tourPlan.monthly.visitCompleted')}
        type={'regular'}
      />

      {renderCompletedVisits()}
    </>
  );
};

export default PartyList;
