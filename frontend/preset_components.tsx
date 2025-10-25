import React,{useState} from 'react';
import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity, Animated } from 'react-native';
import DatePicker from 'react-native-date-picker';

export enum Cards {
  Name="NameCard",
  Week="WeekCard",
  Days="DayCard",
  Time="TimeCard",
}

export const NameCard= () => {
  return (
    <TouchableOpacity activeOpacity={1} style={[general_style.container,general_style.row_container]}>
      <View style={general_style.Section}>
        <Text style={general_style.title}>Name</Text>
      </View>
      <View style={general_style.Section}>
        <TextInput
          style={general_style.TextBox}
          placeholder="Time-pass"
           placeholderTextColor="#a9a9a9d3"
        />
      </View>

    </TouchableOpacity>
  );
};

export const WeeksCard= () => {
  return (
   <TouchableOpacity activeOpacity={1} style={[general_style.container,general_style.row_container]}>
      <View style={general_style.Section}>
        <Text style={general_style.title}>Week</Text>
      </View>
      <View >
        <TextInput
          style={general_style.TextBox}
          placeholder="1"
          placeholderTextColor="#a9a9a9d3"
        />
      </View>

    </TouchableOpacity>
  );
};

export const DaysCard = () => {
  const DaysButtons= (day:string) =>{
    return(
    <TouchableOpacity activeOpacity={1} style={general_style.Buttons}>
      <Text style={days_sp_style.ButtonsTexts}>{day}</Text>
    </TouchableOpacity>
    )
  }
  return(
    <TouchableOpacity activeOpacity={1} style={[general_style.container]}>
      <View style={general_style.Section}>
        <Text style={general_style.title}>Days</Text>
      </View>
      <View style={[general_style.Section,general_style.row_container]}>
        {DaysButtons("Sun")}
        {DaysButtons("Mon")}
        {DaysButtons("Tue")}
        {DaysButtons("Wed")}
        {DaysButtons("Thu")}
        {DaysButtons("Fri")}
        {DaysButtons("Sat")}
      </View>
    </TouchableOpacity>
  );
};

export const TimeCard = () =>{
  const [open, setOpen] = useState(false);
  const [value, onChange] = useState(new Date());
  return(
  <TouchableOpacity activeOpacity={1} style={[general_style.container]}>
    <View style={general_style.row_container}>
    <View style={general_style.Section}>
      <Text style={general_style.title}>Time</Text>
    </View>
      <TouchableOpacity style={[general_style.Buttons,Time_sp_style.DatePicker]} onPress={()=>setOpen(true)}>
        <DatePicker
          modal
          mode='time'
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
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
  )
}

const general_style = StyleSheet.create({
  container: {
    marginTop:10,
    width: '100%',
    backgroundColor:'#465736ff',
    borderRadius:10,
  },
  Section:{
    minHeight:45,
    paddingHorizontal:10,
    paddingTop:5,
    justifyContent:'space-evenly',
  },
  row_container:{
    flexDirection:"row",
  },
  title: {
    color:'#ffffffff',
    fontSize: 17,
  },
  Buttons:{
    backgroundColor:'#7f7737ff',
    minWidth:30,
    maxHeight:30,
    paddingHorizontal:6,
    marginHorizontal:1,
    borderRadius:7,
    justifyContent:'center'
  },

  TextBox: {
    backgroundColor: '#76767208',
    textAlign:"center",
    textShadowColor:"#171714aa",
    color: '#ffffffff',
    width: '100%',
    borderColor: 'black',
    borderBottomWidth: 1,
    minWidth:150,
    marginLeft:10,
    marginVertical:1,
    borderRadius:3,
  }
});

const days_sp_style=StyleSheet.create({
  ButtonsTexts:{
    fontFamily:'monospace',
    fontSize:13,
    textAlign:'center',
    color:'#ffffffff',
  },
});
const Time_sp_style=StyleSheet.create({
  DatePicker:{
    // marginVertical:50,
    // paddingBottom:20,

  },
});
