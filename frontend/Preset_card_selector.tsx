// A Small Selection menu to add Cards for container

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Cards, CardContiner } from './preset_edit_screen';

//temp data for database
const MENU_ITEMS = [
  { type: Cards.Name,  group:CardContiner.Options,  label: 'Name' },
  { type: Cards.Time,  group:CardContiner.Schedule, label: 'Time' },
  { type: Cards.Days,  group:CardContiner.Schedule, label: 'Days' },
  { type: Cards.Week,  group:CardContiner.Schedule, label: 'Week' },
  { type: Cards.Month, group:CardContiner.Schedule, label: 'Months' },
];

type QuickAddMenuProps = {
  onAddItem: (cardType: string) => void; // A function that takes a string and returns nothing
  onClose: () => void;                   // A function that takes nothing and returns nothing
  ContinerGroup: string
};

export const QuickAddMenu = ({ onAddItem, onClose, ContinerGroup }:QuickAddMenuProps) => {
  // console.log(Card)
  return (
    // Use a Pressable to cover the screen and close the menu when tapping outside
    <Pressable style={styles.overlay} onPress={onClose}>
      <View style={styles.menuContainer}>
        {MENU_ITEMS
        .filter(item=> item.group == ContinerGroup)
        .map(item => (
          <TouchableOpacity
          key={item.type}
          style={styles.menuItem}
          onPress={() => onAddItem(item.type)}
          >
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // The rest of the styles are for positioning the menuContainer
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  menuContainer: {
    bottom: 90,
    right: 30,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
    color: 'black',
  },
});