import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Title_StComp } from './Screen_style_comp';


const FullScreenInterface = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Give me your Data</Text>
      {Title_StComp("Test-compoent","flex-start")}
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