import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import GenderField from './GenderField.tsx';
const GenderButton = ({onPress, selectedGender}) => {
  return (
    <View style={styles.container}>
      <GenderField
        icon="male"
        name="Man"
        onPress={() => onPress('Man')}
        selected={selectedGender === 'Man'}
      />
      <GenderField
        icon="woman"
        name="Woman"
        onPress={() => onPress('Woman')}
        selected={selectedGender === 'Woman'}
      />
      <GenderField
        icon="other"
        name="Other"
        onPress={() => onPress('Other')}
        selected={selectedGender === 'Other'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
});

export default GenderButton;
