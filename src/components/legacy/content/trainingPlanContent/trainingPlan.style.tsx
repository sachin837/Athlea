import styled from 'styled-components/native';
import {css} from 'styled-components/native';

export const Container = styled.View``;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
`;

export const ActivityLoaderContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`;

export const SubheaderText = styled.Text`
  ${({theme}) => css`
    font-size: 22px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.medium};
    padding-left: 5px;
  `}
`;

export const ValueText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[6]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.medium};
    padding-top: 10px;
  `}
`;

export const ValueDescriptionText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primaryscale[9]};
    font-weight: ${theme.font.weight.regular};
  `}
`;

export const GraphContainer = styled.View`
  height: 375px;
`;

export const DescriptorContainer = styled.View`
  align-items: center;
  padding: 20px;
`;

export const DescriptorText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primaryscale[9]};
    font-weight: ${theme.font.weight.regular};
  `}
`;
