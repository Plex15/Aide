import React,{useState} from 'react';
import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity, Animated } from 'react-native';
import DatePicker from 'react-native-date-picker';

export enum Cards {
  Name="NameCard",
  Week="WeekCard",
  Days="DayCard",
  Time="TimeCard",
  Month="MonthCard",
}

const card_data={
  Week  : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
  Month : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] 
  
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
      <View style={general_style.Section}>
        <TouchableOpacity style={general_style.Buttons}>
          <Text style={general_style.ButtonsTexts}>X</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export const WeeksCard= () => {
  const [selected,Select] = useState<string[]>(card_data.Week)
  const ToggleSelection=(selection:string)=>{
    if (selected.includes(selection)){
      Select(selected.filter(item=>item !==selection))
    }
    else{
      Select([...selected,selection])
    }
  }
  return (
   <TouchableOpacity activeOpacity={1} style={[general_style.container,general_style.row_container]}>
      <View style={general_style.Section}>
        <Text style={general_style.title}>Week</Text>
      </View>
      <View>
        <TextInput
          style={general_style.TextBox}
          placeholder="1"
          placeholderTextColor="#a9a9a9d3"
        />
      </View>
      <View style={general_style.Section}>
        <TouchableOpacity style={general_style.Buttons}>
          <Text style={general_style.ButtonsTexts}>X</Text>
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
  );
};

export const DaysCard = () => {
  const [selected,Select] = useState<string[]>(card_data.Week)
  console.log(selected)
  const ToggleSelection=(selection:string)=>{
    if (selected.includes(selection)){
      Select(selected.filter(item=>item !==selection))
    }
    else{
      Select([...selected,selection])
    }
  }
  const DaysButtons= (day:string) =>{
    return(
    <TouchableOpacity 
    activeOpacity={1} 
    onPress={()=>ToggleSelection(day)}
    style={[
        general_style.Buttons,general_style.InActButtons ,
        selected.includes(day) && general_style.ActButtons,
    ]}>
      
      <Text style={general_style.ButtonsTexts}>{day}</Text>
    </TouchableOpacity>
    )
  }
  return(
    <TouchableOpacity activeOpacity={1} style={[general_style.container]}>
      <View style={general_style.row_container}>
        <View style={general_style.Section}>
          <Text style={general_style.title}>Days</Text>
        </View>
          <View style={general_style.Section}>
          <TouchableOpacity style={general_style.Buttons}>
            <Text style={general_style.ButtonsTexts}>X</Text>
          </TouchableOpacity>
        </View>
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
    <View style={[general_style.row_container,Time_sp_style.DatePicker]}>
        <View style={general_style.Section}>
          <Text style={general_style.title}>Time</Text>
        </View>
        <View style={general_style.row_container}>
          <TouchableOpacity style={[general_style.Buttons,Time_sp_style.Button]} onPress={()=>setOpen(true)}>
          <Text style={general_style.ButtonsTexts}>Change</Text>
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
        <View style={general_style.Section}>
          <TouchableOpacity style={general_style.Buttons}>
            <Text style={general_style.ButtonsTexts}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </TouchableOpacity>
  )
}

export const MonthsCard = () => {
  const [selected,Select] = useState<string[]>(card_data.Month)
  const ToggleSelection=(selection:string)=>{
    if (selected.includes(selection)){
      Select(selected.filter(item=>item !==selection))
    }
    else{
      Select([...selected,selection])
    }
  }
  const MonthsButtons= (month:string) =>{
    return(
    <TouchableOpacity 
    activeOpacity={1} 
    onPress={()=>ToggleSelection(month)}
    style={
      [  general_style.Buttons,general_style.InActButtons,
         selected.includes(month) && general_style.ActButtons
      ]
    }
     
      >
      <Text style={[general_style.ButtonsTexts]}>{month}</Text>
    </TouchableOpacity>
    )
  }
  return(
    <TouchableOpacity activeOpacity={1} style={[general_style.container]}>
      <View style={[general_style.row_container]}>
        <View style={general_style.Section}>
        <Text style={general_style.title}>Months</Text>
        </View>
        <View style={general_style.Section}>
          <TouchableOpacity style={general_style.Buttons}>
            <Text style={general_style.ButtonsTexts}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[general_style.Section,general_style.row_container]}>
        {MonthsButtons("Jan")}
        {MonthsButtons("Feb")}
        {MonthsButtons("Mar")}
        {MonthsButtons("Apr")}
        {MonthsButtons("May")}
        {MonthsButtons("Jun")}
      </View>
      <View style={[general_style.Section,general_style.row_container]}>
        {MonthsButtons("Jul")}
        {MonthsButtons("Aug")}
        {MonthsButtons("Sep")}
        {MonthsButtons("Oct")}
        {MonthsButtons("Nov")}
        {MonthsButtons("Dec")}
      </View>
    </TouchableOpacity>
  );
};

const general_style = StyleSheet.create({
  container: {
    marginTop:10,
    width: '98%',
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
    justifyContent:'space-between'
    
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
  InActButtons:{
    backgroundColor:'#43401dff',
  },
  ActButtons:{
    backgroundColor:'#7f7737ff',
  },
  ButtonsTexts:{
    fontFamily:'monospace',
    fontSize:13,
    textAlign:'center',
    color:'#ffffffff',
  },
  TextBox: {
    backgroundColor: '#76767208',
    textAlign:"center",
    textShadowColor:"#171714aa",
    color: '#ffffffff',
    width: '100%',
    borderColor: 'black',
    borderBottomWidth: 1,
    minWidth:120,
    marginLeft:10,
    marginVertical:1,
    borderRadius:3,
  }
});

const days_sp_style=StyleSheet.create({
  ButtonsTexts:{
    fontSize:13,
  },
});
const Time_sp_style=StyleSheet.create({
  DatePicker:{
    justifyContent:"space-between"
    // marginVertical:50,
    // paddingBottom:20,

  },
  Button:{
    marginRight:10,
    marginTop:10,
    // width:10,
    alignItems:"center"
  },
});
