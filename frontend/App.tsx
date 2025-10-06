// Keep App.tsx minimal as possible
// most properties/functions should be in /src folder
import React,{useState,useEffect} from 'react';
import { UI_init } from './core_ui';
import { database_init } from './src/services/core_database';

//import 'react-native/Libraries/Core/Devtools/';

function Main(){
  useEffect(() => {
    const startApp = async () => { await database_init(); };
    startApp();
  }, []); // The empty array [] ensures this runs only once
  
  
  return (<UI_init name="User" />)
   
   
}




// main function define 
export default Main;
