import {FC} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Images} from '../../../assets/images'
import {Colors} from 'theme'
import {Button, Text} from 'components'
import {ButtonContainer, Container, TitleContainer} from './Start.styles'
import {RouteNames} from '../../../_constants'

interface Props {

}

export const Start:FC<Props> = ({navigation}) => {

  return (
    <Container source={Images.start}>
      <SafeAreaView>
        <TitleContainer>
          <Text type={'heading1'}>Unlock Your Potential</Text>
          <Text centered color={Colors.blackNew3}>Join our community to start your fitness journey today!</Text>
        </TitleContainer>
        <ButtonContainer>
          <Button text={'Join Us'} onPress={() => navigation.navigate(RouteNames.signup)} />
          <Button text={'Sign in'} outlined onPress={() => navigation.navigate(RouteNames.login)} />
        </ButtonContainer>
      </SafeAreaView>
    </Container>
  )
}
