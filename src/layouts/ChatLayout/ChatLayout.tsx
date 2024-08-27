import {FC, useCallback} from 'react'
import {
  GiftedChat,
  InputToolbar,
  InputToolbarProps,
  MessageProps,
  Send, SendProps,
  MessageImageProps,
} from 'react-native-gifted-chat'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'
import {Button, Message} from '../../components'
import {Icons} from '../../assets/icons'
import type {Message as CustomMessage, FileMessage} from 'model/chat'
import {MainContainer, SendContainer, styles} from './ChatLayout.styled'
import {InputTypes, UseChatLayoutType} from './useChatLayout'
import { Image, TouchableOpacity } from 'react-native'
import { Colors } from 'theme'
import { Images } from '../../assets/images'
import BasePermissions from 'components/basic/BasePermissions/BasePermissions'
import { Modal } from 'react-native'

interface Props extends UseChatLayoutType {
  microphoneOpen:()=>void;
  microphoneVisible:boolean;
}

export const ChatLayout:FC<Props> = (props) => {
  const insets = useSafeAreaInsets();
  const renderMessage = useCallback((itemProps:  MessageProps<CustomMessage>) => (
    <Message {...itemProps} />
  ), [])

  const renderInputToolbar = useCallback((toolbarProps: InputToolbarProps<CustomMessage>) => (
    <InputToolbar
      {...toolbarProps}
      containerStyle={styles.inputToolbar}
      {
        ...(props.microphoneVisible
          ? {
            renderActions: () => (
              <TouchableOpacity style={styles.microphoneBtn} onPress={props.microphoneOpen}>
                <Icons name={'microphone'} color={'black'} size={28} />
              </TouchableOpacity>
            ),
          }
          : {})
      }
    />
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
    <SendContainer>
      <TouchableOpacity style={{marginRight:5}} onPress={props.handleAttachment}>
        <Image source={Images.attachmentIcon} style={styles.attachmentIcon} />
      </TouchableOpacity>
      <Send {...sendProps} alwaysShowSend containerStyle={styles.send}>
        <Icons name={'arrowUp'} color={'white'} size={25} />
      </Send>
    </SendContainer>
  ), [])
  const renderMessageFile = useCallback((fileProps: MessageImageProps<FileMessage>) => {
    const { currentMessage } = fileProps

    if (currentMessage?.file) {
      return (
        <TouchableOpacity
          onPress={() => { }}
        >
          <Image
            source={{ uri: currentMessage.file.uri }}
            style={styles.fileImage}
          />
        </TouchableOpacity>
      )
    }

    return null
  },[])
  return (
    <MainContainer>
      <SafeAreaView style={{flex: 1}} edges={['bottom']}>
        <GiftedChat
          user={{_id: 1}}
          onSend={props.onSend}
          renderSend={renderSend}
          messages={props.messages}
          renderMessage={renderMessage}
          renderMessageImage={renderMessageFile}
          renderInputToolbar={renderToolbar}
          listViewProps={{
            contentContainerStyle: styles.messagesContainer,
          }}
          textInputProps={{placeholder: 'Tell Athlea your goal...',color:Colors.black1}}
        />
        <Modal
          visible={props.isVisible}
          transparent={true}
          animationType="none"
          onRequestClose={props.closePermissioSheet}>
          <BasePermissions onClose={props.closePermissioSheet} />
        </Modal>
      </SafeAreaView>
    </MainContainer>
  )
}
