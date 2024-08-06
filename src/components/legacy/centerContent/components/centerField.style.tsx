import styled from 'styled-components/native'
import AthleaIcons from '../../../../assets/icons/Icons'
import {heightPercentageToDP} from '../../../../utils/deviceOrientationHook.tsx'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 8px 22px;
  border: 1px solid #d7d7d7;
  border-radius: 30px;
  background-color: #fff;
  elevation: 2;
`

export const CenterText = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #333333;
`

export const CenterIcon = styled(AthleaIcons).attrs(props => {
  const {theme, size, disable, name, color} = props
  return {
    color: '#8c8c8c',
    size: heightPercentageToDP(size ? size : 1),
    name: name,
  }
})`
  padding-left: 12px;
  margin-top: 3px;
`
