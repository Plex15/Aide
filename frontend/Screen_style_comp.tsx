import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export type TitleCard={
    name:string,
    color:string,
    position: 'flex-start' | 'center' | 'flex-end' | undefined,
}
type SpaceCard={
    spacing:number
    MaxSpace:number
}

type CheckBoxCard={
    DataText:string[]
    Data:boolean[]
    BoxSpace:number
    Theme:string,
}

export const Title_StComp=({name,position,color}:TitleCard)=>{
    return(
        <View style={[gen_style.container,gen_style.center,{backgroundColor:"#fedf6038"}]}>
        <View style={
            [gen_style.container,gen_style.center,
            {alignItems:position}
            ]}>
                
            <Text style={[gen_style.title,{color:color}]}>
                {name}
            </Text>
        </View>
        </View>
    )

} 


export const Desc_StComp=({name,position,color}:TitleCard)=>{
    return(
        <View style={[gen_style.container,gen_style.center,{backgroundColor:"#fedf6038"}]}>
        <View style={
            [gen_style.container,gen_style.center,
            {alignItems:position}
            ]}>
                
            <Text style={[gen_style.desc,{color:color}]}>
                {name}
            </Text>
        </View>
        </View>
    )

} 

export const TextInput_StComp=({name,position,color}:TitleCard)=>{
    return(
        <View style={[gen_style.container,gen_style.center,{backgroundColor:"#fedf6038"}]}>
        <View style={
            [gen_style.container,gen_style.center,
            {alignItems:position}
            ]}>
                
            <Text style={[gen_style.subHead,{color:color}]}>
                {name}
            </Text>
            <TextInput 
                style={[gen_style.TextBox]}>
                
            </TextInput>
        </View>
        </View>
    )

} 

export const Space_StComp=({spacing,MaxSpace}:SpaceCard)=>{
    return(
        <View style=
        {[
            gen_style.WideCont,gen_style.center,
            {paddingTop:spacing>MaxSpace?MaxSpace:spacing}
        ]}
        />
        
    )

} 


export const CheckBox_StComp=({DataText,Data,BoxSpace,Theme}:CheckBoxCard)=>{
    const Checked:string[]=(DataText)
    const [CheckedData,CheckData]=useState<boolean[]>(Data)
    const CheckToggle=(index:number)=>{
        CheckData(item=>{
            const sub_item = [...item]
            sub_item[index] = !item[index]
            return sub_item
        })
    }
    return(
        <View style={[gen_style.container,gen_style.center,{backgroundColor:"#fedf6038"}]}>
        <View style={[gen_style.container,gen_style.check_bg,
            {flexWrap:'wrap'}]}>
            <View style={[gen_style.check_text]}>
                <Text style={[gen_style.subHead,{color:Theme}]}>{DataText.at(0)}</Text>
            </View>
            <View style={[gen_style.rowCont,gen_style.center,gen_style.check_inbox]}>
            {Checked.map((item,index)=>
                index!=0&&<View 
                key={index}
                style={[gen_style.colCont,gen_style.center,
                    {paddingHorizontal:BoxSpace}]}>
                    <TouchableOpacity activeOpacity={1} style={gen_style.check_box} 
                    onPress={()=>CheckToggle(index)}>
                        {CheckedData.at(index)==true&&
                        <FontAwesome6 name='square-check' iconStyle='solid' size={18} />}
                    </TouchableOpacity>
                    <View style={[gen_style.check_text]}>
                        <Text>{item}</Text>
                    </View>
                </View>
            )}

            </View>
        </View>
        </View>
    )

} 


const gen_style = StyleSheet.create({
    
    WideCont:{ 
        width:'90%',
        flexWrap:'wrap',
        // backgroundColor:"#f3f3f318", //Debugging prop
    },
    container:{
        width:'90%',
        minHeight:'8%',
        marginVertical:2,
        paddingVertical:5,
        borderRadius:10,
        backgroundColor:"#19030318", //Debugging prop
    },
    subHead:{
        paddingVertical:4,
        paddingHorizontal:4,
        fontSize:17,
    },
    rowCont:{     // for checkbox
        flexDirection:'row',
    },
    colCont:{     // for checkbox
        flexDirection:'column',
        paddingTop:5,
        backgroundColor:" #f3f3f34c", //Debugging prop
    },
    BlockContainer:{     // for checkbox
        flexDirection:'row',
        width:'20%',
        minHeight:'8%',
        justifyContent:'center',
        // backgroundColor:"#f3f3f318", //Debugging prop
    },
    center:{
        alignItems:'center',
        justifyContent:'space-around',
    },
    title:{
        fontSize:24,     
    },
    desc:{
        fontSize:14,     
    },
    TextBox: {
        backgroundColor: '#0000002a',
        textAlign:"center",
        textShadowColor:"#050504aa",
        color: '#ffffffff',
        width: '100%',
        borderColor: 'black',
        borderBottomWidth: 2,
        minWidth:130,
        paddingHorizontal:3,
        marginVertical:5,
        borderRadius:5,
    },
    check_box:{
        width:20,
        height:20,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#f6c31cfa",
    },
    check_text:{
        paddingTop:5,
        fontSize:15,
        // backgroundColor:"#ffffff47"
    },
    check_bg:{
        borderRadius:10,
        paddingVertical:5
    },
    check_inbox:{
        backgroundColor:"#0000001d",
        width:'100%',
        borderRadius:10,
        paddingVertical:5
    },
});