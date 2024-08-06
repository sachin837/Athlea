import styled from 'styled-components/native';
import {css} from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const HeaderContainer = styled.View`
  align-items: flex-start;
  justify-content: space-between;
  padding: 86px 20px 0px 20px;
`;

export const ActivityLoaderContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
`;

export const SubheaderText = styled.Text`
  ${({theme}) => css`
    font-size: 28px;
    color: #ffffff;
    font-weight: ${theme.font.weight.medium};
    padding-bottom: 20px;
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
    color: #ffffff;
    font-weight: ${theme.font.weight.medium};
    padding-bottom: 10px;
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
  ${({theme, paddingTop}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primaryscale[9]};
    font-weight: ${theme.font.weight.regular};
    padding-top: ${paddingTop ? paddingTop : 0}px;
  `}
`;

export const SubDescriptorText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primaryscale[9]};
    font-weight: ${theme.font.weight.regular};
    padding-top: 20px;
    padding-left: 20px;
  `}
`;
