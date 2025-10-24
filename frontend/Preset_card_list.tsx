import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
// import { AddList } from './preset_modifier';
// A list of items that can be added
const MENU_ITEMS = [
  { type: 'NameCard', label: 'Add Name' },
  { type: 'WeekCard', label: 'Add Week' },
  // Add more predefined card types here
];

type QuickAddMenuProps = {
  onAddItem: (cardType: string) => void; // A function that takes a string and returns nothing
  onClose: () => void;                   // A function that takes nothing and returns nothing
};

export const QuickAddMenu = ({ onAddItem, onClose }:QuickAddMenuProps) => {
  return (
    // Use a Pressable to cover the screen and close the menu when tapping outside
    <Pressable style={styles.overlay} onPress={onClose}>
      <View style={styles.menuContainer}>
        {MENU_ITEMS.map(item => (
          <TouchableOpacity
            key={item.type}
            style={styles.menuItem}
            // --- FIX #7: When an item is pressed, call the function from the parent ---
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