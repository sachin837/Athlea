import styled from 'styled-components/native';
import {css} from 'styled-components/native';
import AthleaIcons from '../../../../assets/icons/Icons.tsx';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 15px;
`;

export const SubheaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FullActivityGraphContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 10px 20px 0px 20px;
`;

export const ActivityLoaderContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`;

export const GraphInfoContainer = styled.View`
  padding-bottom: 20px;
`;

export const SubheaderText = styled.Text`
  ${({theme}) => css`
    font-size: 22px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.medium};
    padding-left: 5px;
  `}
`;

export const MetricTitleContainer = styled.View`
  flex-direction: row;
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
    font-weight: ${theme.font.weight.medium};
  `}
`;

export const GraphContainer = styled.View``;

export const MetricGraphContainer = styled.View``;

export const DescriptorContainer = styled.View`
  align-items: center;
  padding: 20px 30px 20px 30px;
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
  `}
`;

export const Icon = styled(AthleaIcons)`
  ${({theme, size, marginBottom, marginLeft, color, paddingTop}) => css`
    color: ${color ?? theme.primary};
    font-size: ${size ?? theme.font.size[6]}px;
    padding-right: 5px;
    padding-top: ${paddingTop ? paddingTop : 4}px;
    margin-bottom: ${marginBottom ? marginBottom : 0}px;
    margin-left: ${marginLeft ? marginLeft : 0}px;
  `}
`;

export const MetricValueContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const MetricHeader = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[5]}px;
    color: ${theme.primaryscale[8]};
    font-weight: ${theme.font.weight.medium};
  `}
`;

export const MetricValue = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[7]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.medium};
  `}
`;

export const MetricLabel = styled.Text`
  ${({theme, paddingLeft}) => css`
    font-size: ${theme.font.size[3]}px;
    color: ${theme.primaryscale[8]};
    font-weight: ${theme.font.weight.medium};
    padding-left: ${paddingLeft ? paddingLeft : 4}px;
    padding-right: 4px;
    padding-bottom: 3.5px;
  `}
`;

export const MetricContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
`;

export const MetricColumnContainer = styled.View`
  flex-direction: column;
  padding: 20px;
`;

export const SelectorContainer = styled.View`
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
`;
