import styled, {css} from 'styled-components/native'
import AthleaIcons from '../../../../assets/icons/Icons'
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../../../utils/deviceOrientationHook.tsx'
import {DefaultTheme} from 'styled-components/native/dist/types'
import {IconTypes} from '../../../../assets/icons/IconTypes.tsx'

interface IconProp {
  theme: DefaultTheme;
  name: IconTypes | string;
  size?: number;
  disable?: boolean;
  color?: string;
}

export const Container = styled.View`
  padding: 20px;
`

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 8px;
  margin-left: -5px;
`

export const ProgressContainer = styled.View`
  padding-right: 8px;
`

export const SubHeaderContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const HeaderTitle = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[6]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.bold};
    padding-bottom: 3px;
  `}
`

export const SubHeaderTitle = styled.Text`
  ${({theme}) => css`
    font-size: 17px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
  `}
`

export const SummaryContainer = styled.View``

export const SummaryText = styled.Text`
  ${({theme}) => css`
    font-size: 17px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
  `}
`

export const CategoryIcon = styled(AthleaIcons).attrs<IconProp>(props => {
  const {theme, size, disable, name} = props
  return {
    color: disable ? theme.primary : theme.black,
    size: heightPercentageToDP(size ? size : 5.5),
    name: name,
  }
})<IconProp>`
  ${() => css`
    /* Apply margin to all sides */
  `}
`
