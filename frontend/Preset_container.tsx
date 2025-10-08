import React,{useState} from 'react';
import { StyleSheet } from "react-native";
import { TouchableOpacity,View, Text,} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Triggerschedule } from './scheduler';

export type preset_list={
  name:string,
  desc:string,
  time:Date
}

export const PresetContainers =({name,desc,time}:preset_list)=>{
  const [open, setOpen] = useState(false);
  const [value, onChange] = useState(new Date());
  return(
    <TouchableOpacity style={preset_style.itemContainer} onPress={()=>Triggerschedule(value)}>
    <View style={preset_style.textContainer}>
        <Text style={preset_style.name}>{name}</Text>
        <Text style={preset_style.lastMessage}>{desc}</Text>
    </View>
    <View style={preset_style.infoContainer}>
        <Text style={preset_style.timestamp}>{time.getHours()}:{time.getMinutes()}</Text>
        <TouchableOpacity style={preset_style.EditButton} onPress={()=>setOpen(true)}>
          <Text style={preset_style.name}>EDIT</Text>
        </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={value} // Pass the Date object here
            onConfirm={(selectedDate) => {
              setOpen(false); // Close the modal
              onChange(selectedDate); // Update your state with the new date
            }}
            onCancel={() => {
              setOpen(false); // Close the modal
            }}
            />
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