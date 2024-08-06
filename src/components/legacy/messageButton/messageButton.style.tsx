import styled from 'styled-components/native';
import AthleaIcons from '../../../assets/icons/Icons.tsx';
import {IconProp} from '../iconButton/iconButton.style.tsx';
import {css} from 'styled-components/native';
import {heightPercentageToDP} from '../../../utils/deviceOrientationHook.tsx';

export const Icon = styled(AthleaIcons).attrs<IconProp>(props => {
  const {theme, size, disable, name, color} = props;
  return {
    color: color ? color : theme.primary,
    size: heightPercentageToDP(size ? size : 5.5),
    name: name,
  };
})<IconProp>`
  ${() => css`
    /* Apply margin to all sides */
  `}
`;

export const MessageContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 29px;
  height: 24px;
  border-radius: 8px;
`;

export const NotificationCircle = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  height: 10px;
  width: 10px;
  background-color: red;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const NotificationText = styled.Text`
  color: white;
  font-size: 6px;
  font-weight: bold;
`;
