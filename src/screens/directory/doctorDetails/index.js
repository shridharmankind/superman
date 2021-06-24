import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {Label, LabelVariant, Button} from 'components/elements';
import themes from 'themes';
import styles from './styles';
import {ArrowBack, Birthday, Anniversary, WorkOutline} from 'assets';
import {Strings, Constants} from 'common';
import {ContentWithSidePanel} from 'components/layouts';
import {TabBar} from 'components/widgets';
import {getFormatDate} from 'utils/dateTimeHelper';
import {useNavigation} from '@react-navigation/native';
import {OpenTask, PriorityProduct} from 'screens/directory';
import DocTimeline from '../doc-timeline';
import {Helper} from 'database';
import {useEffect} from 'react';
import {translate} from 'locale';

/**
 * Custom doctor details component render after click on doctor list.
 * This serves the purpose to make the use of doctor details consistent throughtout the app
 * @param {Object} route route to navigate
 */

const DoctorProfile = ({route}) => {
  const [staffPositionId, setStaffPositionId] = useState(null);

  useEffect(() => {
    (async () => {
      const id = await Helper.getStaffPositionId();
      setStaffPositionId(id || 1);
    })();
  });

  const doctorData = route.params?.data || {};
  const navigation = useNavigation();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const data = [
    {
      text: `${Strings.doctorProfileTab.prepSheet}`,
    },
  ];

  /**
   * Function to display date
   * @returns date format like 21 May
   */

  const dateFormat = date => {
    const dayMonth = getFormatDate({date: date, format: 'DD MMM'});

    return `${dayMonth}`;
  };

  /**
   * Function to display category color
   * @returns color behalf of category
   */
  const getDivisionColor = division => {
    switch (division && division.toLowerCase()) {
      case Constants.DIVISION_COLOR.KYC:
        return themes.colors.orange[100];
      case Constants.DIVISION_COLOR.A_PLUS:
        return themes.colors.darkBlue;
      case Constants.DIVISION_COLOR.A:
        return themes.colors.yellow[300];
      case Constants.DIVISION_COLOR.B:
        return themes.colors.lightBlue;
      case Constants.DIVISION_COLOR.C:
        return themes.colors.grey[1200];
      default:
        return themes.colors.transparent;
    }
  };

  /**
   * Function to navigate Doctor Profile screen
   */
  const handleBackClick = () => {
    navigation.navigate(Constants.TOUR_PLAN);
  };

  /**
   * Start e-detailing for party
   *
   */
  const startEdetailing = () => {
    navigation.navigate(Constants.ROUTE_EDETAILING);
  };

  /**
   * Function to set the state of Tab
   */
  const onTabPress = itemIdx => {
    setSelectedTabIndex(itemIdx);
  };

  /**
   * Function to render the Product Card
   * @returns a Card with Product Detail
   */
  const firstTab = () => {
    return (
      <View>
        <View style={styles.tabMainContainer}>
          <View style={styles.productMainContainer}>
            <PriorityProduct
              staffPostionId={1}
              partyId={doctorData.partyTypes.id}
            />
          </View>
          <View style={styles.openMainTask}>{<OpenTask />}</View>
        </View>
        {renderTimeLine()}
      </View>
    );
  };

  /**
   * Render timeline component
   *
   * @return {JSX} Timeline
   */
  const renderTimeLine = () => {
    if (!staffPositionId) {
      return null;
    }
    return (
      <View>
        <Label
          variant={LabelVariant.h3}
          style={styles.mainHeader}
          title={translate('timeline')}
        />
        <DocTimeline
          staffPositionId={staffPositionId}
          partyId={doctorData.id}
        />
      </View>
    );
  };

  /**
   * renders the view based on selected tab
   * @returns child view
   */
  const renderChildView = () => {
    switch (selectedTabIndex) {
      case 0:
        return firstTab();
      default:
        return <Label title={Strings.comingSoon} />;
    }
  };

  /**
   * Set the Format of Start and End Date Engagement
   * @returns date formated Value Like : May 21 - Jun 22
   */
  const formatEngment = dataValue => {
    const startDate = getFormatDate({
      date: dataValue.startDate,
      format: 'MMM YYYY',
    });
    let endText = Strings.tillDate;
    if (dataValue.endDate) {
      const endMonth = getFormatDate({
        date: dataValue.endDate,
        format: 'MMM YYYY',
      });
      endText = `${endMonth}`;
    }

    return `${startDate + ' - ' + endText}`;
  };

  const openDoctorFeedback = () => {
    navigation.navigate('DoctorFeedback', {data: doctorData});
  };

  /**
   * Function to render the Docotr Card
   * @returns a Card with Doctor Details - Anniversary, Birthday
   */
  const renderDoctorCard = () => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.tabContainer}>
          <View style={styles.divisionContainer}>
            {doctorData?.isKyc && (
              <View
                style={[
                  styles.divisionItem,
                  {
                    backgroundColor: getDivisionColor(
                      Constants.DIVISION_COLOR.KYC,
                    ),
                  },
                ]}>
                <Label
                  variant={LabelVariant.h6}
                  textColor={themes.colors.white}
                  title={Strings.kyc}
                  type={'bold'}
                />
              </View>
            )}
            {doctorData?.category && (
              <View
                style={[
                  styles.divisionItem,
                  {
                    backgroundColor: getDivisionColor(doctorData?.category),
                  },
                ]}>
                <Label
                  variant={LabelVariant.h6}
                  textColor={themes.colors.white}
                  style={styles.divisionText}
                  title={doctorData?.category?.toUpperCase()}
                />
              </View>
            )}
          </View>
          <View style={styles.leftTabContainer}>
            <ArrowBack
              style={styles.arrowBack}
              width={24}
              height={24}
              onPress={handleBackClick}
            />
            <Label style={styles.doctorProfile} title={Strings.doctorProfile} />
          </View>
          <View style={[styles.tabContainer, styles.rightTabContainer]}>
            {doctorData?.selfDispensing && (
              <>
                <Button
                  title={Strings.moreActions}
                  mode="outlined"
                  contentStyle={styles.buttonMoreText}
                  labelStyle={styles.buttonText}
                />
                <Button
                  title={Strings.beginRCPA}
                  mode="contained"
                  contentStyle={styles.buttonTabBar}
                  labelStyle={styles.buttonTabBarText}
                />
              </>
            )}
            <Button
              title={Strings.startEdetail}
              mode="outlined"
              contentStyle={styles.buttonMoreText}
              labelStyle={styles.buttonTabBarText}
              onPress={startEdetailing}
            />
            <Button
              title={Strings.captureDcr}
              mode="contained"
              contentStyle={styles.buttonTabBar}
              labelStyle={styles.buttonTabBarText}
              onPress={openDoctorFeedback}
            />
          </View>
        </View>
        <View style={styles.MainDoctorDetail}>
          <View style={styles.doctorDetail}>
            <View style={styles.container}>
              <Image
                style={[styles.image]}
                source={
                  Constants.GENDER.MALE === doctorData?.gender?.toUpperCase()
                    ? require('assets/images/male.png')
                    : require('assets/images/female.png')
                }
              />
              <View style={styles.nameContainer}>
                <Label
                  variant={LabelVariant.subtitleLarge}
                  title={Strings.dr + ' ' + doctorData?.name}
                  style={styles.doctorName}
                />
                <View style={styles.location}>
                  <Label
                    variant={LabelVariant.bodySmall}
                    title={(doctorData?.specialities || [])
                      .map(spec => spec.name)
                      .join(', ')}
                  />
                  {doctorData?.location && (
                    <Label
                      variant={LabelVariant.bodySmall}
                      title={', ' + doctorData?.location}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.anniversy}>
            <View style={styles.birthdayClass}>
              <Birthday style={styles.birthdayBorder} width={20} height={20} />
              <Label
                variant={LabelVariant.bodySmall}
                style={styles.dateClass}
                title={
                  doctorData.birthday ? dateFormat(doctorData.birthday) : ''
                }
              />
            </View>
            <View style={styles.birthdayClass}>
              <Anniversary
                style={styles.birthdayBorder}
                width={20}
                height={20}
              />
              <Label
                variant={LabelVariant.bodySmall}
                style={styles.dateClass}
                title={
                  doctorData?.anniversary
                    ? dateFormat(doctorData?.anniversary)
                    : ''
                }
              />
            </View>
          </View>
          <View style={styles.engment}>
            {(doctorData?.engagement || []).map((dataItem, index) => {
              return (
                <View style={styles.engmentContainer} key={index}>
                  <WorkOutline width={15} height={15} />
                  <Label
                    variant={LabelVariant.bodySmall}
                    style={styles.engClass}
                    title={formatEngment(dataItem)}
                  />
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.mainTabContainer}>
          <TabBar
            values={data}
            onPress={onTabPress}
            customStyle={styles.tabBarContainer}
          />
        </View>
      </View>
    );
  };

  return (
    <ContentWithSidePanel header={renderDoctorCard()}>
      {renderChildView()}
    </ContentWithSidePanel>
  );
};

export default DoctorProfile;
