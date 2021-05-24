import {Platform} from 'react-native';

import * as KeyChain from './keychain';

export const isWeb = () => Platform.OS === 'web';

export {KeyChain};
