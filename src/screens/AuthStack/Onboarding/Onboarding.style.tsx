import styled, {css} from 'styled-components/native'
import {IconProp} from 'components/legacy/input/text/text.style'
import Icons from '../../../assets/icons/Icons'
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'utils'

export const Container = styled.View`
  ${({theme: {space}}) => css`
    flex: 1;
    background-color: transparent;
    padding-horizontal: ${widthPercentageToDP(space.lg)}px;
    padding-vertical: ${heightPercentageToDP(space.lg)}px;
  `}
`

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  background-color: transparent;
`

export const MicIconButton = styled.TouchableOpacity`
  ${({theme, backgroundColor}) => css`
    background-color: ${backgroundColor ? backgroundColor : theme.primary};
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    position: absolute;
    left: ${widthPercentageToDP(76)}px;
    top: 18%;
  `}
`

export const MicIcon = styled(Icons).attrs<IconProp>(props => {
  const {theme, size, disable, name} = props
  return {
    color: disable ? theme.primary : theme.secondary,
    size: size,
    name: name,
  }
})<IconProp>`
  color: white;
  transform: rotate(180deg);
`

export const CheckIcon = styled(Icons).attrs<IconProp>(props => {
  const {theme, size, disable, name, color} = props
  return {
    color: disable ? theme.primaryscale[4] : theme.primary,
    size: size,
    name: name,
  }
})<IconProp>`
  color: ${props => props.color || 'black'};
`

export const Input = styled.TextInput`
  height: 60px;
  margin-bottom: 12px;
  padding-horizontal: 10px;
  border-width: 0px;
  border-bottom-width: 1px;
  border-color: black;
  font-size: 16px;
  width: 95%;
`

export const SkipButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  color: white;
  border-color: black;
  border-width: 1px;
  border-radius: 5px;
  height: 60px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  width: ${widthPercentageToDP(89)}px;
`

export const ButtonContainer = styled.View`
  padding: 20px;
  background-color: white;
`

export const DoneButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  color: black;
  background-color: black;
  border-color: black;
  border-width: 1px;
  border-radius: 5px;
  height: 60px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  z-index: 100;
  width: ${widthPercentageToDP(88)}px;
`

export const SkipButtonText = styled.Text`
  color: black;
  font-size: 16px;
`

export const DoneButtonText = styled.Text`
  color: white;
  font-size: 16px;
`

export const Subtext = styled.Text`
  font-size: 13px;
  color: #7f7f7f;
  font-weight: light;
  padding-bottom: 10px;
`
