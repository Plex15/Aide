// Keep App.tsx minimal as possible
// most properties/functions should be in /src folder
import React,{useState} from 'react';
import {Button,TouchableOpacity,StyleSheet, Text, View} from 'react-native';
import { User,PI} from './src/Core/schedule'; 


export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};
// current main function
function Hello({name, baseEnthusiasmLevel = 0}: Props) {
  const [enthusiasmLevel, setEnthusiasmLevel] = useState(
    baseEnthusiasmLevel,
  );

  const onIncrement = () =>
    setEnthusiasmLevel(10);
  const onDecrement = () =>
    setEnthusiasmLevel(
      enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0,
    );

  const getExclamationMarks = (numChars: number) =>
    numChars > 0 ? Array(numChars + 1).join('$') : '';

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hello {name}
        {getExclamationMarks(enthusiasmLevel)}
      </Text>
      <View>
        <TouchableOpacity
          key={"increment"}
	  onPress={onIncrement}
	  style={styles.button}>
	  <Text style={styles.greeting}>lty</Text>
        </TouchableOpacity>

        <TouchableOpacity
          key={"decrement"}
	  onPress={onDecrement}
	  style={styles.button}>
	  <Text style={styles.greeting}>DECREASE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
    color: 'white',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 10,
    minWidth: '70%',
    textAlign: 'center',
    backgroundColor: 'rgba(122, 59, 20, 0.8)',
    
  },
});

// main function define 
export default Hello;
