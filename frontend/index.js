/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import FullScreenInterface from './FullScreenInterface'
import notifee,{EventType} from '@notifee/react-native'

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerComponent('FullScreenInterface', () => FullScreenInterface)

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  console.log('[Background Event]', EventType[type],);

  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    console.log('User pressed the "Mark as Read" action in the background.');

    if (notification) {
      await notifee.cancelNotification(notification.id);
    }
  }

  if (type === EventType.DELIVERED) {
      console.log('Notification was delivered in the background:', notification?.id);

  }
});