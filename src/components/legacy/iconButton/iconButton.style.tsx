import styled, {css, DefaultTheme} from 'styled-components/native';
import Icons from '../../../assets/icons/Icons.tsx';
import {widthPercentageToDP as wp} from '../../../utils/deviceOrientationHook.tsx';
import {IconTypes} from '../../../assets/icons/IconTypes.tsx';
import {TouchableOpacity} from 'react-native';

export interface IconProp {
  theme?: DefaultTheme;
  type?: IconTypes;
  size?: number;
  disable?: boolean;
  color?: string;
  borderColor?: string;
  onPress?: () => void;
  backgroundColor?: string;
  iconSize?: number;
  iconColor?: string;
}

export const Container = styled.TouchableOpacity<{
  size: number;
  color: string;
  borderColor: string;
}>`
  ${({size, color, borderColor}) => css`
    aspect-ratio: 1;
    width: ${wp(size * 0.7)}px;
    background-color: ${color};
    border-radius: ${wp(size / 2)}px;
    justify-content: center;
    align-items: center;
    border: ${borderColor ? `1px solid ${borderColor}` : 'none'};
  `}
`;

export const Icon = styled(Icons).attrs<IconProp>(
  ({size, type, theme: {primary}, color}) => ({
    color: color ? color : primary,
    size: size ? wp(size * 0.3) : wp(5.5), // assuming icon is 30% of the button size
    name: type,
  }),
)<IconProp>``;
