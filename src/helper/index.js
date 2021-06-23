import {Platform} from 'react-native';

import * as KeyChain from './keychain';
import CircularProgressBarWithStatus from './progressBar';
import * as CustomHook from './customHook';

export const isWeb = () => Platform.OS === 'web';

export {KeyChain, CircularProgressBarWithStatus, CustomHook};
