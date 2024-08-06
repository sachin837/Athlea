import React from 'react';
import { View } from 'react-native';
import { Container, BarsContainer, styles } from "./IntensityLevel.style";
import { Text } from "../../../components";

const IntensityLevel = (props: any) => {
  const intensityLevel = Math.max(0, Math.min(props?.level, 4));

  return (
    <Container>
      <Text type={'small'} style={styles.label} themeColor={'subtitle'}>Intensity level</Text>
      <BarsContainer>
        {[1, 2, 3, 4].map((barLevel) => (
          <View
            key={barLevel}
            style={[
              styles.bar,
              {
                backgroundColor: barLevel <= intensityLevel ? '#081123' : '#E5E7EB',
                height: barLevel * 5,
              },
            ]}
          />
        ))}
      </BarsContainer>
    </Container>
  );
};

export default IntensityLevel;
