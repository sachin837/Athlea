import {TouchableOpacity, View} from 'react-native'
import {Avatar, Container} from './HomeHeader.styles'
import {Text} from '../../../primitives'
import {useNavigation} from '@react-navigation/native'
import {RouteNames} from '../../../../_constants'


export const HomeHeader = () => {
  const navigation = useNavigation()

  return (
    <Container edges={['top']}>
      <View>
        <Text type={'heading2'}>10k Plan</Text>
        <Text type={'subBody'}>3/10 weeks</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate(RouteNames.onboarding)}>
        <Avatar source={require('assets/images/people/RandomImage1.png')}  />
      </TouchableOpacity>
    </Container>
  )
}
