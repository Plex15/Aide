// Keep App.tsx minimal as possible
// most properties/functions should be in /src folder
import React,{useEffect} from 'react';
import { UI_init } from './core_ui';
import { preset_screen } from './preset_ui';
import { database_init } from './src/services/core_database';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator,NativeStackHeaderProps } from '@react-navigation/native-stack';
import { CustomHeader} from './nav-header-ui';
import { Preset_edit_screen } from './preset_edit_screen';

//import { RootStackParamList } from './preset_ui';

const HomeScreenParams = {
  name: 'User', 
};
export type RootStackParamList = {
  Home: { name: string };
  Preset: undefined; // The Preset screen takes no parameters
  Presetsetting: undefined;
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
      initialParams:HomeScreenParams,
      options:{
        title:"Aide"
      },
    },
    Preset:{
      screen:preset_screen,
            options:{
        title:"Preset"
      },
    },
    Presetsetting:{
      screen:Preset_edit_screen,
        options:{
          title:"Preset"
        }
    },
  },
  screenOptions: {
      header: ({ route, options  }: NativeStackHeaderProps) => {
      const title = options.title ?? route.name;
        return <CustomHeader title={title} />;
      },


    },
  });

  const Navigation = createStaticNavigation(RootStack);

  return (<Navigation/>)
   
   
}




// main function define 
export default Main;
