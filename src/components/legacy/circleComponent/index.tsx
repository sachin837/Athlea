import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CircleNumber = ({number}) => {
  return (
    <View style={styles.circle}>
      <Text style={styles.number}>{number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 17,
    height: 17,
    borderRadius: 12,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 8,
    color: 'black',
  },
});

export default CircleNumber;
