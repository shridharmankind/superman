import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {Label} from 'components/elements';
import {Bar} from 'react-native-progress';
import themes from 'themes';
import styles from './styles';
import {ArrowBack, Birthday, Anniversary, ArrowUp} from 'assets';
import {Strings} from 'common';
import {ContentWithSidePanel} from 'components/layouts';
import {Button} from 'components/elements';
import {TabBar} from 'components/widgets';
import {getFormatDate} from 'utils/dateTimeHelper';
import {useNavigation} from '@react-navigation/native';

/**
 * Custom doctor details component render after click on doctor list.
 * This serves the purpose to make the use of doctor details consistent throughtout the app
 * @param {Object} route route to navigate
 */

const DoctorProfile = ({route}) => {
  const doctorData = route.params?.data || '';
  const navigation = useNavigation();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const data = [
    {
      text: `${Strings.doctorProfileTab.prepSheet}`,
    },
    {
      text: `${Strings.doctorProfileTab.doctor360}`,
    },
    {
      text: `${Strings.doctorProfileTab.performance}`,
    },
    {
      text: `${Strings.doctorProfileTab.contentStudio}`,
    },
    {
      text: `${Strings.doctorProfileTab.engagement}`,
    },
    {
      text: `${Strings.doctorProfileTab.tasks}`,
    },
    {
      text: `${Strings.doctorProfileTab.surveys}`,
    },
  ];

  /**
   * Function to display date
   * @returns date format like 21 May
   */

  const dateFormate = date => {
    const day = getFormatDate({date: date, format: 'DD'});
    const month = getFormatDate({date: date, format: 'MMMM'});

    return `${day + ' ' + month}`;
  };

  const getDivisionColor = division => {
    switch (division && division.toLowerCase()) {
      case 'kyc':
        return themes.colors.orange[100];
      case 'a+':
        return themes.colors.darkBlue;
      case 'b':
        return themes.colors.lightBlue;
      default:
        return themes.colors.transparent;
    }
  };

  const handleBackClick = () => {
    navigation.navigate('TourPlan');
  };
  const onTabPress = itemIdx => {
    setSelectedTabIndex(itemIdx);
  };

  const firstTab = () => {
    return (
      <View style={styles.tabMainContainer}>
        <View style={styles.productMainContainer}>
          <View style={styles.headerProduct}>
            <Label
              style={styles.mainHeader}
              title={Strings.priorityProductCard.header}
            />
            <Label
              style={styles.count}
              title={Strings.priorityProductCard.one}
            />
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderTitle}>
                <Label
                  style={styles.labelTitle}
                  title={Strings.priorityProductCard.amlokindAt}
                />
              </View>
              <View style={styles.cardHeaderRightTitle}>
                <Label
                  style={styles.labelSubTitle}
                  title={Strings.priorityProductCard.p1}
                />
              </View>
            </View>
            <View style={styles.cardDetail}>
              <Label
                style={styles.labelSubHeader}
                title={Strings.priorityProductCard.description}
              />
            </View>
            <View style={styles.cardDetail}>
              <Label
                style={styles.progressText}
                title={Strings.priorityProductCard.progressNumber}
              />
              <ArrowUp style={styles.arrowUp} width={15} height={15} />
              <Label
                style={styles.percentageText}
                title={Strings.priorityProductCard.nine}
              />
            </View>
            <View style={styles.progreeBar}>
              <Bar progress={0.6} width={200} color={'#2394cc'} />
            </View>
            <View>
              <Label
                style={styles.descriptionText}
                title={Strings.priorityProductCard.tabDes}
              />
            </View>
          </View>
        </View>
        {/* <View style={styles.openMainTask}></View> */}
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
        return '';
    }
  };

  const renderDoctorCard = () => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.tabContainer}>
          <View
            style={[
              styles.divisionContainer,
              {
                backgroundColor: getDivisionColor(doctorData.category),
              },
            ]}>
            <Label
              style={styles.divisionText}
              title={doctorData.category?.toUpperCase()}
              size={10}
              type={'bold'}
            />
          </View>
          <View
            style={
              doctorData.selfDispensing
                ? styles.dispinsingContainer
                : styles.leftTabContainer
            }>
            <ArrowBack
              style={styles.arrowBack}
              width={24}
              height={24}
              onPress={handleBackClick}
            />
            <Label style={styles.doctorProfile} title={Strings.doctorProfile} />
          </View>
          <View style={[styles.tabContainer, styles.rightTabContainer]}>
            {doctorData.selfDispensing && (
              <>
                <Button
                  title={Strings.captureDcr}
                  mode="contained"
                  contentStyle={styles.buttonTabBar}
                  labelStyle={styles.buttonTabBarText}
                />
                <Button
                  title={Strings.captureDcr}
                  mode="contained"
                  contentStyle={styles.buttonTabBar}
                  labelStyle={styles.buttonTabBarText}
                />
              </>
            )}
            <Button
              title={Strings.startEdetail}
              mode="outlined"
              contentStyle={styles.buttonTabBar}
              labelStyle={styles.buttonTabBarText}
            />
            <Button
              title={Strings.captureDcr}
              mode="contained"
              contentStyle={styles.buttonTabBar}
              labelStyle={styles.buttonTabBarText}
            />
          </View>
        </View>
        <View style={styles.MainDoctorDetail}>
          <View style={styles.doctorDetail}>
            <View style={styles.container}>
              <Image
                style={[styles.image]}
                source={require('../../../assets/images/avtar.png')}
              />
              <View style={styles.nameContainer}>
                <Label
                  title={doctorData.name}
                  size={16}
                  style={styles.doctorName}
                />
                <View style={styles.location}>
                  <Label
                    size={12}
                    title={doctorData.specialization
                      .map(spec => spec)
                      .join(', ')}
                  />
                  <Label size={12} title={',' + doctorData.location} />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.anniversy}>
            <View style={styles.birthdayClass}>
              <Birthday width={15} height={15} />
              <Label
                size={10}
                style={styles.dateClass}
                title={dateFormate(doctorData.birthday)}
              />
            </View>
            <View style={styles.birthdayClass}>
              <Anniversary width={15} height={15} />
              <Label
                size={10}
                style={styles.dateClass}
                title={dateFormate(doctorData.anniversary)}
              />
            </View>
          </View>
          <View style={styles.engment}>
            <Label size={12} style={styles.dateClass} title={''} />
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
