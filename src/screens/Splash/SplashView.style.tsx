import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const LogoContainer = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

export const LogoText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #6e00fa; /* Purple color matching the text in the image */
`;

export const DotsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Dot = styled.View<{ backgroundColor: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-horizontal: 4px;
  background-color: ${(props) => props.backgroundColor};
`;
