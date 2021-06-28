import React, {useEffect, useState} from 'react';
import {View, TextInput} from 'react-native';
import {ContentWithSidePanel} from 'components/layouts';
import {Label, LabelVariant} from 'components/elements';
import {Strings, Constants} from 'common';
import styles from './styles';
import {TabBar} from 'components/widgets';
import {SearchIcon} from 'assets';
import {Helper} from 'database';
/**
 * Custom Landing component of Directory Screen.
 * Initially click on directory left menu this component render
 */
const SettingLanding = ({navigation, route}) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [staffPositionId, setStaffPositionId] = useState(null);

  useEffect(() => {
    (async () => {
      const id = await Helper.getStaffPositionId();
      setStaffPositionId(id);
    })();
  });

  const data = [
    {
      text: `${Strings.setting.tab.conflicts}`,
    },
  ];

  // For rendering navbars
  const renderNavBar = () => {
    return (
      <View style={styles.mainTabContainer}>
        <TabBar
          values={data}
          onPress={onTabPress}
          customStyle={styles.tabBarContainer}
        />
      </View>
    );
  };

  /**
   * Function to set the state of Tab
   */
  const onTabPress = itemIdx => {
    setSelectedTabIndex(itemIdx);
  };

  // To render the tabs based on selected index
  const renderChildView = () => {
    switch (selectedTabIndex) {
      case 0:
        return conflictTab();
      default:
        return <Label title={Strings.comingSoon} />;
    }
  };

  // Below is the doctor tab under directory page
  const conflictTab = () => {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder={Strings.searchBar.searchPlaceholder}
            style={styles.searchBar}
          />
          <SearchIcon style={styles.searchIcon} height={16} width={16} />
        </View>
      </View>
    );
  };

  return (
    <ContentWithSidePanel header={renderNavBar()}>
      {renderChildView()}
    </ContentWithSidePanel>
  );
};

export default SettingLanding;
