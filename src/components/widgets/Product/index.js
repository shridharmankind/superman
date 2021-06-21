import React from 'react';
import styles from './styles';
import {View, Image, TouchableOpacity} from 'react-native';
import {Label, LabelVariant} from 'components/elements';
import {ProductImage} from 'assets';
import Icon from 'react-native-vector-icons/FontAwesome';
import themes from 'themes';

const Tag = props => {
  return (
    <View style={styles.focus}>
      <Label
        variant={LabelVariant.label}
        style={styles.productTag}
        title={props.title}
      />
    </View>
  );
};

const Product = props => {
  return (
    <TouchableOpacity onPress={props.onProductClick}>
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
        <TouchableOpacity onPress={props.onImageClick}>
          <Image
            style={[styles.productImage, props.imageStyle]}
            source={props.imageSource}
          />
        </TouchableOpacity>
        <View style={[styles.productTitleWrapper]}>
          <Label style={[styles.productTitle]} title={props.title} />
          <View style={[styles.productTags]}>
            {props.tags?.map(tag => (
              <Tag title={tag} />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Product.defaultProps = {
  imageSource: ProductImage,
};
export default Product;
