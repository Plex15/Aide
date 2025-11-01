import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './App';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { SetSchedule } from './scheduler';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type CustomHeaderProps={
    title:String;
}

export const CustomBottom = (nav:BottomTabBarProps)=>{
  return(
        <View style={TabSty.bottomNav}>
          <TouchableOpacity style={TabSty.navButton} 
          onPress={() =>nav.navigation.navigate('Home')}>
            <View style={TabSty.Icon}>
              <FontAwesome6 name='house' iconStyle='solid' size={27}/>
              
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={TabSty.navButton} 
          onPress={() =>nav.navigation.navigate('Preset')}>
            <View style={TabSty.Icon}>
              <FontAwesome6 name='pen' iconStyle='solid' size={30}/>
            </View>
          </TouchableOpacity>
        </View>
  )
}


export const CustomHeader = ({title }:CustomHeaderProps) => {
  const nav = useNavigation<NavigationProps>()
    return(
      <View style={HeaderSty.header}>
        <TouchableOpacity activeOpacity={0.9} onPress={()=>nav.canGoBack()? nav.goBack():null}> 
          <Text style={HeaderSty.logo}>{title}</Text> 
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={HeaderSty.menuButton} onPress={()=>SetSchedule(4)}
        >
          <FontAwesome6 name='bars' iconStyle='solid' style={HeaderSty.menuBar}/>
        </TouchableOpacity>
      </View>)
}


const HeaderSty= StyleSheet.create({
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#2B2B2B',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  menuButton: {
    paddingHorizontal: 10,
  },
  menuBar: {
    fontSize:30,
    color:'#D4AF37'
  },
})

const TabSty = StyleSheet.create({
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
  },
    bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor:'#000000d9'
  },
  Icon: {
    width: 30,
    height: 30,
    alignItems:'center'
  },

});