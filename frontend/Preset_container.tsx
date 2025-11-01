import React from 'react';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { StyleSheet } from "react-native";
import { TouchableOpacity,View, Text,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { Deletetask } from './preset_DB_save';


type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type preset_list={
  id:number,
  title:string,
  desc:string,
  refetch?: () => Promise<void>,
  is_active?:boolean,
}


export const PresetContainers =({id,title,desc,refetch}:preset_list)=>{
  const nav = useNavigation<NavigationProps>()
  return(
    <TouchableOpacity activeOpacity={.7} style={preset_style.itemContainer} onPress={()=>nav.navigate('Presetsetting',{id:id})}>
    <View style={preset_style.textContainer}>
        <Text style={preset_style.name}>{title}</Text>
        <Text style={preset_style.lastMessage}>{desc}</Text>
    </View>
    <View style={preset_style.infoContainer}>
        {/* <Text style={preset_style.timestamp}>{time.getHours()}:{time.getMinutes()}</Text> */}
        <TouchableOpacity style={preset_style.EditButton } onPress={()=>(Deletetask(id,refetch))}> 
          <FontAwesome6 name="ellipsis-vertical" iconStyle="solid" style={preset_style.icon}/>
        </TouchableOpacity>
    </View> 
    </TouchableOpacity>
  )
}

export const preset_style = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical:4,
    marginHorizontal:10,
    borderBottomWidth: 1,
    backgroundColor:'#3c3931ff',
    borderBottomColor: '#e1d6a2ff',
    alignItems: 'center',
    borderRadius:7,
  },
   textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'hsla(57, 100%, 40%, 1.00)',
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
    justifyContent:'center',
    paddingVertical:10,
    paddingHorizontal:15,
  },
  icon:{
    color:"hsla(57, 100%, 40%, 1.00)",
    fontSize:20,
  }
});