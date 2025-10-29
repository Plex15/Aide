// import { AndroidCategory,AndroidImportance } from "@notifee/react-native";

import notifee,{ AuthorizationStatus,TimestampTrigger, TriggerType } from '@notifee/react-native';
import { Schedule_notify } from "./notification";

export type schedule_type={
    Hour : number,
    Minute: number,
    Seconds: number
};



export const SetSchedule=(num:number)=>{
    const crt_time = new Date(Date.now());
    const scheduled_time = new Date(Date.now());
    // set time to schedule for notifee
    scheduled_time.setSeconds(crt_time.getSeconds()+num);
    console.log(crt_time+"\n"+scheduled_time+"\n\n"); 
    
    Triggerschedule(scheduled_time); 
    
}
export async function Triggerschedule(schedule:Date){
  console.log(schedule);
  const settings = await notifee.requestPermission();
  if (settings.authorizationStatus < AuthorizationStatus.AUTHORIZED) {
    console.log('User denied notification permissions.');
    return;
  }
    const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: schedule.getTime(), 
    };
  Schedule_notify(1,trigger)  //1 int is passed as task id reminder to change that ater database set
    
}


