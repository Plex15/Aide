import React from 'react';
import {TouchableOpacity, Text, View,  ScrollView,} from 'react-native';
import {styles} from "./style"
// import './schedule'; 
import { onDisplayNotification } from './schedule';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './preset_ui';
import {useNavigation,} from '@react-navigation/native';


type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type UIprop = {
    name: string,
    enthusiasmLevel : any,
    tasks :any,
    weeklyData :any,
    setMenuOpen :(numChars: any) => void,
    toggleTask :(numChars: any) => void,
    completedTasks : number
    totalTasks : number
    menuOpen : boolean
}

export  function UI({
    name, 
    enthusiasmLevel,
    setMenuOpen,
    tasks,
    weeklyData,
    toggleTask,
    completedTasks,
    totalTasks,
    menuOpen
}:UIprop)
{  
  const navi = useNavigation<NavigationProps>();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>AIDE</Text>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setMenuOpen(!menuOpen)}
        >
          <View style={styles.menuBar} />
          <View style={styles.menuBar} />
          <View style={styles.menuBar} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Overall Activity Graph */}
        <View style={styles.activityCard}>
          <Text style={styles.sectionTitle}>OVERALL ACTIVITY</Text>
          <View style={styles.graphContainer}>
            <View style={styles.graphLine}>
              {/* Simulated line chart */}
              <View style={styles.graphDot} />
              <View style={[styles.graphDot, { left: '20%', top: 30 }]} />
              <View style={[styles.graphDot, { left: '40%', top: 15 }]} />
              <View style={[styles.graphDot, { left: '60%', top: 35 }]} />
              <View style={[styles.graphDot, { left: '80%', top: 10 }]} />
            </View>
          </View>
          <View style={styles.activityLabels}>
            <Text style={styles.activityLabel}>ACTIVE</Text>
            <Text style={styles.activityLabel}>SKIPPED</Text>
          </View>
        </View>

        {/* Bottom section with progression and tasks */}
        <View style={styles.bottomSection}>
          {/* Daily Progression Circle */}
          <View style={styles.progressionCard}>
            <View style={styles.circleContainer}>
              <View style={styles.outerCircle}>
                <View style={styles.middleCircle}>
                  <View style={styles.innerCircle}>
                    <Text style={styles.circleText}>{completedTasks}</Text>
                    <Text style={styles.circleSubtext}>/{totalTasks}</Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.progressionTitle}>Daily Progression</Text>
            
            {/* Weekly Bar Chart */}
            <View style={styles.barChartContainer}>
              {weeklyData.map((item:any, index:number) => (
                <View key={index} style={styles.barWrapper}>
                  <View style={[styles.bar, { height: item.value }]} />
                  <Text style={styles.barLabel}>{item.day.charAt(0)}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Active Task List */}
          <View style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <Text style={styles.taskHeaderText}>ACTIVE TASK</Text>
              <View style={styles.taskHeaderIcon}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            </View>
            
            <ScrollView style={styles.taskList} nestedScrollEnabled={true}> 
              {tasks.map((task:any) => (
                <TouchableOpacity
                  key={task.id}
                  style={styles.taskItem}
                  onPress={() => toggleTask(task.id)}
                >
                  <View style={[
                    styles.taskCheckbox,
                    task.completed && styles.taskCheckboxCompleted
                  ]}>
                    {task.completed && <Text style={styles.taskCheck}>✓</Text>}
                  </View>
                  <Text style={[
                    styles.taskText,
                    task.completed && styles.taskTextCompleted
                  ]}>
                    {task.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.taskFooter}>
              <Text style={styles.taskFooterText}>
                YOU HAVE COMPLETED{'\n'}
                {completedTasks} ACTIVITIES TODAY 
              </Text>
            </View>
          </View>
        </View>

        {/* Top Activities Section */}
        <View style={styles.topActivitiesSection}>
          <View style={styles.topActivitiesHeader}>
            <Text style={styles.topActivitiesTitle}>TOP ACTIVITIES</Text>
            <TouchableOpacity 
               style={styles.addButton}
               onPress={onDisplayNotification}
               >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
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