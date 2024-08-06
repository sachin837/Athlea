import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Slider from '@react-native-community/slider';

const SliderComponent = ({
  value,
  setValue,
  minimumValue,
  maximumValue,
  step,
  unit,
}) => {
  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
        onValueChange={setValue}
        minimumTrackTintColor="#000000"
        maximumTrackTintColor="#000000"
        thumbTintColor="#000000"
      />
      <Text style={styles.text}>{`${Math.round(value)} ${unit}`}</Text>
    </View>
  );
};

const AgeSlider = ({age, setAge}) => {
  return (
    <SliderComponent
      value={age}
      setValue={setAge}
      minimumValue={18}
      maximumValue={99}
      step={1}
      unit="years old"
    />
  );
};

const WeightSlider = ({weight, setWeight}) => {
  return (
    <SliderComponent
      value={weight}
      setValue={setWeight}
      minimumValue={30}
      maximumValue={200}
      step={1}
      unit="kg"
    />
  );
};

const HeightSlider = ({height, setHeight}) => {
  return (
    <SliderComponent
      value={height}
      setValue={setHeight}
      minimumValue={100}
      maximumValue={250}
      step={1}
      unit="cm"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  slider: {
    width: Dimensions.get('window').width * 0.93,
    height: 40,
  },
  text: {
    marginTop: 1,
    fontSize: 16,
    color: 'black',
  },
});

export {AgeSlider, WeightSlider, HeightSlider};
