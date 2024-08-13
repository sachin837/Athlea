import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components/native'
import {css} from 'styled-components/native'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../../../../../utils/deviceOrientationHook'
import Icons from '../../../../../assets/icons/Icons'
import AthleaIcons from '../../../../../assets/icons/Icons'
import {Animated} from 'react-native'

interface GradientContainerProps {
  size: number;
  gradientColors: string[];
}

export const GradientContainer = styled(
  LinearGradient,
).attrs<GradientContainerProps>(({gradientColors}) => ({
  colors: gradientColors,
}))<GradientContainerProps>`
  ${({size}) => css`
    width: ${wp(size)}px;
    height: ${wp(size)}px;
    border-radius: ${wp(size) / 2}px;
    justify-content: center;
    align-items: center;
  `}
`

export const Icon = styled(Icons).attrs(props => {
  const {theme, size, disable, name} = props
  return {
    color: disable ? theme.primaryscale[4] : '#ffffff',
    size: hp(size ? size : 5.5),
    name: name,
  }
})`
  ${() => css`
    margin: ${wp(1)}px; /* Apply margin to all sides */
  `}
`

export const MessageIcon = styled(Icons).attrs(props => {
  const {theme, size, disable, name} = props
  return {
    color: theme.primaryscale[6],
    size: hp(1.8),
    name: name,
  }
})`
  ${() => css`
    margin-left: 8px; /* Apply margin to all sides */
    padding-bottom: 5px;
  `}
`

export const Container = styled.View``

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
`

export const SubHeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const TitleContainer = styled.View`
  align-items: flex-start;
  margin-left: 10px;
`

export const SubHeaderText = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: 17px;
  font-weight: bold;
`

export const DurationContainer = styled.View`
  align-items: flex-end;
`

export const CategoryText = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: 14px;
  margin-bottom: 5px;
`

export const DurationText = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: 18px;
  font-weight: bold;
`

export const BodyContainer = styled.View`
  align-items: flex-start;
`

export const PanelContainer = styled.View`
  align-items: flex-start;
  width: ${wp(64)}px;
`

export const AiIcon = styled(AthleaIcons)`
  ${({theme, size, paddingRight, color}) => css`
    color: ${color ?? theme.primary};
    font-size: ${size ?? theme.font.size[6]}px;
    padding-right: ${paddingRight ?? 3}px;
  `}
`

export const PanelComponent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${({theme}) => theme.primaryscale[3]};
  width: ${wp(90)}px;
  border-radius: 10px;
  margin-bottom: 10px;
`

export const TitleBodyText = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: 18px;
  font-weight: bold;
`

export const BodyText = styled.Text`
  color: ${({theme}) => theme.primary};
  font-size: 17px;
  line-height: 24px;
  margin-bottom: 10px;
`
