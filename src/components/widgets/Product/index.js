import React from 'react';
import styles from './styles';
import {View, Image} from 'react-native';
import {Label} from 'components/elements';
import {ProductImage} from 'assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import themes from 'themes';

const Product = props => {
  return (
    <View style={[styles.product, props.style]}>
      {props.isChecked && (
        <View style={styles.productCheck}>
          <Icon
            name="check-circle"
            size={16}
            color={themes.colors.checkCircleBlue}
          />
        </View>
      )}
      <Image
        style={[styles.productImage, props.imageStyle]}
        source={props.imageSource}
      />
      <Label style={[styles.productTitle]} title={props.title} />
    </View>
  );
};

Product.defaultProps = {
  imageSource: ProductImage,
};
export default Product;
