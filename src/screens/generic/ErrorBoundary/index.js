import {Label, LabelVariant} from 'components/elements';
import {translate} from 'locale';
import React from 'react';
import {View} from 'react-native';

import styles from './styles';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // firebase crashlytics integration
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Label variant={LabelVariant.h3}>
            {translate('error.genericMsg')}
          </Label>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
