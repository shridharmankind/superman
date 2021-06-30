import React from 'react';
import {View} from 'react-native';
import styles from './style';
import themes from 'themes';
import {Label, LabelVariant} from 'components/elements';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Custom PriorityCardWithCheckBox component
 * This serves the purpose to render customer priority card with checkbox
 * @param {Object} data  SubBrand Or SKU object
 * @param {Function} onItemChecked when click on any item
 */

const ProductWithCheckBox = ({data, onItemChecked}) => {
  return (
    <View style={styles.eDetailedNonFeature}>
      {!!data.isChecked && (
        <View style={styles.productCheck}>
          <Icon
            name="check-circle"
            size={16}
            color={themes.colors.checkCircleBlue}
          />
        </View>
      )}
      <Label
        variant={LabelVariant.subtitleLarge}
        title={data.name}
        onPress={() => {
          onItemChecked(data, !data.isChecked);
        }}
      />
    </View>
  );
};

export default ProductWithCheckBox;
