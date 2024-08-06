import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, View} from 'react-native';

const CustomImage = ({source, style}) => {
  return <FastImage source={source} style={[styles.image, style]} />;
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 10, // Adjust the border radius to match your design
    overflow: 'hidden', // Ensures the image corners are clipped
  },
});

export default CustomImage;
