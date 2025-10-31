// A Small Selection menu to add Cards for container

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Cards, CardContiner } from './preset_edit_screen';

//temp data for database
//its better to be hardcoded
const MENU_ITEMS = [
  { Card: Cards.Name,  group:CardContiner.Options,  label: 'Name',   limit: 1 },
  { Card: Cards.Time,  group:CardContiner.Schedule, label: 'Time',   limit: 10 },
  { Card: Cards.Days,  group:CardContiner.Schedule, label: 'Days',   limit: 10 },
  { Card: Cards.Week,  group:CardContiner.Schedule, label: 'Week',   limit: 1 },
  { Card: Cards.Month, group:CardContiner.Schedule, label: 'Months', limit: 10 },
];

type QuickAddMenuProps = {
  onAddItem: (cardType: string, group:string) => void; // A function that takes a string and returns nothing
  onClose: () => void;                   // A function that takes nothing and returns nothing
  ContinerGroup: string
  data: String[]
};

export const QuickAddMenu = ({ onAddItem, onClose, ContinerGroup ,data }:QuickAddMenuProps) => {
  // console.log(data)
  return (
    // Use a Pressable to cover the screen and close the menu when tapping outside
    <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.menuContainer}>
          {MENU_ITEMS
          .filter(item=> item.group == ContinerGroup)
          .filter(item=> item.limit > CountCards(data,item.Card))
          .map(item =>(
            <TouchableOpacity
            key={item.Card}
            style={styles.menuItem}
            onPress={() => [onAddItem(item.Card,item.group),onClose]}
            >
            <View style={styles.RowContainer}>
              <Text style={styles.menuText}>{item.label}</Text>
              <Text style={styles.menuText}>
                ({CountCards(data,item.Card)}/{item.limit})
                </Text>
            </View>
            </TouchableOpacity>
          ))}
        </View>
    </Pressable>
  );
};

const CloseMenu =(onClose:()=>void)=>{
  onClose()
  return null
}
// to count how any cards are been used to set limit to usage
const CountCards = (data:String[],Card:Cards) =>{
  let TotalCards:number = 0
  data.forEach(i => {
    i==Card? TotalCards=TotalCards+1:null
  });
  return TotalCards
}


const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#52404053'
  },
  menuContainer: {
    backgroundColor: '#36302bed',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 7,
    width:180,
    elevation: 10,
    shadowColor: '#000000ff',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    marginTop:2,
    paddingVertical: 10,
    backgroundColor:'#5a5050ff',
    borderRadius:3,
    // paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#e9dc92ff',
    paddingHorizontal:10

  },
    RowContainer:{
    flexDirection:"row",
    justifyContent:'space-between'
    
  },
});