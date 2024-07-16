import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Dropdown = (props: any) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState("Back");
  const [selectedEquipment, setSelectedEquipment] = useState("Barbell");

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedBodyPart}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedBodyPart(itemValue)}
          >
            {props.data.map((item: any) => (
              <Picker.Item label={item.name} value={item.id} />
            ))}
            {/* <Picker.Item label="Back" value="Back" />
            <Picker.Item label="Chest" value="Chest" />
            <Picker.Item label="Legs" value="Legs" /> */}
            {/* Add more options as needed */}
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000', // Set the text color to match your design
  },
  pickerWrapper: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0', // Set the border color to match your design
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    height: 45,
    width: '100%',
  },
});

export default Dropdown;
