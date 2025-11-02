// Preset Continers for Cards 
// which used for Preset Customization of a task

import React, {useState,Dispatch,SetStateAction, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { SaveData } from './preset_DB_save';
import { QuickAddMenu } from './Preset_card_selector';
import {
  NameCard,
  WeeksCard,
  DaysCard,
  TimeCard,
  MonthsCard,
  DescCard,
  ThemeCard,
  TitleCard,
  SpacingCard,
} from './preset_cards_compo';
import { GetCardData } from './src/services/card_DB';
import { PresetScreenProps } from './App';




export enum Cards {
  Name="NameCard",
  Desc="DescCard",
  Week="WeekCard",
  Days="DayCard",
  Time="TimeCard",
  Month="MonthCard",
  Screen="StyleCard",
  Theme="ThemeCard",
  Title="TitleCard",
  Space="SpacingCard",
}

export enum CardContiner {
  Options = "option",
  Schedule = "schedule",
  Constrain = "constrain",
  style = "style"
}
// Note: currently it used with navigation 
// to pass task_id for task specific data retrive i called from:
// preset_ui -> Preset_container => Preset_edit_screen (current) pass task_id parameter from preset_ui

export type LocalDataHook = [
  localCardData[],
  Dispatch<SetStateAction<localCardData[]>>
];

export type localCardData ={
  id         : number,   //unique number
  schedule_id: number,
  card       : string,
  card_group : string,
  data       : string[], //string array
}



export const LocalCard=(scheduleId:number)=>{
  //   [{id:1,schedule_id:1,card:Cards.Month,group:CardContiner.Schedule,data:[""]}] 
  const [itemdata,UpdateList] = useState<localCardData[]>([])
  const [IsLoading,setIsLoading] = useState(true)
    useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ALL card data from the database
        const allCardData = await GetCardData(); 
        
        // Filter the data for the current schedule ID
        const initialData = allCardData.filter(item => item.schedule_id === scheduleId);
        console.log(initialData)
        // Initialize the state with the filtered data
        UpdateList(initialData);
      } catch (e) {
        console.error("Failed to fetch initial card data:", e);
        // Optionally set a flag for error state
      } finally {
        setIsLoading(false); // Data loading is complete
      }
    };
    
    fetchData();
  }, [scheduleId]);
  return {itemdata,UpdateList,IsLoading}
}

export const Preset_edit_screen = ({route}:PresetScreenProps) => {
  const [schedule_id,UpdateScheduleID] = useState(route.params.id);
  const [RmList, setRmList] = useState<number[]>([]);
  const {itemdata,UpdateList,IsLoading} = LocalCard(schedule_id) ;
  const [focused, OnFocusCards] = useState(["options"]);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [CardGroup,setGroup] = useState(String);
  if(IsLoading){
    
    return(
      <View style={styles.unloaded}><Text style={styles.iconAdd}>Loading...</Text></View>
    )
  }
  
  const UpdateData =(CardData:string[],CardId:string)=>{
    UpdateList(NewData=>NewData.map(
      item => {if (item.id.toString() === CardId){
        return {...item,data:CardData}
      }
      return item;
    }
  ))
  // console.log(CardData,'Update #3Zpes')
  }
  const AddList = (card: string,card_group:string) => {
    const data = card == Cards.Time ? new Date(12).toISOString() : String([])
    const NewData:localCardData=
      card==Cards.Time?
      {id:Math.random(),schedule_id,card,card_group,data:[String(false),data,data]}:
      {id:Math.random(),schedule_id,card,card_group,data:[data]}
      
    UpdateList([...itemdata,NewData])
    console.log(itemdata, "on addlist")
  }
  
  const RemoveList = (id: string) => {
    UpdateList(itemdata.filter(item=>item.id.toString()!==id))    // bug same mutile card of same type delete together
    setRmList([...RmList,Number(JSON.parse(id))])
    console.log(id, "on removelist")
  }
  
  const ChangeFocus = (state: string) => {
    if (state == focused.toString()) {
      OnFocusCards(["null"])
    }
    else {
      OnFocusCards([state])
    }
  }
  
  
  const GetCard = (item: string, cardID:string,cardData:string[]): React.ReactElement | null => {
    if (item == Cards.Name) {
      return <NameCard 
      Remover={(card)=>RemoveList(card)} 
      UpdateData={(data,id)=>UpdateData(data,id)}
      id={cardID}
      data={cardData}

      />
    }
    if (item == Cards.Desc) {
      return <DescCard 
      Remover={(card)=>RemoveList(card)} 
      UpdateData={(data,id)=>UpdateData(data,id)}
      id={cardID}
      data={cardData}

      />
    }
    if (item == Cards.Week) {
      return <WeeksCard
      UpdateData={(data,id)=>UpdateData(data,id)}
      Remover={(card)=>RemoveList(card)} 
      data={cardData} 
      id={cardID} 
      />
    }
    if (item == Cards.Days) {
      return <DaysCard 
      UpdateData={(data,id)=>UpdateData(data,id)}
      Remover={(card)=>RemoveList(card)} 
      data={cardData}
      id={cardID} 
      />
    }
    if (item == Cards.Time) {
      // console.log(cardData,cardID,"on time instance-----------------")
      return <TimeCard 
      UpdateData={(data,id)=>UpdateData(data,id)}
      Remover={(card)=>RemoveList(card)} 
      data={cardData}
      id={cardID} 
      TimePeriod={false}
      />
    }
    if (item == Cards.Month) {
      return <MonthsCard 
      UpdateData={(data,id)=>UpdateData(data,id)}
      Remover={(card)=>RemoveList(card)} 
      data={cardData}
      id={cardID} 
      />
    }
    if (item == Cards.Theme) {
      return <ThemeCard 
      UpdateData={(data,id)=>UpdateData(data,id)}
      Remover={(card)=>RemoveList(card)} 
      data={cardData}
      id={cardID} 
      />
    }
    if (item == Cards.Title) {
      return <TitleCard 
      UpdateData={(data,id)=>UpdateData(data,id)}
      Remover={(card)=>RemoveList(card)} 
      data={cardData}
      id={cardID} 
      />
    }
    if (item == Cards.Space) {
      return <SpacingCard 
      UpdateData={(data,id)=>UpdateData(data,id)}
      Remover={(card)=>RemoveList(card)} 
      data={cardData}
      id={cardID} 
      />
    }
    return null
  }

  const Preset_card_section = (type: string, title: string) => {
    const Data = itemdata.filter(item=>item.card_group===type)
    
    return (
      <TouchableOpacity
        style={styles.PresetContainer}
        activeOpacity={.95}
        onPress={() => ChangeFocus(type)}>

        <View style={styles.row_container}>               
          <Text style={[styles.title]}>{title}</Text>
          <TouchableOpacity
            style={styles.menuBar}
            onPress={() => [setMenuVisible(true),setGroup(type)]} 
          >
            <FontAwesome6 name='plus' iconStyle='solid' style={styles.iconAdd}/>
          </TouchableOpacity>

        </View>

        {focused.toString() == type && (
          <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:20}}
          data={Data} 
          renderItem={({ item }) =>
            GetCard(item.card,item.id.toString(),item.data)
          }
          keyExtractor={(item) => item.id.toString()}
        />
        )}
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      {
      Preset_card_section(
        CardContiner.Options,
        "Option"
      )
      }

      {Preset_card_section(
        CardContiner.Schedule,
        "Trigger"
      )
      }
      {Preset_card_section(
        CardContiner.Constrain,
        "Constrain"
      )
      }
      {Preset_card_section(
        CardContiner.style,
        "Screen"
      )
      }
 


      {isMenuVisible && (<QuickAddMenu
        onAddItem={AddList}
        onClose={() => setMenuVisible(false)}
        ContinerGroup={CardGroup}
        data={itemdata.map(item=>item.card)}
      />)
      }
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.Buttons} onPress={()=>SaveData(itemdata,RmList,setRmList,UpdateScheduleID,schedule_id)}>
          <Text style={styles.Buttontext}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  '#2B2B2B',
    alignItems: 'center',
  },
  unloaded:{
    flex: 1,
    backgroundColor:  '#1f1c1cd6',
    alignItems: 'center',

  },
  PresetContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: "#171714aa",
    maxHeight: '55%',
    minWidth: '98%',
    borderRadius: 10,
    minHeight: 60,
  },
  iconAdd:{
    paddingVertical:3,
    fontSize:15,
    textAlign:'center',
    color:'#000000d4'
  },
  row_container: {
    flexDirection:"row",
    maxWidth:"98%",
    marginVertical:10,
    justifyContent:'space-between',
    alignItems:'center'
  },
  title: {
    color: '#e9e39cff',
    fontSize: 20,
    minHeight:40,
  },
  menuBar: {
    width: 25,
    backgroundColor: '#D4AF37',
    margin: 3,
    borderRadius:7,
    alignContent:'flex-end'
    
  },
  Buttontext: {
    color: '#000000ff',
    fontSize: 20,
    fontWeight:'bold',
    fontFamily:'monospace',
    paddingHorizontal:10,
    paddingVertical:4
    
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    marginVertical:"78%",
    marginLeft:"70%",
    justifyContent: 'flex-end',
    alignContent:'flex-end',
    alignItems: 'center',
  },
  Buttons:{
    backgroundColor:'#D4AF37',
    borderWidth:2,
    borderRadius:10,
    borderColor:'#493115a5',
    justifyContent:'center'
  },
});
