import BottomSheet from '@gorhom/bottom-sheet'
import {
  MainContainer,
  SheetHeader,
  SheetContainer,
  Header,
  MicrophoneContainer,
  AIContainer,
  AIButton,
  SheetFooter,
  ModalBackground,
  ModalContainer,
  TitleText,
  ActionItem,
  ActionText,
  ActionItemDelete,
  DeleteText,
  DeleteContainer,
} from './Chat.styled'
import {Text} from '../../../components'
import {ChatLayout} from '../../../layouts'
import {useChat} from '../useChat'
import {Icons} from '../../../assets/icons'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Image, Modal, TouchableOpacity} from 'react-native'
import {Colors} from '../../../theme'
import {TrainingTypes} from '../../../_constants'
import {useMemo} from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { TouchableWithoutFeedback } from 'react-native'

export const Chat = () => {
  const insets = useSafeAreaInsets()
  const {
    chatSheetRef,
    snapPoints,
    closeMicSheet,
    openMicSheet,
    chatLayoutProps,
    backToHome,
    isVisible,
    setIsVisible,
  } = useChat()

  const aiButtons = useMemo(
    () => [
      {icon: 'ai', color: Colors.purple},
      {icon: 'wellBeing', color: Colors[TrainingTypes.wellBeing]},
      {icon: 'nutrition', color: Colors[TrainingTypes.nutrition]},
      {icon: 'strength', color: Colors[TrainingTypes.strength]},
      {icon: 'cycling', color: Colors[TrainingTypes.cycling]},
      {icon: 'running', color: Colors[TrainingTypes.running]},
    ],
    [],
  )

  return (
    <>
      <MainContainer>
        <Header>
          <TouchableOpacity onPress={backToHome}>
            <Icons name={'cross'} size={24} color={Colors.black4} />
          </TouchableOpacity>
          <Text onPress={() => setIsVisible(true)} size={22} color={Colors.black1}>athlea</Text>
          <Icons name={'share'} size={24} color={Colors.black4} />
        </Header>
        <ChatLayout {...chatLayoutProps} microphoneOpen={openMicSheet} microphoneVisible={true} />
      </MainContainer>
      <BottomSheet
        index={-1}
        ref={chatSheetRef}
        enablePanDownToClose
        topInset={insets.top}
        snapPoints={snapPoints}
        handleComponent={() => null}>
        <SheetContainer>

          <SheetHeader>
            <Text size={22} weight={'300'} centered>
            athlea
            </Text>
            <AIContainer>
              {aiButtons.map(button => (
                <AIButton color={button.color} selected={false}>
                  <Icons name={button.icon} size={16} color={Colors.white} />
                </AIButton>
              ))}
              <TouchableOpacity>
                <Icons name={'chevron'} size={24} color={Colors.blackNew3} />
              </TouchableOpacity>
            </AIContainer>
            <Image
              source={require('../../../assets/images/mic_effect.png')}
              style={{width: 240, height: 230, marginTop: 40}}
            />
          </SheetHeader>
          <SheetFooter>
            <TouchableOpacity onPress={closeMicSheet}>
              <Icons name={'messageCircle'} size={28} />
            </TouchableOpacity>
            <MicrophoneContainer onPress={openMicSheet}>
              <Icons name={'microphone'} color={'white'} size={28} />
            </MicrophoneContainer>
            <TouchableOpacity onPress={closeMicSheet}>
              <Icons name={'cross'} size={28} />
            </TouchableOpacity>
          </SheetFooter>
        </SheetContainer>
      </BottomSheet>
      <Modal
        transparent={true}
        visible={isVisible}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <ModalBackground>
            <ModalContainer>
              <TitleText>Pain versus Suffering</TitleText>

              <ActionItem onPress={() => console.log('Share')}>
                <ActionText>Share</ActionText>
                <Icon name="share" size={20} color="#000" />
              </ActionItem>

              <ActionItem onPress={() => console.log('Rename')}>
                <ActionText>Rename</ActionText>
                <Icon name="edit" size={20} color="#000" />
              </ActionItem>

              <ActionItem onPress={() => console.log('Archive')}>
                <ActionText>Archive</ActionText>
                <Icon name="archive" size={20} color="#000" />
              </ActionItem>
            </ModalContainer>
            <DeleteContainer>
              <ActionItemDelete onPress={() => console.log('Delete')}>
                <DeleteText>Delete</DeleteText>
                <Icon name="trash-2" size={20} color="red" />
              </ActionItemDelete>
            </DeleteContainer>
          </ModalBackground>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}
