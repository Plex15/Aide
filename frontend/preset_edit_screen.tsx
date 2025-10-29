// Preset Continers for Cards 
// which used for Preset Customization of a task

import React, {useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { QuickAddMenu } from './Preset_card_selector';
import {
  NameCard,
  WeeksCard,
  DaysCard,
  TimeCard,
  MonthsCard,
} from './preset_cards_compo';

export enum Cards {
  Name="NameCard",
  Week="WeekCard",
  Days="DayCard",
  Time="TimeCard",
  Month="MonthCard",
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

type localCardData ={
  id   : number, //unique number
  card : string,
  group: string,
  data : string[],  //string array
}


export const Preset_edit_screen = () => {
  
  const [itemdata,UpdateList] = useState<localCardData[]>(
    [
      {id:Math.random(),card:Cards.Month,group:CardContiner.Schedule,data:[]}, 
      {id:Math.random(),card:Cards.Time,group:CardContiner.Schedule,data:[new Date(12).toISOString()]} 
    ])
  const [focused, OnFocusCards] = useState(["options"])
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [CardGroup,setGroup] = useState(String);
  
  const UpdateData =(CardData:string[],CardId:string)=>{
    UpdateList(NewData=>NewData.map(
      item => {if (item.id.toString() === CardId){
        return {...item,data:CardData}
      }
      return item;
    }
  ))
  console.log(CardData,'Update #3Zpes')
  }
  const AddList = (card: string,group:string) => {
    const data = card == Cards.Time ? new Date(12).toISOString() : String([])
    const NewData:localCardData={id:Math.random()*100,card,group,data:[data]}
    UpdateList([...itemdata,NewData])
    console.log(itemdata, "on addlist")
  }
  
  const RemoveList = (card: string) => {
    UpdateList(itemdata.filter(item=>item.id.toString()!==card))    // bug same mutile card of same type delete together
    console.log(card, "on removelist")
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
    return null
  }

  const Preset_card_section = (type: string, title: string) => {
    const Data = itemdata.filter(item=>item.group===type)
    
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
          />
        </View>

        {focused.toString() == type && (<FlatList
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
        <TouchableOpacity style={styles.Buttons}>
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

    // justifyContent: 'space-around',
  },
  PresetContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: "#171714aa",
    maxHeight: '55%',
    minWidth: '98%',
    borderRadius: 10,
    minHeight: 60,
    // justifyContent:'space-between',
    // alignItems:'center'
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
    height: 20,
    backgroundColor: '#D4AF37',
    margin: 3,
    borderRadius:10,
    alignContent:'flex-end'
    
  },
  Buttontext: {
    color: '#e9e39cff',
    fontSize: 20,
    fontFamily:'monospace',
    paddingHorizontal:10,
    paddingVertical:4
    
  },
  overlay: {
    // flexWrap:'wrap',
    // flexBasis:20,
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
    // backgroundColor:"#0000008b"
  },
  Buttons:{
    backgroundColor:'#9a7d1dff',
    borderWidth:2,
    borderRadius:10,
    borderColor:'#493115a5',
    justifyContent:'center'
  },
});
