import {FC} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {BackButton, Container, Content, RightComponentContainer, Title} from './BackHeader.style'
import {HeaderProps} from './type'
import {useNavigation} from '@react-navigation/native'
import {Text} from '../../../primitives/Text'
import {useTheme} from 'styled-components/native'


export const BackHeader:FC<HeaderProps> = (props) => {
  const navigation = useNavigation()
  const theme = useTheme()

  return (
    <Container>
      <Content edges={['top']}>
        <BackButton onPress={props.onBack || navigation.goBack}>
          <Icon name={'chevron-back-outline'} size={24} color={theme.subtitle} />
          <Text themeColor={'subtitle'}>Back</Text>
        </BackButton>
        <Title type={'subheading'} weight={'500'}>{props.title}</Title>
        <RightComponentContainer>
          {props.rightComponent}
        </RightComponentContainer>
      </Content>
    </Container>
  )
}

