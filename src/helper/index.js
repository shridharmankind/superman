import {Platform} from 'react-native';

import * as KeyChain from './keychain';
import CircularProgressBarWithStatus from './progressBar';
import {Constants} from 'common';

export const isWeb = () => Platform.OS === 'web';

export {KeyChain, CircularProgressBarWithStatus};
