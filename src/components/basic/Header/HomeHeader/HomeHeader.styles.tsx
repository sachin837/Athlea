import styled from 'styled-components/native'
import {SafeAreaView} from 'react-native-safe-area-context'


export const Container = styled(SafeAreaView)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 100px;
`
