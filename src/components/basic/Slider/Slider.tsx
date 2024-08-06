import React from 'react';
import { Text } from '../../../components';
import { SliderLabelContainer, Container, styles } from './Slider.style'
import Sliders from '@react-native-community/slider';

const Slider = (props: any) => {
  return (
    <Container>
      <SliderLabelContainer>
        <Text type={'subheading'} themeColor={'subtitle'} size={15}>{props?.type}</Text>
        <Text type={'heading1'} size={14} weight={900} themeColor={'subtitle'}>{props?.value}{props?.type == 'Weight' ? 'kg' : ''}</Text>
      </SliderLabelContainer>
      <Sliders
        style={styles.slider}
        minimumValue={0}
        maximumValue={50}
        step={1}
        value={props.value}
        onValueChange={(val: any) => props.onchange(val)}
        minimumTrackTintColor="#7300E6"
        maximumTrackTintColor="#8E8E93"
        thumbTintColor="#7300E6"
        thumbImage={require('../../../assets/images/circle.png')}
      />
    </Container>
  );
};

export default Slider;
