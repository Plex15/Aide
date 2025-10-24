// This is a UI instance component for User to interact with Scheduled interface
// Later will be configured to change according to Preset data !! 

import React ,{ReactElement, useState} from 'react';
import { View,ScrollView, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { QuickAddMenu } from './Preset_card_list';
import { 
  NameCard,
  WeeksCard, 
} from './preset_components'; 


export const Preset_edit_screen = () => {
  const [focused,OnFocusCards]= useState(["options"])
  const itemdata =["WeekCard","NameCard","NameCard"]
  const [isMenuVisible, setMenuVisible] = useState(false);
  
  const AddList = (card:String) =>{
    itemdata.push(String(card))
    console.log(itemdata,"on addlist")
  }

  const RemoveList = (card:string) =>{
    itemdata.pop()
    console.log(itemdata,"on addlist")
  }
  
  const ChangeFocus = (state:string) =>{
    if (state== focused.toString()){
      OnFocusCards(["null"])
    }
    else{
      OnFocusCards([state])
    }
  }
  

  const GetCard = (item:string):React.ReactElement | null =>{
    if ( item == "NameCard"){
        return <NameCard/>
    } 
    if ( item == "WeekCard"){
        return <WeeksCard/>
    }
    return null
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
      style={styles.PresetContainer} 
      activeOpacity={.7} 
      onPress={()=>ChangeFocus("options")}>
        
        <Text style={styles.title}>Options</Text>
        <TouchableOpacity 
        style={styles.menuBar} 
        onPress={()=>setMenuVisible(true)}/>

          {focused.toString()=="options" && (<FlatList
            showsVerticalScrollIndicator={false}
            data={itemdata}
            renderItem={({item})=>
                
              GetCard(item)
            }
            keyExtractor={(item, index) => index.toString()} 
          />
          )}
      </TouchableOpacity>

      <TouchableOpacity 
      style={styles.PresetContainer} 
      activeOpacity={.7} 
      onPress={()=>ChangeFocus("schedule")}>
        
        <Text style={[styles.title]}>Schedule</Text>
        <TouchableOpacity 
        style={styles.menuBar} 
        onPress={()=>AddList('NameCard')}/>

          {focused.toString()=="schedule" && (<FlatList
            showsVerticalScrollIndicator={false}
            data={itemdata}
            renderItem={({item})=>
              <ScrollView >
                {GetCard(item)}
              </ScrollView>
            }
            keyExtractor={(item, index) => index.toString()} 
          />
          )}
          {/* </View> */}
      </TouchableOpacity>

            <TouchableOpacity 
      style={styles.PresetContainer} 
      activeOpacity={.7} 
      onPress={()=>ChangeFocus("constrain")}>
        
        <Text style={[styles.title]}>Constrains</Text>
        <TouchableOpacity 
        style={styles.menuBar} 
        onPress={()=>AddList('WeekCard')}/>

          {focused.toString()=="constrain" && (<FlatList
            showsVerticalScrollIndicator={false}
            data={itemdata}
            renderItem={({item})=>
              <ScrollView >
                {GetCard(item)}
              </ScrollView>
            }
            keyExtractor={(item, index) => index.toString()} 
          />
          )}
          {/* </View> */}
      </TouchableOpacity>


      <TouchableOpacity 
      style={styles.PresetContainer} 
      activeOpacity={.7} 
      onPress={()=>ChangeFocus("style")}>
        
        <Text style={[styles.title]}>Screen</Text>
        <TouchableOpacity 
        style={styles.menuBar} 
        onPress={()=>AddList('NameCard')}/>

          {focused.toString()=="style" && (<FlatList
            showsVerticalScrollIndicator={false}
            data={itemdata}
            renderItem={({item})=>
              <ScrollView >
                {GetCard(item)}
              </ScrollView>
            }
            keyExtractor={(item, index) => index.toString()} 
          />
          )}
          {/* </View> */}
      </TouchableOpacity>

      {isMenuVisible && (<QuickAddMenu
          // Pass the AddList function so the menu can call it
          onAddItem={AddList}
          // Pass a function to allow the menu to close itself
          onClose={() => setMenuVisible(false)}
          />)
        }
      </View>
    
  );
};




const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#747e49ff',
    alignItems: 'center',
    
    // justifyContent: 'center',
  },
  PresetContainer:{
    // paddingTop:10,
    marginTop:10,
    paddingHorizontal:20,
    // paddingVertical:'0%',
    // justifyContent:"flex-start",
    backgroundColor:"#171714aa",
    maxHeight:'50%',
    minWidth:'95%',
    borderRadius:10,
    minHeight:60
  },
  row_container:{
    // flexDirection:"row",
    // alignContent:'center',
    backgroundColor:"#20231aff",
    // marginTop:5,
    borderRadius:10,
    paddingLeft:10
  },
  title: {
    // flexDirection:"row",
    color:'#e9e39cff',
    fontSize: 20,
    // marginRight:'65%',
    marginTop:15,
    marginBottom:4,
  },
  input: {
    backgroundColor: '#1d1d1aff',
    color: '#ffffffff',
    height: 10,
    width: '40%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    justifyContent:'center',
    marginLeft:30,
    marginTop:7,
    // flex:1,
  },
    menuBar: {
    width: 25,
    height: 20,
    backgroundColor: '#D4AF37',
    marginLeft:210,
    paddingBottom:1,
    // justifyContent:"center"

  },
});
