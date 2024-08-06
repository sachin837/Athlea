import styled, {css} from 'styled-components/native';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from '../../../../utils/deviceOrientationHook.tsx';
import LinearGradient from 'react-native-linear-gradient';
import AthleaIcons from '../../../../assets/icons/Icons.tsx';
import {DefaultTheme} from 'styled-components/native/dist/types';

export const Container = styled.View`
  flex-direction: row;
  padding: 10px;
`;

export const ButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

export const CategoryButton = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 5px;
`;

interface GradientContainerProps {
  width: number;
  height: number;
  borderRadius?: number;
  gradientColors: string[];
}

export const GradientContainer = styled(
  LinearGradient,
).attrs<GradientContainerProps>(({gradientColors}) => ({
  colors: gradientColors,
}))<GradientContainerProps>`
  ${({width, height, borderRadius}) => css`
    flex-direction: row;
    width: ${wp(width)}px;
    height: ${wp(height)}px;
    border-radius: ${borderRadius}px;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  `}
`;

export const PageText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[5]}px;
    color: ${theme.background};
    font-weight: ${theme.font.weight.medium};
  `}
`;

interface PageIconProps {
  theme?: DefaultTheme;
  size?: number;
  disable?: boolean;
  color?: string;
  name: string;
}

export const PageIcon = styled(AthleaIcons).attrs<PageIconProps>(props => {
  const {theme, size, disable, name} = props;
  return {
    color: disable ? theme.primaryscale[4] : '#ffffff',
    size: heightPercentageToDP(size ? size : 5.5),
    name: name,
  };
})<PageIconProps>`
  ${() => css`
    margin: ${wp(2)}px; /* Apply margin to all sides */
  `}
`;
