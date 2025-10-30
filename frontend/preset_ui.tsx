
import React, { useEffect, useState } from 'react';
import { TouchableOpacity,View, Text,FlatList, StyleSheet,} from 'react-native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import {  useNavigation,} from '@react-navigation/native';
import { RootStackParamList } from './App';
import { preset_list, PresetContainers  } from './Preset_container';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { getSchedules } from './src/services/database';
import { GetCardData } from './src/services/card_DB';


type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type LocalDataPreset=[
  Presets:preset_list[],
  UpdatePreset:React.Dispatch<React.SetStateAction<preset_list[]>>
]

let procdata:any
const getdata= async() => {
  const data = await getSchedules()
  const data_2 = await GetCardData()
  console.log(data_2)
  console.log(data)
  procdata = data
}
getdata()

export const LocalPreset=():LocalDataPreset=>{
  const [Presets,UpdatePreset] = useState<preset_list[]>(procdata)
  return [Presets,UpdatePreset]
}
export function preset_screen() {  
    const [Presets,UpdatePreset]=LocalPreset()
    useEffect(()=>{UpdatePreset(procdata),[Presets]})
  //   { id:1,name: "Morning Workout", desc: "A quick 15-minute routine.", time: new Date(Date.now())},
  //   { id:2,name: "Study", desc: "1st 2 modules", time: new Date(Date.now())},
  // ]
  
  const navi = useNavigation<NavigationProps>();
  return (
    <View style={style.container}>
        <View style={style.bottomSection}>
          <FlatList
            data={Presets}
            renderItem={({ item }) => (
            <PresetContainers 
                id = {item.id}
                title={item.title}
                desc={item.desc}
                time={new Date(Date.now())}
            />
            
            )}
          keyExtractor={(item, index) => index.toString()}
        />
        </View>
    <View style={style.overlay}>
      <TouchableOpacity style={style.Buttons} onPress={()=>navi.navigate('Presetsetting',{id:1})}>
            <FontAwesome6 name='plus' iconStyle='solid' style={style.iconAdd}/>
      </TouchableOpacity>
    </View>
  </View>
  )
}


const style=StyleSheet.create({
  overlay: {
    // flexWrap:'wrap',
    // flexBasis:20,
    position: 'absolute',
    top: 0,
    bottom: 25,
    left: 0,
    right: 25,
    // marginVertical:"78%",
    // marginLeft:"70%",
    justifyContent: 'flex-end',
    alignContent:'flex-end',
    alignItems: 'flex-end',
    // backgroundColor:"#0000008b"
  }, 
  Buttons:{
    backgroundColor:'#D4AF37',
    borderWidth:2,
    borderRadius:7,
    borderColor:'#493115a5',
    justifyContent:'center',

  },
  iconAdd:{
    fontSize:25,
    fontWeight:'bold',
    textAlign:'center',
    color:'#000000d4',
    marginVertical:10,
    marginHorizontal:12,
  },
   container: {
    flex: 1,
    backgroundColor: '#2B2B2B',
  },
  bottomSection: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10,
  },
});