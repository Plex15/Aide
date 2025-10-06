import React,{useState,useEffect} from 'react';
import {UI} from './main_ui';
import {Dimensions}from 'react-native';

//const { width } = Dimensions.get('window');

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};



// Main AIDE UI component
export const UI_init =({ name, baseEnthusiasmLevel = 0 }: Props)=> {
  const [enthusiasmLevel, setEnthusiasmLevel] = useState(baseEnthusiasmLevel);
  const [menuOpen, setMenuOpen] = useState(false);
  

  // Task completion states
  const [tasks, setTasks] = useState([
    { id: 1, text: 'GO TO GYM', completed: false },
    { id: 2, text: 'READ BOOK', completed: false },
    { id: 3, text: 'READ NEWSPAPERS', completed: false },
    { id: 4, text: 'PRACTICE THE SKILLS', completed: false },
    { id: 5, text: 'TALK TO YOUR PARENTS', completed: false },
    { id: 6, text: 'PLAY FOOTBALL', completed: false },
    { id: 7, text: 'STUDY', completed: false },
    { id: 8, text: 'DINNER', completed: false },
    { id: 9, text: 'READ BOOK', completed: false },
    { id: 10, text: 'DRINK WATER BEFORE BED', completed: false },
    { id: 11, text: 'SLEEP', completed: false },
  ]);

  // Weekly progression data (mock data for bars)
  const weeklyData = [
    { day: 'Mon', value: 1 },
    { day: 'Tue', value: 45 },
    { day: 'Wed', value: 75 },
    { day: 'Thu', value: 40 },
    { day: 'Fri', value: 85 },
    { day: 'Sat', value: 55 },
    { day: 'Sun', value: 100 },
  ];

  // not used i think
  // const onIncrement = () => setEnthusiasmLevel(enthusiasmLevel + 1);
  
  // const onDecrement = () =>
  //   setEnthusiasmLevel(enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return(<UI
    name = {name} 
    enthusiasmLevel = {enthusiasmLevel}
    tasks = {tasks}
    weeklyData = {weeklyData}
    setMenuOpen = {setMenuOpen}
    toggleTask  = {toggleTask}
    completedTasks = {completedTasks}
    totalTasks = {totalTasks}
    menuOpen = {menuOpen}
    />
  )
}