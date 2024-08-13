import styled from 'styled-components/native';
import {css} from 'styled-components/native';

export const Container = styled.ScrollView``;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px 20px 20px;
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
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
  `}
`;

export const GraphContainer = styled.View`
  height: 375px;
`;

export const DescriptorContainer = styled.View``;

export const DescriptorText = styled.Text`
  ${({theme, paddingTop}) => css`
    font-size: 17px;
    color: ${theme.primaryscale[9]};
    font-weight: ${theme.font.weight.regular};
    padding-top: ${paddingTop ? paddingTop : 0}px;
    padding-left: 24px;
    padding-right: 20px;
    padding-bottom: 10px;
  `}
`;

export const BoldText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.bold};
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
