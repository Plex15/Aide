import React,{useState} from 'react';
import { StyleSheet } from "react-native";
import { TouchableOpacity,View, Text,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type preset_list={
  name:string,
  desc:string,
  time:Date
}


export const PresetContainers =({name,desc,time}:preset_list)=>{
  const nav = useNavigation<NavigationProps>()
  return(
    <TouchableOpacity style={preset_style.itemContainer} onPress={()=>nav.navigate('Presetsetting')}>
    <View style={preset_style.textContainer}>
        <Text style={preset_style.name}>{name}</Text>
        <Text style={preset_style.lastMessage}>{desc}</Text>
    </View>
    <View style={preset_style.infoContainer}>
        <Text style={preset_style.timestamp}>{time.getHours()}:{time.getMinutes()}</Text>
        <TouchableOpacity style={preset_style.EditButton} > 
          <Text style={preset_style.name}>EDIT</Text>
        </TouchableOpacity>
    </View> 
    </TouchableOpacity>
  )
}

export const preset_style = StyleSheet.create({
    itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1d6a2ff',
    alignItems: 'center',
    width:270
  },
   textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'rgba(202, 192, 0, 1)',
  },
  lastMessage: {
    fontSize: 14,
    padding:0,
    paddingStart:10,
    color: 'rgba(224, 219, 219, 1)',
  },
  infoContainer: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(224, 219, 219, 1)',
    justifyContent:'center'
  },
  EditButton:{
    color: 'rgba(255, 255, 255, 1)',
    justifyContent:'center'
  }
});