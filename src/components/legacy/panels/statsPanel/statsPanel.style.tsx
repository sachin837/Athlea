import styled, {css} from 'styled-components/native';
import AthleaIcons from '../../../../assets/icons/Icons.tsx';
import {DefaultTheme} from 'styled-components/native/dist/types';
import {IconTypes} from '../../../../assets/icons/IconTypes.tsx';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../../../utils/deviceOrientationHook.tsx';

interface IconProp {
  theme: DefaultTheme;
  name: IconTypes | string;
  size?: number;
  disable?: boolean;
  color?: string;
}

export const Container = styled.View`
  ${({theme}) => css`
    border-radius: 10px;
    margin: 0px 20px;
    flex-direction: column;
  `}
`;

export const SubHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;

export const HeaderTitle = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[6]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.bold};
    padding-right: 10px;
  `}
`;

export const ActivityLoadContainer = styled.View`
  flex-direction: column;
  padding-bottom: 15px;
`;

export const MetricValueContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 10px;
`;

export const MetricHeader = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primaryscale[8]};
    font-weight: ${theme.font.weight.medium};
  `}
`;

export const MetricValue = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[7]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.medium};
    padding-bottom: 5px;
    padding-right: 5px;
  `}
`;

export const MetricLabel = styled.Text`
  ${({theme, paddingLeft}) => css`
    font-size: ${theme.font.size[3]}px;
    color: ${theme.primaryscale[8]};
    font-weight: ${theme.font.weight.medium};
    padding-right: 6px;
    padding-bottom: 8px;
  `}
`;

export const MetricContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const MetricContainer1 = styled.TouchableOpacity`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    margin-bottom: 25px;
    background-color: #ffffff;
    justify-content: space-between;
    padding: 15px 20px;
    border: 2px solid ${theme.primaryscale[3]};
    border-radius: 10px;
  `}
`;

export const MetricContainer2 = styled.TouchableOpacity`
  ${({theme}) => css`
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    background-color: #ffffff;
    justify-content: space-between;
    padding: 15px 20px;
    border: 2px solid ${theme.primaryscale[3]};
    border-radius: 10px;
  `}
`;

export const GraphLabel = styled.Text`
  ${({theme}) => css`
    font-size: 10px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.bold};
  `}
`;

export const GraphContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StatsIcon = styled(AthleaIcons).attrs<IconProp>(props => {
  const {theme, size, disable, name, color} = props;
  return {
    color: color ? color : theme.primary,
    size: heightPercentageToDP(size ? size : 5.5),
    name: name,
  };
})<IconProp>`
  ${() => css`
    margin-right: ${widthPercentageToDP(2)}px; /* Apply margin to all sides */
  `}
`;
