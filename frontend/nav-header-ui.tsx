import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from './style';
import { SetSchedule } from './scheduler';
import { Preset_edit_screen } from './preset_edit_screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type CustomHeaderProps={
    title:String;
}

export const CustomHeader = ({title }:CustomHeaderProps) => {
  const nav = useNavigation<NavigationProps>()
  console.log(nav.getParent(),"hhh")
    return(
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>nav.navigate('Home',{name:"User"})}> 
          <Text style={styles.logo}>{title}</Text> 
        </TouchableOpacity>
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