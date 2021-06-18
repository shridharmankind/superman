import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './src/app.json';
import {TestTask} from './src/utils/backgroundTask';
import {isWeb} from './src/helper';
const TASK_ID = 'TASK_SYNC_ADAPTER';
if(!isWeb()){
try {
    AppRegistry.cancelHeadlessTask(TASK_ID, TASK_ID);
  } catch (e) {}
AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerCancellableHeadlessTask(
  TASK_ID,
  () => TestTask,
  () => {},
);
}
else{
  AppRegistry.registerComponent(appName, () => App);
}
