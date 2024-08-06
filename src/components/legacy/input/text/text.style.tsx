import styled, {css, DefaultTheme} from 'styled-components/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../../../utils/deviceOrientationHook.tsx';
import Icons from '../../../../assets/icons/Icons.tsx';
import {IconTypes} from '../../../../assets/icons/IconTypes.tsx';

interface InputProps {
  theme: DefaultTheme;
}

export interface IconProp {
  theme: DefaultTheme;
  name: IconTypes | string;
  size?: number;
  disable?: boolean;
  color?: string;
}
export const StyledInput = styled.TextInput.attrs<InputProps>(
  ({theme: {placeholder, primaryscale}}) => ({
    placeholderTextColor: placeholder,
    selectionColor: primaryscale[3],
  }),
)<InputProps & {left?: number}>`
  ${({theme: {space, primaryscale, font}, left}) => css`
    position: absolute;
    left: ${left ? `${wp(left)}px` : `${wp(30)}px`}; /* Adjust as needed */
    height: 100%;
    bottom: 0;
    width: 240px; /* or adjust as needed */
    font-size: 18px;
    color: ${primaryscale[10]};
    border-radius: ${wp(space.md)}px;
    /* Remove margin since we're using absolute positioning */
  `}
`;

export const ContentWrapper = styled.View`
  height: 60px;
  position: relative;
  /* justify-content: space-between; */
`;

export const Container = styled.View<{notificationsButton?: boolean}>`
  ${({theme, notificationsButton}) => css`
    flex-direction: row;
    /* align-items: center; */
    width: ${notificationsButton ? '100%' : wp(90)}px;
    background-color: ${notificationsButton ? 'transparent' : theme.background};
    border: ${notificationsButton
      ? 'none'
      : `1px solid ${theme.primaryscale[9]}`};
    border-radius: ${notificationsButton ? 0 : wp(theme.borderRadius.md)}px;
    margin: 20px;
    position: relative;
  `}
`;

export const IconContainer = styled.View`
  position: absolute;
  flex-direction: row;
  align-items: center;
  left: ${wp(4)}px;
  top: 15%;
`;

export const LeftIcon = styled(Icons).attrs<IconProp>(props => {
  const {theme, size, disable, name, notificationsButton} = props;
  return {
    color: notificationsButton ? theme.secondary : theme.primary,
    size: hp(size ? size : 5.5),
    name: name,
  };
})<IconProp>`
  ${() => css`
    margin: ${wp(1)}px; /* Apply margin to all sides */
  `}
`;

export const IconButton = styled.TouchableOpacity`
  ${({theme}) => css`
    background-color: ${theme.primary};
    padding: 10px;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    position: absolute;
    left: ${wp(76)}px;
    top: 12%;
  `}
`;

export const MicIcon = styled(Icons).attrs<IconProp>(props => {
  const {theme, size, disable, name} = props;
  return {
    color: disable ? theme.primary : theme.secondary,
    size: size,
    name: name,
  };
})<IconProp>`
  color: white;
`;

export const Icon = styled(Icons).attrs<IconProp>(props => {
  const {theme, size, disable, name} = props;
  return {
    color: disable ? theme.primary : theme.secondary,
    size: hp(size ? size : 5.5),
    name: name,
  };
})<IconProp>`
  ${() => css`
    margin: ${wp(1)}px; /* Apply margin to all sides */
  `}
`;
