
import React from 'react';
import { TouchableOpacity,View, Text, ScrollView,FlatList, Alert, StyleSheet} from 'react-native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './style';
import {  useNavigation,} from '@react-navigation/native';
import { RootStackParamList } from './App';
import {preset_list, PresetContainers  } from './Preset_container';


type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function preset_screen() {
  
  const myPresets: preset_list[] = [
    { name: "Morning Workout", desc: "A quick 15-minute routine.", time: new Date(Date.now())},
    { name: "Study", desc: "1st 2 modules", time: new Date(Date.now())},
    { name: "Take Meds", desc: "50 paracetamol", time: new Date(Date.now())},
    { name: "Meditate", desc: "Relax and unwind", time: new Date(Date.now())},
];
//  const list = PresetContainers 

  const navi = useNavigation<NavigationProps>();
  return (
    <View style={styles.container}>

        <View style={styles.bottomSection}>
          <FlatList
            data={myPresets}
            renderItem={({ item }) => (
            <PresetContainers 
                name={item.name}
                desc={item.desc}
                time={item.time}
            />
            
            )}
          keyExtractor={(item, index) => index.toString()}
        />
        </View>


        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton} onPress={() =>navi.goBack()} >
            <View style={styles.homeIcon}>
              <View style={styles.homeIconRoof} />
              <View style={styles.homeIconBase} />
              
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() =>navi.navigate('Preset')}>
            <View style={styles.editIcon}>
              <View style={styles.editIconPencil} />
              <View style={styles.editIconSquare} />
            </View>
          </TouchableOpacity>
        </View>
    </View>
  )
}
