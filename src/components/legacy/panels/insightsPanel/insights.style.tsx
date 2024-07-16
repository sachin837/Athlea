import styled, {css} from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  ${({theme}) => css`
    background-color: ${theme.panelbackground};
    border-radius: 10px;
    padding: 25px;
    margin: 20px 20px 0px 20px;
    flex-direction: column;
  `}
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[6]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.bold};
  `}
`;

export const SubHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SubHeader = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[5]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.medium};
    margin-left: 4px;
  `}
`;

export const ActivityLoadContainer = styled.View`
  flex-direction: column;
  padding-bottom: 15px;
`;

export const DescriptorContainer = styled.View``;

export const DescriptorText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primaryscale[9]};
    font-weight: ${theme.font.weight.regular};
  `}
`;
