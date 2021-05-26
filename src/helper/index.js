import {Platform} from 'react-native';

import * as KeyChain from './keychain';
import CircularProgressBarWithStatus from './progressBar';

export const isWeb = () => Platform.OS === 'web';

export {KeyChain, CircularProgressBarWithStatus};
