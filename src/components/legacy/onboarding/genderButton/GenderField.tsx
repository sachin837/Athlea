import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Icon} from '../../response/response.style.tsx';
import {useTheme} from 'styled-components/native';
const GenderField = ({icon, name, onPress, selected}) => {
  const theme = useTheme();
  const selectedColor = theme.secondary; // Use the color from the theme

  // Inline styles to access selectedColor from theme
  const selectedButtonStyle = selected ? {borderColor: selectedColor} : null;
  const selectedIconStyle = selected
    ? {color: selectedColor, borderColor: selectedColor}
    : null;
  const selectedTextStyle = selected ? {color: selectedColor} : null;

  return (
    <TouchableOpacity
      style={[styles.button, selectedButtonStyle]}
      onPress={onPress}>
      <View style={[styles.iconContainer, selectedIconStyle]}>
        <Icon
          name={icon}
          style={[styles.icon, selectedIconStyle]}
          paddingRight={0}
          size={30}
        />
      </View>
      <Text style={[styles.text, selectedTextStyle]}>{name}</Text>
    </TouchableOpacity>
  );
};

// Example selected color

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  iconContainer: {
    width: 70, // Set the size of the icon container
    height: 70,
    borderRadius: 40, // Half of width and height to make it circular
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000', // Assuming a black border color
  },
  icon: {},
  text: {
    marginTop: 10, // Spacing between icon and text
    fontSize: 16,
    color: '#000', // Assuming the text is black
  },
});

export default GenderField;
