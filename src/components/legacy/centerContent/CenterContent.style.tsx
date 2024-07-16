import styled from 'styled-components/native';

export const HeadNeckContainer = styled.TouchableOpacity`
  position: absolute;
  top: 90px;
  left: 10px;
  z-index: 3;
`;

export const UpperBodyContainer = styled.TouchableOpacity`
  position: absolute;
  top: 255px;
  z-index: 3;
  left: 220px;
`;

export const ArmsContainer = styled.TouchableOpacity`
  position: absolute;
  top: 320px;
  z-index: 3;
  left: 40px;
`;

export const LegsContainer = styled.TouchableOpacity`
  position: absolute;
  top: 430px;
  z-index: 3;
  left: 240px;
`;

export const FullBodyContainer = styled.TouchableOpacity`
  position: absolute;
  top: 570px;
  z-index: 3;
  left: 135px;
`;

export const TitleContainer = styled.View`
  position: absolute;
  top: -10px;
  left: 90px;
  align-items: center;
  padding-top: 30px;
`;

export const UpdatedText = styled.Text`
  color: #111111;
  font-size: 15px;
`;
