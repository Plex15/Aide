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

export const Preset_edit_screen = () => {

  const [itemdata,UpdateList] = useState<string[]>([Cards.Month, Cards.Time, Cards.Days,Cards.Week,Cards.Name])
  const [focused, OnFocusCards] = useState(["options"])
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [CardGroup,setGroup] = useState(String);

  const AddList = (card: string) => {
    // itemdata.push(String(card))
    UpdateList([...itemdata,card])
    console.log(itemdata, "on addlist")
  }
  
  const RemoveList = (card: string) => {
    UpdateList(itemdata.filter(item=>item!==card))    // bug same mutile card of same type delete together
    console.log(itemdata, "on removelist")
  }
  
  const ChangeFocus = (state: string) => {
    if (state == focused.toString()) {
      OnFocusCards(["null"])
    }
    else {
      OnFocusCards([state])
    }
  }
  
  
  const GetCard = (item: string): React.ReactElement | null => {
    if (item == Cards.Name) {
      return <NameCard Remover={(card)=>RemoveList(card)}/>
    }
    if (item == Cards.Week) {
      return <WeeksCard Remover={(card)=>RemoveList(card)}/>
    }
    if (item == Cards.Days) {
      return <DaysCard Remover={(card)=>RemoveList(card)}/>
    }
    if (item == Cards.Time) {
      return <TimeCard Remover={(card)=>RemoveList(card)}/>
    }
    if (item == Cards.Month) {
      return <MonthsCard Remover={(card)=>RemoveList(card)}/>
    }
    return null
  }

  const Preset_card_section = (type: string, title: string) => {
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
          data={itemdata}                           // filter this to make individual items on each groups
          renderItem={({ item }) =>
            GetCard(item)
          }
          keyExtractor={(item, index) => index.toString()}
        />
        )}
      </TouchableOpacity>
    )
  }

  // UI of List and containers of cards in preset setting page
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
      />)
      }
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
  // input: {
  //   backgroundColor: '#1d1d1aff',
  //   color: '#ffffffff',
  //   height: 10,
  //   width: '40%',
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   padding: 10,
  //   justifyContent: 'center',
  //   marginLeft: 30,
  //   marginTop: 7,
  // },
  menuBar: {
    width: 25,
    height: 20,
    backgroundColor: '#D4AF37',
    margin: 3,
    borderRadius:10,
    alignContent:'flex-end'

  },
});
