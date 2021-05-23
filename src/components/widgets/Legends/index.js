import {Label} from 'components/elements';
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from 'themes';
import styles from './styles';
import {Strings} from 'common';
const LegendWrapper = props => {
  const {title, style} = props;
  return (
    <View style={styles.legendsContainer}>
      {props.children}
      {style && <View style={style}></View>}
      <Label style={[styles.contentBasicStyle]} title={title} size={14} />
    </View>
  );
};

/**
 * @returns Legends for MTP
 */

const Legends = () => {
  const legends = Strings.Legends;
  return (
    <View style={styles.container}>
      <LegendWrapper title={legends.kycDoctor}>
        <Icon name={'star'} size={14} color={theme.colors.orange} />
      </LegendWrapper>
      <LegendWrapper
        title={[legends.visitSchedule]}
        style={[styles.verticalBar, styles.scheduleVisits]}
      />

      <LegendWrapper
        title={legends.events}
        style={[styles.verticalBar, styles.events]}
      />

      <LegendWrapper
        title={legends.holiday}
        style={[styles.verticalBar, styles.holiday]}
      />
      <LegendWrapper title={legends.leave}>
        <View style={styles.barContainer}>
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </View>
      </LegendWrapper>
      <LegendWrapper title={legends.today} style={[styles.today]} />
    </View>
  );
};

export default Legends;
