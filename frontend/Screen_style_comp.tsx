import React from "react";
import { View, Text, StyleSheet, TextInput } from 'react-native';


export const Title_StComp=(name:string, position: 'flex-start' | 'center' | 'flex-end' | undefined)=>{
    return(
        <View style={gen_style.container}>
            <Text style={[gen_style.title,{alignItems:position}]}>
                {name}
            </Text>
        </View>
    )

} 


const gen_style = StyleSheet.create({
    container:{
        flexWrap:'wrap',
        backgroundColor:"#ffffff3d",
    },
    title:{
        color:"#fff",
    }
});