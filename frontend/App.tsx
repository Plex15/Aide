// Keep App.tsx minimal as possible
// most properties/functions should be in /src folder
import React,{useEffect} from 'react';
import { UI_init } from './core_ui';
import { preset_screen } from './preset_ui';
import { database_init } from './src/services/core_database';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator,NativeStackHeaderProps } from '@react-navigation/native-stack';
import { BottomTabHeaderProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomHeader, CustomBottom} from './nav-header-ui';
import { Preset_edit_screen } from './preset_edit_screen';

export type RootStackParamList = {
  TabNavigator: undefined
  Presetsetting: {id:number}
};
export type BottomTabsParamList = {
  Home: undefined,
  Preset: undefined,
};

const ScreenOptionCall=(stack:NativeStackHeaderProps)=>{
        const title = stack.options.title ?? stack.route.name;
        return <CustomHeader title={title} />;
      }
const BottomHeader=(bar:BottomTabHeaderProps)=>{
        const title = bar.options.title ?? bar.route.name
        return <CustomHeader title={title} />;
      }

function Main(){
  useEffect(() => {
    const startApp = async () => { await database_init(); };
    startApp();
  }, []); 

  const MyTabs = createBottomTabNavigator<BottomTabsParamList>({
    screens: {
    Home:{
      screen: UI_init,
      options:{
        title:"Aide",
        header:BottomHeader,
        
      },
    },
    Preset:{
      screen:preset_screen,
        options:{
          title:"Preset",
          header:BottomHeader
          
      },
    },
    },
  tabBar: (props) => <CustomBottom {...props} />,
  });

  const RootStack = createNativeStackNavigator<RootStackParamList>({
    screens: {
    TabNavigator: {
      screen: MyTabs, 
      options: {  
        headerShown: false,
          
      }
    },
    Presetsetting:{
    screen:Preset_edit_screen,
      options:{
      title:"Preset",
      header:ScreenOptionCall
      }
    },
  },
  });



  const Navigation = createStaticNavigation(RootStack);
  return (<Navigation/>) 
  
}




// main function define 
export default Main;
