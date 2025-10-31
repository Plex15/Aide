import React, {useState } from 'react';
import { CardContiner, Cards, LocalCard,LocalDataHook,localCardData } from './preset_edit_screen';
import { getSchedules,addSchedule,deleteSchedule} from './src/services/database';
import { UpdateCard,AddCard,GetCardData, deletecard } from './src/services/card_DB';
import { LocalDataPreset,LocalPreset } from './preset_ui';


export const SaveData=async(data:localCardData[],removeditems:number[],Taskid?:number)=>{
    let scheduleId: number = Taskid || 0;

    if (!Taskid) {
        const NameCard = data.filter(item => item.card === Cards.Name);
        const title: string = NameCard.length > 0 ? NameCard[0].data[0] : "New Task";
        const Desc: string = title;  //change on creating desc card 
        
        //console.log(title, "on SaveData");
        
        scheduleId = await addSchedule(title, Desc);
        
        
        const addTasks = [];
        for (const item of data) {
             addTasks.push(AddCard(scheduleId, item.card, item.card_group, item.data));
        }
        //console.log(addTasks,"add this to DB from saveData")
        await Promise.all(addTasks); 
        
    } 
    else {
        //console.log(Taskid, "on update");
        
        const updateTasks = [];
        const removedItemsSet = new Set(removeditems); 
        for (const item of data) {
            const isNewCard = item.id < 1;   // Math.random on first add 1-0
            console.log(item.id,"on Update new card ? ",isNewCard)
            if (isNewCard) {
                // console.log(item.id,"on Update new card found ")
                updateTasks.push(AddCard(Taskid, item.card, item.card_group, item.data));
                
            } else {
                updateTasks.push(UpdateCard(item.id, item.data));
            }
            


        }

        await Promise.all(updateTasks); 
        // removedItemsSet.forEach(item=>)
        console.log(removedItemsSet)
    }

    const UpdatedData = GetData(scheduleId, data); 
    
    console.log("Updated Full List from DB:", UpdatedData,"----------");
    
    return UpdatedData;
};

export const GetData=(taskid:number,data:localCardData[]):localCardData[]=>{
    const ProcessedData = data==null?data:data.filter(item=>item.schedule_id==taskid)
    // const ProcessedData = preProcData.map(item=>item.card==Cards.Time?item.data.map(item=>item=new Date(item).toISOString()):data)
    
    // //console.log(taskid,"data---------------------");
    
    return ProcessedData

}