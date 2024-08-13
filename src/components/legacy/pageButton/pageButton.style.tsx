import styled, {css, DefaultTheme} from 'styled-components/native';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from '../../../utils/deviceOrientationHook.tsx';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IconProp} from '../input/text/text.style.tsx';
import Icons from '../../../assets/icons/Icons.tsx';

interface ContainerProps {
  theme?: DefaultTheme;
  size: number;
  disabled?: boolean;
  color?: string;
  marginSize?: number;
}

interface PageTextProps {
  theme?: DefaultTheme;
  size: number;
  disabled?: boolean;
  color?: string;
}

interface PageIconProps {
  theme?: DefaultTheme;
  size?: number;
  disable?: boolean;
  color?: string;
  name: string;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  ${({marginSize}) => css`
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: ${marginSize ? wp(marginSize) : 0}px;
  `}
`;

export const PageText = styled.Text<PageTextProps>`
  ${({theme, size, disabled}) => css`
    color: ${disabled ? theme.primaryscale[4] : '#000000'};
    font-size: ${wp(size * 0.3)}px;
    margin-left: ${wp(3.5)}px;
    margin-right: ${wp(3.5)}px;
  `}
`;

export const PageIconContainer = styled.View`
  ${({size, theme}) =>
    css`
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      width: ${wp(size)}px;
      height: ${wp(size)}px;
      border-radius: ${wp(size / 2)}px;
      background-color: ${theme.secondary};
    `}
`;

interface GradientContainerProps {
  size: number;
  gradientColors: string[];
}

export const GradientContainer = styled(
  LinearGradient,
).attrs<GradientContainerProps>(({gradientColors}) => ({
  colors: gradientColors,
}))<GradientContainerProps>`
  ${({size, marginRight, marginTop}) => css`
    width: ${wp(size)}px;
    height: ${wp(size)}px;
    border-radius: ${wp(size) / 2}px;
    justify-content: center;
    align-items: center;
    margin-right: ${marginRight ? marginRight : 0}px;
    margin-top: ${marginTop ? marginTop : 0}px;
  `}
`;

export const PageIcon = styled(Icons).attrs<PageIconProps>(props => {
  const {theme, size, disable, name} = props;
  return {
    color: disable ? theme.primaryscale[4] : '#ffffff',
    size: heightPercentageToDP(size ? size : 5.5),
    name: name,
  };
})<IconProp>`
  ${() => css`
    margin: ${wp(1)}px; /* Apply margin to all sides */
  `}
`;
