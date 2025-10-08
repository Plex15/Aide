
import React from 'react';
import { TouchableOpacity,View, Text, ScrollView} from 'react-native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './style';
import {  useNavigation,} from '@react-navigation/native';

export type RootStackParamList = {
  UI_preset: { 
    name: string;
  };
  
};


type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
type UIProps = NativeStackScreenProps<RootStackParamList, 'UI_preset'>;

export function preset_screen() {
    
  const name = "user";


  const navi = useNavigation<NavigationProps>();
  return (
    <View style={styles.container}>
      {/* Header */}

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Bottom section with progression and tasks */}
        <View style={styles.bottomSection}>
        

        </View>



        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton} onPress={() =>navi.navigate(navi.goBack())} >
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
      </ScrollView>
    </View>
  )
}
