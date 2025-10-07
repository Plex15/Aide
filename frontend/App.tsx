// Keep App.tsx minimal as possible
// most properties/functions should be in /src folder
import React,{useState,useEffect} from 'react';
import { UI_init } from './core_ui';
import { preset_screen } from './preset_ui';
import { database_init } from './src/services/core_database';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { RootStackParamList } from './preset_ui';

const HomeScreenParams = {
  name: 'User', 
};
export type RootStackParamList = {
  Home: { name: string };
  Preset: undefined; // The Preset screen takes no parameters
};

function Main(){
  useEffect(() => {
    const startApp = async () => { await database_init(); };
    startApp();
  }, []); // The empty array [] ensures this runs only once
  
  const RootStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    Home:{
      screen: UI_init,
      initialParams:HomeScreenParams
    },
    Preset:{
      screen:preset_screen,
    }
  },
  });

  const Navigation = createStaticNavigation(RootStack);

  return (<Navigation/>)
   
   
}




// main function define 
export default Main;
