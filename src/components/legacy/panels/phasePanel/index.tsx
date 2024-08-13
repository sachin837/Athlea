import {View, Text} from 'react-native';
import React from 'react';
import {Container} from './phasePanel.style.tsx';
import TrainingPhaseGraph from '../../graphs/trainingPhases';
import {useTheme} from 'styled-components/native';

const PhasePanel = ({openBottomSheet}) => {
  const theme = useTheme();
  return (
    <Container onPress={openBottomSheet}>
      <TrainingPhaseGraph />
    </Container>
  );
};

export default PhasePanel;
