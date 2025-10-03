// This is a UI instance component for User to interact with Scheduled interface
// Later will be configured to change according to Preset data !! 

import React from 'react';
import { View, Text, StyleSheet,TextInput } from 'react-native';

const FullScreenInterface = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Give me your Data </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter required text"
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192113ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color:'#ffffffff',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    color: '#ffffffff',
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  }
});

export default FullScreenInterface;