import {ChatLayout} from '../../../layouts'
import {useOnboarding} from './useOnboarding'
import {View} from 'react-native'


export const OnboardingUpdate = () => {

  const { chatLayoutProps, onUserInput } = useOnboarding()

  return (
    <View style={{flex: 1}}>
      <ChatLayout
        microphoneOpen={()=>{}}
        microphoneVisible={false}
        {...chatLayoutProps}
        onSend={onUserInput}
      />
    </View>
  )
}
