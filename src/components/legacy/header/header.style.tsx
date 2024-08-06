import styled, {css} from 'styled-components/native';
import AthleaIcons from '../../../assets/icons/Icons.tsx';
import {DefaultTheme} from 'styled-components/native/dist/types';
import {widthPercentageToDP} from '../../../utils/deviceOrientationHook.tsx';

interface HeaderIconProps {
  theme?: DefaultTheme;
  size: number;
  name: string;
}

export const Container = styled.View`
  flex-direction: row;
  width: ${widthPercentageToDP(100)}px;
`;

export const HeaderContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin-top: 15px;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderText = styled.Text.attrs<{size: number}>(props => {
  const {size} = props;
  return {
    size: size,
  };
})<{size: number}>`
  ${({theme, size}) => css`
    font-size: ${size ? size : 20}px;
    color: ${theme.primary};
    font-weight: 600;
  `}
`;

export const HeaderIcon = styled(AthleaIcons).attrs<HeaderIconProps>(props => {
  const {size, name} = props;
  return {
    size: size,
    name: name,
  };
})<HeaderIconProps>`
  ${({theme}) => css`
    margin-left: 10px;
    margin-top: 4px;
    color: ${theme.primary};
  `}
`;
