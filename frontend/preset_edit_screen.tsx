// Preset Continers for Cards 
// which used for Preset Customization of a task

import React, {useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { QuickAddMenu } from './Preset_card_selector';
import {
  Cards,
  NameCard,
  WeeksCard,
  DaysCard,
  TimeCard,
  MonthsCard,
} from './preset_components';


// Note: currently it used with navigation 
// to pass task_id for task specific data retrive i called from:
// preset_ui -> Preset_container => Preset_edit_screen (current) pass task_id parameter from preset_ui

export const Preset_edit_screen = () => {

  const [focused, OnFocusCards] = useState(["options"])
  const itemdata:string[] = [Cards.Month, Cards.Time, Cards.Days,Cards.Week,Cards.Name]
  const [isMenuVisible, setMenuVisible] = useState(false);

  enum CardContiner {
    Options = "option",
    Schedule = "schedule",
    Constrain = "constrain",
    style = "style"
  }

  const AddList = (card: String) => {
    itemdata.push(String(card))
    console.log(itemdata, "on addlist")
  }

  const RemoveList = (card: string) => {
    itemdata.pop()
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
      return <NameCard />
    }
    if (item == Cards.Week) {
      return <WeeksCard />
    }
    if (item == Cards.Days) {
      return <DaysCard />
    }
    if (item == Cards.Time) {
      return <TimeCard />
    }
    if (item == Cards.Month) {
      return <MonthsCard />
    }
    return null
  }

  const Preset_card_section = (type: string, Card: string, title: string) => {
    return (
      <TouchableOpacity
        style={styles.PresetContainer}
        activeOpacity={.95}
        onPress={() => ChangeFocus(type)}>
        <View style={styles.row_container}>
          <Text style={[styles.title]}>{title}</Text>
          <TouchableOpacity
            style={styles.menuBar}
            onPress={() => setMenuVisible(true)} 
          />
        </View>

        {focused.toString() == type && (<FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:20}}
          data={itemdata}
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
        Cards.Name,
        "Option"
      )
      }

      {Preset_card_section(
        CardContiner.Schedule,
        Cards.Name,
        "Trigger"
      )
      }
      {Preset_card_section(
        CardContiner.Constrain,
        Cards.Week,
        "Constrain"
      )
      }
      {Preset_card_section(
        CardContiner.style,
        Cards.Name,
        "Screen"
      )
      }


      {isMenuVisible && (<QuickAddMenu
        // Pass the AddList function so the menu can call it
        onAddItem={AddList}
        // Pass a function to allow the menu to close itself
        onClose={() => setMenuVisible(false)}
      />)
      }
    </View>

  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#747e49ff',
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
