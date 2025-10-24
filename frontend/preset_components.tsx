import React from 'react';
import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity } from 'react-native';

export const NameCard= () => {
  return (
    <TouchableOpacity activeOpacity={1} style={card_style.container}>
      <View>
        <Text style={card_style.title}>Name</Text>
      </View>
      <View>
        <TextInput
          style={card_style.input}
          placeholder="Time-pass"
           placeholderTextColor="#a9a9a9d3"
        />
      </View>

    </TouchableOpacity>
  );
};

export const WeeksCard= () => {
  return (
   <TouchableOpacity activeOpacity={1} style={card_style.container}>
      <View>
        <Text style={card_style.title}>Week</Text>
      </View>
      <View>
        <TextInput
          style={card_style.input}
          placeholder="1"
          placeholderTextColor="#a9a9a9d3"
        />
      </View>

    </TouchableOpacity>
  );
};

const card_style = StyleSheet.create({
  container: {
    marginTop:10,
    width: '100%',
    // height: '100%',
    backgroundColor: '#586b43ff',
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection:"row",
    borderRadius:10,
  },
  row_container:{
    alignContent:'flex-start',
  },
  title: {
    flexDirection:"row",
    color:'#ffffffff',
    fontSize: 17,
    // justifyContent:'center',
    marginTop:20,
    marginLeft:20,
  },
  input: {
    backgroundColor: '#7676722c',
    // textDecorationLine:"underline",
    textAlign:"center",
    textShadowColor:"#171714aa",
    color: '#ffffffff',
    // height: 0,
    width: '100%',
    borderColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    maxWidth:120,
    minWidth:120,
    marginLeft:30,
    marginVertical:10,
    borderRadius:2,
  }
});