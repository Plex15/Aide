import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { CheckBox_StComp, Desc_StComp, Space_StComp, TextInput_StComp, Title_StComp } from './Screen_style_comp';


const checkBox:string[]=["Time to fly","Later","Now","Skip","Take"]
const checkBoxData:boolean[]=[false,true,false,true,true,false,false,true,false,false,true]



const FullScreenInterface = () => {
  return (
    <View style={[styles.container,{backgroundColor: '#29382bff'}]}>
      <Space_StComp spacing={2*10} MaxSpace={100}/>
      <Title_StComp name='Give me data' position='center' color='#c3f9ffe8'/>
      <Space_StComp spacing={2*10} MaxSpace={100}/>
      <CheckBox_StComp  DataText={checkBox} Data={checkBoxData} BoxSpace={3*5} Theme='#c3f9ffe8'/>
      <TextInput_StComp name='Are you fine?' position='flex-start' color='#c3f9ffe8'/>
      <Desc_StComp name="Text area or so
      const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192113ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color:'#ffffffff',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    color: '#ffffffff',
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  }
});
      " position='flex-start' color='#ff8181ff'/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    color:'#ffffffff',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    color: '#ffffffff',
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  }
});

export default FullScreenInterface;