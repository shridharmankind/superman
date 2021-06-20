import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './src/app.json';
import {registerBackgroundTask} from './src/utils/backgroundTask/index';
const TASK_ID = 'TASK_SYNC_ADAPTER';

try {
  AppRegistry.cancelHeadlessTask(TASK_ID, TASK_ID);
} catch (e) {}
AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerCancellableHeadlessTask(
  TASK_ID,
  () => registerBackgroundTask,
  () => {},
);
