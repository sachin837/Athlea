import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {PickerContainer, Container, PickerWrapper, StyledPicker} from './Dropdown.style'

const Dropdown = (props: any) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState("Back");
  const [selectedEquipment, setSelectedEquipment] = useState("Barbell");

  return (
    <Container>
    <PickerContainer>
      <PickerWrapper>
        <StyledPicker
          selectedValue={selectedBodyPart}
          onValueChange={(itemValue: any) => setSelectedBodyPart(itemValue)}
        >
          {props.data.map((item: any) => (
            <Picker.Item key={item.id} label={item.name} value={item.id} />
          ))}
        </StyledPicker>
      </PickerWrapper>
    </PickerContainer>
  </Container>
  );
};

export default Dropdown;
