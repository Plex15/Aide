import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';


type CardProp={
  id : string,
  data:string[]
  TimePeriod?: boolean
  Remover : (card:string) => void
  UpdateData : (data:string[],id:string) => void

}

enum DateForm{
  time,
  day,
}

const FormatDate=(value:Date,output:DateForm) =>{
  const hour_12h = value.getHours()%12!=0 ? value.getHours()%12 : 12
  const Period = value.getHours() < 12 ? 'AM':'PM'
  const min = value.getMinutes().toString().padStart(2,'0')
  if(output == DateForm.time){return String(hour_12h+":"+min+" "+Period)}
  return("ERROR 0:00")
}

export const NameCard= ({id,data,Remover,UpdateData}:CardProp) => {
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
          value={data[0]}
          onChangeText={(value)=>UpdateData([value],id)}
          />
      </View>
      <View style={general_style.Section}>
        <TouchableOpacity style={general_style.Buttons} onPress={()=>Remover(id)} >
          <Text style={general_style.ButtonsTexts}>X</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export const WeeksCard= ({id,data,Remover,UpdateData}:CardProp) => {
  return (
    <TouchableOpacity activeOpacity={1} style={[general_style.container,general_style.row_container]}>
      <View style={general_style.Section}>
        <Text style={general_style.title}>Week</Text>
      </View>
      <View>
        <TextInput
          style={general_style.TextBox}
          keyboardType='numeric'
          placeholder="1"
          placeholderTextColor="#a9a9a9d3"
          textAlign='center'
          value={data[0]}
          onChangeText={(value)=>UpdateData([value],id)}
          />
      </View>
      <View style={general_style.Section}>
        <TouchableOpacity style={general_style.Buttons} onPress={()=>Remover(id)}>
          <Text style={general_style.ButtonsTexts}>X</Text>
        </TouchableOpacity>
      </View>
      
    </TouchableOpacity>
  );
};

export const DaysCard = ({id,data,Remover,UpdateData}:CardProp) => {
  const [selected,Select] = useState<string[]>(data)
  useEffect(()=>{UpdateData(selected,id)},[selected])
  const ToggleSelection=(selection:string)=>{
    if (selected.includes(selection)){
      Select(selected.filter(item=>item !== selection))
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
          <TouchableOpacity style={general_style.Buttons} onPress={()=>Remover(id)} >
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

export const TimeCard = ({id,data,TimePeriod,Remover,UpdateData}:CardProp) =>{
  const date_1 = new Date(data.length<0?data[0]:Date.now());
  const date_2 = new Date(data.length<1?data[1]:Date.now());
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [TimeForm, ToggleForm] = useState(false);
  const [value_1, onChange1] = useState(date_1);
  const [value_2, onChange2] = useState(date_2);
  useEffect(()=>{UpdateData([value_1.toISOString(),value_2.toISOString()],id)},[value_1])
  TimePeriod = TimeForm
  

  return(
  <TouchableOpacity activeOpacity={1} style={[general_style.container]}>
    <View style={[general_style.row_container]}>
      <View style={general_style.row_container}>
        <View style={general_style.Section}>
          <Text style={general_style.title}>Time</Text>
        </View>
        <View style={Time_sp_style.Section}>
          <TouchableOpacity onPress={()=>setOpen1(true)}>
            <Text style={Time_sp_style.title}>{FormatDate(value_1,DateForm.time)}</Text>
          </TouchableOpacity>
        </View>
        {TimePeriod&&<View style={[,Time_sp_style.Section]}>
          <View style={general_style.row_container}>
            <Text style={[general_style.title]}>  to  </Text>
            <TouchableOpacity onPress={()=>setOpen2(true)}>
              <Text style={Time_sp_style.title}>{FormatDate(value_2,DateForm.time)}</Text>
            </TouchableOpacity>
          </View>
        </View>}
      </View>
        <View style={[general_style.Section]}>
          <TouchableOpacity style={general_style.Buttons} onPress={()=>Remover(id)} >
            <Text style={general_style.ButtonsTexts}>X</Text>
          </TouchableOpacity>
        </View>
    </View>
    <View style={[general_style.RawRow,general_style.RawSection]}>
      <TouchableOpacity style={[general_style.Buttons,Time_sp_style.Button]} onPress={()=>ToggleForm(value=>!value)} >
        <Text style={TimePeriod?Time_sp_style.ButtonsTexts:[Time_sp_style.ButtonsTexts]}>
          {TimePeriod?'Time Period':'Specific Time'}
        </Text>
      </TouchableOpacity>

    </View>
      <DatePicker modal mode='time' open={open1} date={value_1} 
        onConfirm={(selectedDate) => {
          setOpen1(false); 
          onChange1(selectedDate);
        }}
        onCancel={() => {setOpen1(false)}}
        />
      <DatePicker modal mode='time' open={open2} date={value_2} 
      onConfirm={(selectedDate) => {
        setOpen2(false); 
        onChange2(selectedDate);
      }}
      onCancel={() => {setOpen2(false); }}
      />
      
    </TouchableOpacity>
  )
}

export const MonthsCard = ({id,data,Remover,UpdateData}:CardProp) => {
  const [selected,Select] = useState<string[]>(data)
  useEffect(()=>{UpdateData(selected,id)},[selected])
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
          <TouchableOpacity style={general_style.Buttons} onPress={()=>Remover(id)}>
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
    maxWidth:'98%',
    backgroundColor:'#59583cff',
    borderRadius:10,
  },
  Section:{
    minHeight:45,
    paddingHorizontal:10,
    paddingTop:5,
    justifyContent:'space-evenly',
  },
  RawSection:{
    minHeight:45,
    paddingHorizontal:10,
    paddingTop:5,
  },
  row_container:{
    flexDirection:"row",
    justifyContent:'space-between'
    
  },
  RawRow:{
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
    backgroundColor: '#0000000d',
    textAlign:"center",
    textShadowColor:"#171714aa",
    color: '#ffffffff',
    width: '100%',
    borderColor: 'black',
    borderBottomWidth: 2,
    minWidth:130,
    maxWidth:130,
    marginLeft:10,
    marginVertical:2,
    borderRadius:5,
    
    
  }
});

const days_sp_style=StyleSheet.create({
});
const Time_sp_style=StyleSheet.create({
  Section:{
    minHeight:45,
    // paddingRight:'1%',
    paddingTop:1,
    justifyContent:'center',
    
  },
  title: {
    color:'#ebfefdff',
    fontSize: 15,
    fontFamily:"monospace",
    paddingTop:3
  },
  ButtonsTexts:{
    fontFamily:'monospace',
    fontSize:13,
    textAlign:'center',
    color:'#ffffffff',
  },
  Button:{
    minWidth:150,
    borderRadius:20,
    borderWidth:5,
    borderColor:'#7f7737ff'
  },
});
