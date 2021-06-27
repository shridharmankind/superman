import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-paper';
import {Label, LabelVariant} from 'components/elements';
import styles from './styles';
import {Helper} from 'database';
import {isWeb} from 'helper';
import {ContentWithSidePanel} from 'components/layouts';
import {translate} from 'locale';
import {Sync} from 'database';

const HomeLanding = ({navigation}) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const firstName = await Helper.getUserName();
      firstName ? setUserName(firstName) : setUserName('');
    };
    if (!isWeb()) {
      loadData();
      Sync.SyncService.RegisterBackgroundTask();
    }
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <Label style={styles.headerLabel} title={`Hi ${userName || ''}`} />
      <Label
        style={styles.headerLabel}
        type="semiBold"
        title={translate('goodMorning')}
      />
    </View>
  );

  const renderSidePanel = () => (
    <View style={styles.sidePanel}>
      <View style={styles.descContainer}>
        <Label
          style={styles.desc}
          type="bold"
          size={14}
          title="Upcoming Events"
        />
        <Label
          size={12}
          style={styles.desc}
          title="Birthdays & Anniversaries"
        />
      </View>
      <Card style={styles.card}>
        <Label size={12.7} title="Dr. Brijesh Agarwal" />
      </Card>
      <Card style={styles.card}>
        <Label size={12.7} title="Dr. Radhika Rao" />
      </Card>
      <Card style={styles.card}>
        <Label size={12.7} title="Dr. Priya Singh" />
      </Card>
      <Card style={styles.card}>
        <Label size={12.7} title="Dr. Rajesh Chouhan" />
      </Card>
    </View>
  );

  return (
    <ContentWithSidePanel header={renderHeader()} sidePanel={renderSidePanel()}>
      <Label
        variant={LabelVariant.subtitleLarge}
        title="Welcome to our Home Page"
      />
    </ContentWithSidePanel>
  );
};

export default HomeLanding;
