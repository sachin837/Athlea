import {css, styled} from 'styled-components/native';
import {IconProp} from '../../input/text/text.style.tsx';
import AthleaIcons from '../../../../assets/icons/Icons.tsx';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../../../utils/deviceOrientationHook.tsx';

export const Container = styled.View`
  display: flex;
  /* background-color: ${({theme}) => theme.black}; */
  justify-content: center;
  padding-top: ${hp(2)}px;
  padding-bottom: ${hp(1)}px;
  margin-left: ${wp(6)}px;
`;

export const BotContainer = styled.View`
  ${({theme}) => css`
    border-radius: ${wp(theme.borderRadius.md)}px;
    padding-bottom: ${wp(1)}px;
    flex-direction: row;
    align-items: center;
  `}
`;

export const BotText = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: 18px;
  font-weight: bold;
`;

export const TimeText = styled.Text`
  color: ${({theme}) => theme.primaryscale[8]};
  font-size: 16px;
`;

export const ThreadText = styled.Text`
  color: ${({theme}) => theme.secondary};
  font-size: 17px;
  font-weight: bold;
`;

export const MessageContainer = styled.View`
  width: ${wp(86)}px;
`;

export const MessageText = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: 17px;
`;

export const HighlightedMessageText = styled.Text`
  color: ${({theme}) => theme.secondary};
  font-size: 17px;
  font-weight: bold;
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
  const {theme, size, disable, name} = props;
  return {
    color: disable ? theme.primary : theme.black,
    size: hp(size ? size : 5.5),
    name: name,
  };
})<IconProp>`
  ${() => css`
    margin-right: ${wp(2)}px; /* Apply margin to all sides */
  `}
`;
