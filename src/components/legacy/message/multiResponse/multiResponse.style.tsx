import {css, styled} from 'styled-components/native';
import {IconProp} from '../../input/text/text.style.tsx';
import AthleaIcons from '../../../../assets/icons/Icons.tsx';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../../../utils/deviceOrientationHook.tsx';

export const BotContainer = styled.View`
  ${({theme}) => css`
    border-radius: ${wp(theme.borderRadius.md)}px;
    padding-bottom: ${wp(1)}px;
    flex-direction: row;
    align-items: center;
    padding-top: ${hp(0.5)}px;
  `}
`;

export const SubBotContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MessageContainer = styled.View`
  width: ${wp(86)}px;
  padding-bottom: ${hp(0.2)}px;
`;

export const BotText = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: 18px;
  font-weight: bold;
  margin-right: 3px;
`;

export const TimeText = styled.Text`
  color: ${({theme}) => theme.primaryscale[8]};
  font-size: 16px;
  margin-left: 3px;
`;

export const MessageText = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: 17px;
`;

export const UserMessageText = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: 17px;
  text-align: right;
`;

export const UserMessageContainer = styled.View`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: ${wp(86)}px;
  padding-bottom: ${hp(0.1)}px;
  background-color: ${({theme}) => theme.primaryscale[3]};
  border-radius: ${wp(5)}px;
  padding: 15px;
`;

export const Dot = styled.View`
  ${({theme}) => css`
    background-color: ${theme.primaryscale[4]};
    width: 5px;
    height: 5px;
    border-radius: 5px;
    margin: 0px 5px;
  `}
`;

export const MessageIcon = styled(AthleaIcons).attrs<IconProp>(props => {
  const {theme, size, disable, name, color} = props;
  return {
    color: disable ? theme.primaryscale[6] : color,
    size: hp(size ? size : 5.5),
    name: name,
  };
})<IconProp>`
  margin-right: ${props =>
    props.marginRight ? `${props.marginRight}px` : '0px'};
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
