import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from './style';
import { SetSchedule } from './scheduler';
import { Preset_edit_screen } from './preset_modifier';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type CustomHeaderProps={
    title:String;
}

export const CustomHeader = ({title }:CustomHeaderProps) => {
  const nav = useNavigation<NavigationProps>()
    return(
      <View style={styles.header}>
        <Text style={styles.logo}>{title}</Text>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={()=>nav.navigate("Presetsetting")}
        >
          <View style={styles.menuBar} />
          <View style={styles.menuBar} />
          <View style={styles.menuBar} />
        </TouchableOpacity>
      </View>)
}