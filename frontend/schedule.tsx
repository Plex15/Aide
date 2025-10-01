import notifee from '@notifee/react-native';

export async function onDisplayNotification() {
     console.log("noti");
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    await notifee.createChannelGroup({
      id : 'mug',
      name: 'idk why '
    });
    // Create a channel (required for Android)
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

     await notifee.createChannel({
      id: 'importent',
      name: 'importent Channel',
      groupId: 'mug' 
    });
    
    
    const channelId = "importent" 
    
    await notifee.displayNotification({
      title: 'You got a mug',
      body: 'but i will take it away',
      android: {
        channelId,
        smallIcon: 'ic_launcher', 
        pressAction: {
          id: 'what',
        },
      },
    });
  }
