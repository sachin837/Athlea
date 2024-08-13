import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import KeyField from './components/KeyField.tsx';
import {useTheme} from 'styled-components/native';

const GraphKey = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <KeyField KeyText="Cycling" KeyColor={theme.primary} />
      <KeyField KeyText="Running" KeyColor={theme.secondary} />
      <KeyField KeyText="Lifting" KeyColor={theme.third} />
      <KeyField KeyText="Swimming" KeyColor={theme.fourth} />
    </View>
  );
};

export default GraphKey;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
