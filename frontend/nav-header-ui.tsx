import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from './style';
import { SetSchedule } from './scheduler';

export type CustomHeaderProps={
    title:String;
}

export const CustomHeader = ({title }:CustomHeaderProps) => {
    return(
      <View style={styles.header}>
        <Text style={styles.logo}>{title}</Text>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={()=>SetSchedule(10)}
        >
          <View style={styles.menuBar} />
          <View style={styles.menuBar} />
          <View style={styles.menuBar} />
        </TouchableOpacity>
      </View>)
}