import {Animated} from 'react-native';
import styled from 'styled-components/native';

export const CircleContainer = styled.View`
  width: 600px;
  height: 600px;
  border-radius: 300px;
  position: relative;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

export const LeftCircleContainer = styled.View`
  width: 375px;
  height: 600px;
  border-radius: 300px;
  position: relative;
  align-self: center;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const RightCircleContainer = styled.View`
  width: 600px;
  height: 600px;
  border-radius: 300px;
  position: relative;
  align-self: center;
  justify-content: center;
  align-items: center;
  z-index: 20;
`;

export const Circle = styled.View`
  width: 200px;
  height: 200px;
  border-radius: 150px;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: 'transparent';
  right: 355px;
  bottom: 260px;
  z-index: 1200;
`;

export const TextContainer = styled.View`
  width: 100%;
  height: 100%;
  align-self: left;
  justify-content: center;
  align-items: flex-start;
  padding-left: 55px;
  z-index: 3000;
`;

export const HeaderText = styled.Text`
  font-size: 28px;
  color: ${({theme}) => theme.background};
  text-align: left;
  margin-top: 50px;
  font-weight: ${({theme}) => theme.font.weight.medium};
`;

export const SubHeaderText = styled.Text`
  font-size: ${({theme}) => theme.font.size[4]}px;
  color: ${({theme}) => theme.background};
  text-align: left;
  margin-bottom: 50px;
`;

export const Ring = styled(Animated.View)`
  position: absolute;
  border: 1px solid ${({theme}) => theme.primaryscale[5]};
  background-color: transparent;
  z-index: -10;
`;

export const PagesContainer = styled.View`
  flex: 1;
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 10px;
  z-index: 1000;
`;
