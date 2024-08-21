import {ChatLayout} from '../../../layouts'
import {useOnboarding} from './useOnboarding'
import { View ,Text} from 'react-native'
import {
  OnborderingHeaderContainer,
  BackButton, ContainerHeader, Content, 
} from './Onboarding.style'
import { IconButton } from 'components/legacy/iconButton' // Original IconButton// Aliased MicIconButton
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { RouteNames } from '../../../_constants'

export const OnboardingUpdate = () => {
  const theme = useTheme()
  const navigation = useNavigation()

  const { chatLayoutProps, onUserInput } = useOnboarding()

  return (
    <View style={{flex: 1}}>
      <ContainerHeader>
        <Content edges={['top']}>
          <BackButton  onPress={() => navigation.navigate(RouteNames.homeTabs)}>
            <Icon name={'chevron-back-outline'} size={24} color={theme.subtitle} />
            <Text style={{marginTop:4}}>Back</Text>
          </BackButton>
        </Content>
      </ContainerHeader>
      <ChatLayout
        microphoneOpen={()=>{}}
        microphoneVisible={false}
        {...chatLayoutProps}
        onSend={onUserInput}
      />
    </View>
  )
}
