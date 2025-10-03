import { AndroidCategory,AndroidImportance } from "@notifee/react-native";
import notifee from '@notifee/react-native';

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
    
    
    //const channelId = "importent" 
    
    await notifee.displayNotification({
        title: 'Full-screen notification', 
        body: 'Full-screen notification body',
        android: {
            channelId: 'importent', 
            
            smallIcon: 'ic_launcher',

            category: AndroidCategory.CALL,
            
            importance: AndroidImportance.HIGH,
            
           fullScreenAction: {
             id: 'full_screen_intent',
           },
            
            pressAction: {
              id: 'full_screen_intent', 
              launchActivity:interact_ui
            },
        },
    });

    await notifee.displayNotification({
      title: 'You got it working',
      body: 'but it will be harder next time',
      android: {
        channelId: "default",
        smallIcon: 'ic_launcher', 
        pressAction: {
          id: 'what',
        
        },
      },
    });

}
