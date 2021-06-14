import React from 'react';
import {View} from 'react-native';
import {Label, LabelVariant} from 'components/elements';
import {Bar} from 'react-native-progress';
import styles from './styles';
import {ArrowUp} from 'assets';
import {Strings} from 'common';
import theme from 'themes';
import {OpenTask} from 'screens/directory';

/**
 * Custom doctor details component render after click on doctor list.
 * This serves the purpose to make the use of doctor details consistent throughtout the app
 * @param {Object} route route to navigate
 */

const PriorityProduct = ({data}) => {
  /**
   * Function to render the Product Card
   * @returns a Card with Product Detail
   */
  const product = () => {
    return (
      <View style={styles.tabMainContainer}>
        <View style={styles.productMainContainer}>
          <View style={styles.headerProduct}>
            <Label
              variant={LabelVariant.h3}
              style={styles.mainHeader}
              title={Strings.priorityProductCard.header}
            />
            {/* <Label
              variant={LabelVariant.bodySmall}
              style={styles.count}
              title={Strings.priorityProductCard.two}
            /> */}
          </View>
          <View style={styles.cardMainContainer}>
            <View style={styles.cardContainer}>
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderTitle}>
                  <Label
                    variant={LabelVariant.subtitleSmall}
                    style={styles.labelTitle}
                    title={Strings.priorityProductCard.amlokindAt}
                  />
                </View>
                <View style={styles.cardHeaderRightTitle}>
                  <Label
                    variant={LabelVariant.label}
                    style={styles.labelSubTitle}
                    title={Strings.priorityProductCard.p1}
                  />
                </View>
              </View>
              <View style={styles.cardDetail}>
                <Label
                  variant={LabelVariant.bodySmall}
                  textColor={theme.colors.primary}
                  style={styles.labelSubHeader}
                  title={Strings.priorityProductCard.description}
                />
              </View>
              <View style={styles.cardDetail}>
                <Label
                  style={styles.progressText}
                  title={Strings.priorityProductCard.progressNumber}
                />
                <Label
                  style={styles.progressLightText}
                  title={Strings.priorityProductCard.slashNumber}
                />
                <ArrowUp style={styles.arrowUp} width={15} height={15} />
                <Label
                  style={styles.percentageText}
                  title={Strings.priorityProductCard.nine}
                />
              </View>
              <View style={styles.progreesBar}>
                <Bar
                  progress={0.6}
                  width={200}
                  borderWidth={0}
                  unfilledColor={theme.colors.blue[300]}
                  color={theme.colors.blue[200]}
                />
              </View>
              <View>
                <Label
                  variant={LabelVariant.label}
                  textColor={theme.colors.grey[1100]}
                  style={styles.descriptionText}
                  title={Strings.priorityProductCard.tabDes?.toUpperCase()}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.openMainTask}>{<OpenTask />}</View>
      </View>
    );
  };

  return product();
};

export default PriorityProduct;
