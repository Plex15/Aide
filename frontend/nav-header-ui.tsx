import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from './style';
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
        <TouchableOpacity onPress={()=>nav.canGoBack()? nav.goBack():null}> 
          <Text style={styles.logo}>{title}</Text> 
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={()=>nav.canGoBack()? nav.goBack():null}
        >
          <View style={styles.menuBar} />
          <View style={styles.menuBar} />
          <View style={styles.menuBar} />
        </TouchableOpacity>
      </View>)
}