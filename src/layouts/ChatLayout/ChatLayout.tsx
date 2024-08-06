import {FC, useCallback} from 'react'
import {
  GiftedChat,
  InputToolbar,
  InputToolbarProps,
  MessageProps,
  Send, SendProps,
} from 'react-native-gifted-chat'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Button, Message} from '../../components'
import {Icons} from '../../assets/icons'
import type {Message as CustomMessage} from 'model/chat'
import {MainContainer, styles} from './ChatLayout.styled'
import {InputTypes, UseChatLayoutType} from './useChatLayout'

interface Props extends UseChatLayoutType {}

export const ChatLayout:FC<Props> = (props) => {

  const renderMessage = useCallback((itemProps:  MessageProps<CustomMessage>) => (
    <Message {...itemProps} />
  ), [])

  const renderInputToolbar = useCallback((toolbarProps: InputToolbarProps<CustomMessage>) => (
    <SafeAreaView edges={['bottom']}>
      <InputToolbar
        {...toolbarProps}
        containerStyle={styles.inputToolbar}
      />
    </SafeAreaView>
  ),[])

  const renderConfirmToolbar = useCallback((toolbarProps: InputToolbarProps<CustomMessage>) => (
    <SafeAreaView edges={['bottom']} style={{paddingHorizontal: 20}}>
      <Button text={'Confirm'} onPress={() => {}} />
    </SafeAreaView>
  ), [])

  const renderToolbar = useCallback((toolbarProps: InputToolbarProps<CustomMessage>) => {
    switch (props.inputType) {
    case InputTypes.text:
      return renderInputToolbar(toolbarProps)
    case InputTypes.confirm:
      return renderConfirmToolbar(toolbarProps)
    default:
      return renderInputToolbar(toolbarProps)
    }
  }, [props.inputType])

  const renderSend = useCallback((sendProps:SendProps<CustomMessage>) => (
    <Send {...sendProps} alwaysShowSend containerStyle={styles.send}>
      <Icons name={'arrowUp'} color={'white'} />
    </Send>
  ), [])

  return (
    <MainContainer>
      <SafeAreaView style={{flex: 1}} edges={['bottom']}>
        <GiftedChat
          user={{_id: 1}}
          onSend={props.onSend}
          renderSend={renderSend}
          messages={props.messages}
          renderMessage={renderMessage}
          renderInputToolbar={renderToolbar}
          listViewProps={{
            contentContainerStyle: styles.messagesContainer,
          }}
          textInputProps={{placeholder: 'Tell Athlea your goal...'}}
        />
      </SafeAreaView>
    </MainContainer>
  )
}
