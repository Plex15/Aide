import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { CheckBox_StComp, Desc_StComp, Space_StComp, TextInput_StComp, Title_StComp } from './Screen_style_comp';
import { GetData } from './preset_DB_save';
import notifee from '@notifee/react-native';
import { GetCardData } from './src/services/card_DB';
import { TaskPreset } from './src/services/database';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { CardContiner, Cards } from './preset_edit_screen';


const checkBox:string[]=["Time to fly","Later","Now","Skip","Take"]
const checkBoxData:boolean[]=[false,true,false,true,true,false,false,true,false,false,true]


type NotifProp={
  taskId?: string; 
  rootTag: number; 

}

const FullScreenInterface = () => {
  const [Data, setData] = useState<TaskPreset[]>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // This function will run when the component mounts
    const getNotificationData = async () => {
      // Get the notification that launched the app/component
      const initialNotification = await notifee.getInitialNotification();

      if (initialNotification) {
        const id = initialNotification.notification.data?.task_id;
        if (id) {
          const taskid:number = JSON.parse(id.toString())
          const data =  await GetCardData()
          setData(data.filter(item=>item.schedule_id==taskid));
          setIsLoading(false);
        } else {
          console.log('ERROR: task_id not found in notification data.');
        }
      }
    };
    
    getNotificationData();
  }, []);
  if (isLoading) {
   return(<View style={styles.container}><Text>Loading...</Text></View>)
  }
  console.log(Data,"suposued id")
  return (
    
    <GestureHandlerRootView style={[styles.container,{backgroundColor: '#29382bff'}]}>
        
      {Data&&<FlatList
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{backgroundColor:"#0000004a",flex:1,alignItems:"stretch"}}
        data={Data.filter(item=>item.card_group==CardContiner.style)} 
        renderItem={({ item }) =>
          GetStyle(item.card)
      }
      keyExtractor={(item) => item.id.toString()}
      />
    }
  </GestureHandlerRootView>
  );
};

const GetStyle=(item: string)=>{
  console.log(item,"Ducker")
  if(item==Cards.Space){
    return(<Space_StComp spacing={2*10} MaxSpace={100}/>)
  }
  if(item==Cards.Title){
    return(<Title_StComp name='Study Time' position='center' color='#c3f9ffe8'/>)
  }
  return(<Space_StComp spacing={5*10} MaxSpace={100}/>)
  // return(<Desc_StComp name="Text area or so" position='flex-start' color='#ff8181ff'/>)
  // return(<Space_StComp spacing={2*10} MaxSpace={100}/>)
  // return(<CheckBox_StComp  DataText={checkBox} Data={checkBoxData} BoxSpace={3*5} Theme='#c3f9ffe8'/>)
  // return(<TextInput_StComp name='Are you fine?' position='flex-start' color='#c3f9ffe8'/>)
   
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color:'#ffffffff',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    color: '#ffffffff',
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  }
});

export default FullScreenInterface;