import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'styled-components/native';

const BodySection = ({
  bodyPartText,
  percentageText = '+0.0%',
  positionLeft,
  positionTop,
  onPress,
}: {
  bodyPartText: string;
  percentageText: string;
  positionLeft: number;
  positionBottom: number;
  onPress?: () => void;
}) => {
  const theme = useTheme();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[styles.container, {left: positionLeft}, {top: positionTop}]}>
        <View style={styles.bodyContainer}>
          <Text style={styles.bodyText}>{bodyPartText}</Text>
        </View>
        <Text
          style={[
            styles.text,
            {color: percentageText === '+0.0%' ? 'grey' : theme.secondary},
          ]}>
          {percentageText}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BodySection;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
  },
  bodyContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#000',
    width: 100,
    alignItems: 'center',
    marginBottom: 5,
  },
  bodyText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center', // Ensure text is centered within the Text component
  },
  text: {
    fontSize: 16,
  },
});
