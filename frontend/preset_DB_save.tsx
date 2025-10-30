import React, {useState } from 'react';
import { CardContiner, Cards, LocalCard,LocalDataHook,localCardData } from './preset_edit_screen';
import { getSchedules,addSchedule,deleteSchedule} from './src/services/database';
import { UpdateCard,AddCard,GetCardData } from './src/services/card_DB';
import { LocalDataPreset,LocalPreset } from './preset_ui';


export const SaveData=async(data:localCardData[],is_id?:boolean|false)=>{
    // const [Preset,UpdatePreset]=LocalPreset()
    // console.log(data);
    // let id:any
    // if(!is_id){
    //     // let title,desc
    //     const NameCard = data.filter(item=>item.card==Cards.Name)
    //     const title:string = NameCard[0].data[0]
    //     const DescCard = data.filter(item=>item.card==Cards.Name)
    //     const Desc=DescCard[0].data[0]
    //     console.log(NameCard[0].data[0],"on SaveData")
    //     id = await addSchedule(title,Desc)
    //     console.log(id);
    //     // UpdatePreset(item=>[...item,{id:1,title:title,desc:Desc,is_active:true}])
        
    // }
    AddCard(2,'','',["nop"])
    // data.map(async data =>await AddCard(is_id?data.id:id,data.card,data.group,data.data))
    // console.log(is_id,id)
    
}

const GetData=(id:number)=>{
    GetData(id)

}