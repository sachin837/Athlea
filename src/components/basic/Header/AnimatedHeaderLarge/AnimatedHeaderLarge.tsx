import {LargeHeader, ScalingView} from '@codeherence/react-native-header'
import {Text} from '../../../primitives/Text'
import {Row} from './AnimatedHeaderLarge.styled'
import Icons from 'react-native-vector-icons/MaterialIcons'


export const AnimatedHeaderLarge = ({title}) => ({scrollY}) => {

  return (
    <LargeHeader>
      <ScalingView scrollY={scrollY} style={{flex: 1}}>
        <Row>
          <Text type={'heading2'}>{title}</Text>
          <Icons name={'stars'} size={20} />
        </Row>
      </ScalingView>
    </LargeHeader>
  )
}
