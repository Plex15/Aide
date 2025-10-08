import { TimestampTrigger,AndroidCategory,AndroidImportance } from "@notifee/react-native";
import notifee from '@notifee/react-native';
// import { SetSchedule } from "./scheduler";


const interact_ui = 'com.aide.FullScreenNotifee';

export async function onDisplayNotification() {
    // console.log("noti");
    // Request permissions 
    await notifee.requestPermission()

    await notifee.createChannelGroup({
      id : 'mug',
      name: 'idk why '
    });

    // Create a channel 
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

     await notifee.createChannel({
      id: 'importent',
      name: 'importent Channel',
      groupId: 'mug', 
      importance: AndroidImportance.HIGH
    });
    
}
  
export async function Schedule_notify(task_id:number,trigger:TimestampTrigger){
  await notifee.createTriggerNotification({
      title: 'Full-screen notification', 
      body: 'Full-screen notification body',
      android: {
          channelId: 'importent', 
          
          smallIcon: 'ic_launcher',

          category: AndroidCategory.ALARM,
          
          importance: AndroidImportance.HIGH,
          
          fullScreenAction: {
            id: 'full_screen_intent',
            launchActivity:interact_ui
          },
          
          pressAction: {
            id: 'full_screen_intent', 
            launchActivity:interact_ui
          },
      },
  },trigger);
}
