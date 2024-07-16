import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 12px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.primary};
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.primary};
`;
