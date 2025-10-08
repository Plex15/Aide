
import React from 'react';
import { TouchableOpacity,View, Text, ScrollView,FlatList, Alert} from 'react-native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './style';
import {  useNavigation,} from '@react-navigation/native';
import { RootStackParamList } from './App';
import {preset_list, PresetContainers  } from './Preset_container';

// export type RootStackParamList = {
//   Home: { name: string };
//   Preset: undefined; // The Preset screen takes no parameters
// };


type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
// type UIProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function preset_screen() {
  
  const myPresets: preset_list[] = [
    { name: "Morning Workout", desc: "A quick 15-minute routine.", time: new Date(Date.now())},
    { name: "Evening Stretch", desc: "Relax and unwind.", time: new Date(Date.now())},
];
 const list = PresetContainers 
 //({items}:{items:preset_list})=>(
  //   <preset_containers/>
  // );

  const navi = useNavigation<NavigationProps>();
  return (
    <View style={styles.container}>
      {/* Header */}
{/* 
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}> */}

        {/* Bottom section with progression and tasks */}
        <View style={styles.bottomSection}>
          <FlatList
            data={myPresets}
            renderItem={({ item }) => (
              // Use the capitalized component name here
            <PresetContainers 
                name={item.name}
                desc={item.desc}
                time={item.time}
            />
            
            )}
          keyExtractor={(item, index) => index.toString()}
        />
        </View>



        {/* Bottom Navigation */}
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
      {/* </ScrollView> */}
    </View>
  )
}
