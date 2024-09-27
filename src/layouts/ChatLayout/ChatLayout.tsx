import {FC, useCallback, useState} from 'react'
import {
  GiftedChat,
  InputToolbar,
  InputToolbarProps,
  MessageProps,
  Send, SendProps,
  MessageImageProps,
  Composer,
} from 'react-native-gifted-chat'
import {Button, Message} from '../../components'
import {Icons} from '../../assets/icons'
import type {Message as CustomMessage, FileMessage} from 'model/chat'
import {AttachmentContainer, AttachmentName, AttachmentTextContainer, ComposerContainer, MainContainer, RemoveButton, SendContainer, TypingContainer, styles} from './ChatLayout.styled'
import {InputTypes, UseChatLayoutType} from './useChatLayout'
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, TouchableOpacity } from 'react-native'
import { Colors } from 'theme'
import { Images } from '../../assets/images'
import BasePermissions from 'components/basic/BasePermissions/BasePermissions'
import { Modal } from 'react-native'
import TypingIndicator from 'components/basic/TypingIndicator'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface Props extends UseChatLayoutType {
  microphoneOpen:()=>void;
  microphoneVisible:boolean;
}

export const ChatLayout:FC<Props> = (props) => {
  const [isFocused, setIsFocused] = useState(false)
  const renderMessage = useCallback((itemProps:  MessageProps<CustomMessage>) => (
    <Message {...itemProps} />
  ), [])
  const renderCustomComposer = useCallback((composerProps: any) => {
    return (
      <ComposerContainer>
        <Composer
          {...composerProps}
          textInputProps={{placeholder: 'Tell Athlea your goal...',color:Colors.black1,fontSize:17, onFocus:()=>setIsFocused(true), onBlur:()=>setIsFocused(false)}}
        />
        {props.selectedAttachment && (
          <AttachmentContainer>
            <Icon name="insert-photo" size={24} color="gray" />
            <AttachmentTextContainer>
              <AttachmentName>{props.selectedAttachment.name}</AttachmentName>
              <RemoveButton onPress={()=>props.setSelectedAttachment(null)}>
                <Icon name="close" size={20} color="gray" />
              </RemoveButton>
            </AttachmentTextContainer>
          </AttachmentContainer>
        )}
      </ComposerContainer>
    )
  },[props])
  const renderInputToolbar = useCallback((toolbarProps: InputToolbarProps<CustomMessage>) => (
    <>
      <InputToolbar
        {...toolbarProps}
        containerStyle={[styles.inputToolbar,{ borderColor: isFocused ? Colors.purple : '#e3e3e3' }]}
        renderComposer={renderCustomComposer}
        renderSend={renderSend}
        {
          ...(!props.selectedAttachment && props.microphoneVisible
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
    </>
  ),[isFocused, props.microphoneOpen, props.microphoneVisible, props.selectedAttachment, renderCustomComposer, renderSend])

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
  }, [props.inputType, renderConfirmToolbar, renderInputToolbar])

  const renderSend = useCallback((sendProps:SendProps<CustomMessage>) => (
    <SendContainer style={{alignSelf:props.selectedAttachment ? 'auto' : 'center'}}>
      {!props.selectedAttachment && (<TouchableOpacity style={{marginRight:5}} onPress={props.handleAttachment}>
        <Image source={Images.attachmentIcon} style={styles.attachmentIcon} />
      </TouchableOpacity>)}
      <Send {...sendProps} alwaysShowSend containerStyle={styles.send}>
        <Icons name={'arrowUp'} color={'white'} size={25} />
      </Send>
    </SendContainer>
  ), [props])
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
  const renderFooter = () => {
    if (props.isTyping) {
      return (
        <TypingContainer>
          <TypingIndicator />
        </TypingContainer>
      )
    }
    return null
  }
  return (
    <MainContainer>
      <SafeAreaView style={{flex: 1}} edges={['bottom']}>
        <GiftedChat
          user={{_id: 1}}
          onSend={props.onSend}
          messages={props.messages}
          renderMessage={renderMessage}
          renderMessageImage={renderMessageFile}
          renderInputToolbar={renderToolbar}
          listViewProps={{
            contentContainerStyle: styles.messagesContainer,
          }}
          isTyping={props.isTyping}
          shouldUpdateMessage={() => true}
          keyboardShouldPersistTaps="always"
          renderFooter={renderFooter}
          messagesContainerStyle={{paddingBottom:props.selectedAttachment ? 35 : 0}}
          // textInputProps={{placeholder: 'Tell Athlea your goal...',color:Colors.black1,fontSize:17, onFocus:()=>setIsFocused(true), onBlur:()=>setIsFocused(false)}}
        />
        {Platform.OS === 'android' && <KeyboardAvoidingView keyboardVerticalOffset={80} behavior="padding" />}
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
