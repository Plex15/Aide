import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal,Button } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ColorPicker, { HueSlider, OpacitySlider, Panel1, Preview, Swatches } from 'reanimated-color-picker';


type CardProp={
  id : string,
  data:string[]
  TimePeriod?: boolean
  Remover : (id:string) => void
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
            <FontAwesome6 name='xmark' iconStyle='solid' style={general_style.iconClose}/>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
export const DescCard= ({id,data,Remover,UpdateData}:CardProp) => {
  const [CompactCard,setCompact] = useState(true)
  return (
    <TouchableOpacity 
    activeOpacity={1} 
    style={[general_style.container,{maxHeight:CompactCard?50:180}]} 
    onPress={()=>setCompact(pre=>!pre)}
    >  
      <View style={general_style.row_container}>
        <View style={general_style.Section}>
          <Text style={general_style.title}>Description</Text>
        </View>
        <View style={general_style.Section}>
          <TouchableOpacity style={general_style.Buttons} onPress={()=>Remover(id)}>
              <FontAwesome6 name='xmark' iconStyle='solid' style={general_style.iconClose}/>
          </TouchableOpacity>
        </View>
      </View>
        {!CompactCard&&<TextInput
          style={general_style.DescBox}
          multiline={true}
          scrollEnabled={true}
          placeholder="This task is to ..."
          placeholderTextColor="#a9a9a9d3"
          value={data[0]}
          onChangeText={(value)=>UpdateData([value],id)}
          />
        }
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
            <FontAwesome6 name='xmark' iconStyle='solid' style={general_style.iconClose}/>
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
            <FontAwesome6 name='xmark' iconStyle='solid' style={general_style.iconClose}/>
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
  const form_0:boolean = JSON.parse(data[0]);
  const date_1 = new Date(data[1]);
  const date_2 = new Date(data[2]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [TimeForm, ToggleForm] = useState(form_0);
  const [value_1, onChange1] = useState(date_1);
  const [value_2, onChange2] = useState(date_2);
  useEffect(()=>{UpdateData([TimeForm.toString(),value_1.toISOString(),value_2.toISOString()],id)},[value_1,value_2,TimeForm])
  // console.log(TimeForm.toString(),"------on value")
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
            <FontAwesome6 name='xmark' iconStyle='solid' style={general_style.iconClose}/>
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
            <FontAwesome6 name='xmark' iconStyle='solid' style={general_style.iconClose}/>
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


export const ThemeCard= ({id,data,Remover,UpdateData}:CardProp) => {
  const [CompactCard,setCompact] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [BgColor, setBG] = useState('#2d2b21ff');
  const [AccentColor, setAccent] = useState('#9c8527f5');
  const onSelectColor = (color:any) => setBG(color);
  useEffect(()=>UpdateData([BgColor,AccentColor],id),[AccentColor,BgColor])
  return (
    <TouchableOpacity activeOpacity={1} style={[general_style.container,{maxHeight:CompactCard?50:180}]} onPress={()=>setCompact(pre=>!pre)}>
      <View style={[general_style.row_container]}>
        <View style={general_style.Section}>
        <Text style={general_style.title}>Theme</Text>
        </View>
        <View style={general_style.Section}>
          <TouchableOpacity style={general_style.Buttons} onPress={()=>Remover(id)}>
            <FontAwesome6 name='xmark' iconStyle='solid' style={general_style.iconClose}/>
          </TouchableOpacity>
        </View>
      </View>
      {!CompactCard&&<View style={[general_style.Section]}>
        <View style={[general_style.Section,general_style.row_container]}>
          <Text style={general_style.title}>BG Color</Text>
          <TouchableOpacity style={[Screen_sty.ColorBox,{backgroundColor:"#2d2b21ff"}]}/>
        </View>
        <View style={[general_style.Section,general_style.row_container]}>
          <Text style={general_style.title}>Accent</Text>
          <TouchableOpacity style={[Screen_sty.ColorBox,{backgroundColor:"#9c8527f5"}]} onPress={() => setShowModal(true)}/>
        </View>
        </View>}
      {/* <View>
        <Modal visible={showModal} animationType='slide'>
        <ColorPicker style={{ width: '70%' }} value={selectedColor} onComplete={onSelectColor}>
          <Preview />
          <Panel1 />
          <HueSlider />
          <OpacitySlider />
          <Swatches />
        </ColorPicker>

        <Button title='Ok' onPress={() => setShowModal(false)} />
      </Modal>

      </View> */}

      
    </TouchableOpacity>
  );
};


export const TitleCard= ({id,data,Remover,UpdateData}:CardProp) => {
  const pos = ["Start","Center","End"]
  const [CompactCard,setCompact] = useState(true)
  const [pos_index,setInd] = useState<number>(data[0]?JSON.parse(data[0]):1)
  const [showModal, setShowModal] = useState(false);
  const [AccentColor, setAccent] = useState('#000000ff');
  const [Title, setTitle] = useState<string>(data[2]);
  const onSelectColor = (color:any) => setAccent(color)
  useEffect(()=>UpdateData([pos_index.toString(),AccentColor,Title],id),[pos_index,AccentColor,Title])
  const TogglePos =()=>{
    const index =[0,1,2]
    const cur_index = index[0]==pos_index?index[1]:index[1]==pos_index?index[2]:index[0]
    setInd(cur_index)
  }
  return (
    <TouchableOpacity activeOpacity={1} style={[general_style.container,{maxHeight:CompactCard?50:180}]} onPress={()=>setCompact(pre=>!pre)}>
      <View style={general_style.row_container}>
      <View style={general_style.Section}>
        <Text style={general_style.title}>Title</Text>
      </View>
      <View style={general_style.Section}>
        <TextInput
          style={general_style.TextBox}
          placeholder="Time-pass"
          placeholderTextColor="#a9a9a9d3"
          value={data[2]}
          onChangeText={(value)=>setTitle(value)}
          />
      </View>
      <View style={general_style.Section}>
        <TouchableOpacity style={general_style.Buttons} onPress={()=>Remover(id)} >
            <FontAwesome6 name='xmark' iconStyle='solid' style={general_style.iconClose}/>
        </TouchableOpacity>
      </View>
      </View>
      {!CompactCard&&<View style={[general_style.Section]}>
        <View style={[general_style.Section,general_style.row_container]}>
          <Text style={general_style.title}>Position</Text>
          <TouchableOpacity style={Screen_sty.BoxConiner} onPress={()=>TogglePos()}>
          <Text style={general_style.title}>
            <FontAwesome6 name="chevron-left" iconStyle="solid"/> {pos[pos_index]} <FontAwesome6 name="chevron-right" iconStyle="solid"/>
          </Text>
          </TouchableOpacity>
        </View>
        <View style={[general_style.Section,general_style.row_container]}>
          <Text style={general_style.title}>Colour</Text>
          <TouchableOpacity style={[Screen_sty.ColorBox,{backgroundColor:"#9c8527f5"}]} onPress={() => setShowModal(true)}/>
        </View>
        </View>}
      {/* {!CompactCard&&<View style={[general_style.row_container,Screen_sty.subContiner]}>
      <TouchableOpacity style={[general_style.Section]}>
        <Text style={general_style.ButtonsTexts}>
          <FontAwesome6 name="chevron-left" iconStyle="solid"/> Center <FontAwesome6 name="chevron-right" iconStyle="solid"/>
        </Text>
      </TouchableOpacity>
      <View style={Screen_sty.BoxConiner}>
        <TouchableOpacity style={[Screen_sty.ColorBox,{backgroundColor:"#9c8527f5"}]} onPress={() => setShowModal(true)}>
            <Text>Color</Text>
        </TouchableOpacity>
      </View>
      </View>} */}
    </TouchableOpacity>
  );
};

export const SpacingCard= ({id,data,Remover,UpdateData}:CardProp) => {
  return (
    <TouchableOpacity activeOpacity={1} style={[general_style.container,general_style.row_container]}>
      <View style={general_style.Section}>
        <Text style={general_style.title}>Space</Text>
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
            <FontAwesome6 name='xmark' iconStyle='solid' style={general_style.iconClose}/>
        </TouchableOpacity>
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
    marginLeft:10,
    marginVertical:2,
    borderRadius:5,
  },
  DescBox: {
    backgroundColor: '#0000000d',
    textAlign:"left",
    textShadowColor:"#171714aa",
    color: '#ffffffff',
    width: '90%',
    borderColor: 'black',
    borderBottomWidth: 2,
    minWidth:130,
    minHeight:70,
    maxHeight:120,
    marginLeft:10,
    marginVertical:5,
    borderRadius:5,
  },
  iconClose:{
    color:'#ffffffff',
    fontSize:15,
    textAlign:'center',
    marginVertical:3
  },
});


const Time_sp_style=StyleSheet.create({
  Section:{
    minHeight:45,
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

const Screen_sty=StyleSheet.create({
  ColorBox:{
    width:'50%',
    height:30,
    borderRadius:7, 
  },
  subContiner:{
    justifyContent:"center",
    alignItems:"flex-end",
    // backgroundColor:'#ffffff86'
  },
  BoxConiner:{
    width:'50%',
    alignItems:"center",
  }
});