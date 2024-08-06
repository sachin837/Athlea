import BottomSheet from '@gorhom/bottom-sheet';
import {
  MainContainer,
  Footer,
  SheetHeader,
  SheetContainer,
  Header,
  MicrophoneContainer,
  AIContainer,
  AIButton,
} from './Chat.styled';
import {Text} from '../../../components';
import {ChatLayout} from '../../../layouts';
import {useChat} from '../useChat';
import {Icons} from '../../../assets/icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Image, TouchableOpacity} from 'react-native';
import {Colors} from '../../../theme';
import {TrainingTypes} from '../../../_constants';
import {useMemo} from 'react';

export const Chat = () => {
  const insets = useSafeAreaInsets();
  const {
    chatSheetRef,
    snapPoints,
    closeChatSheet,
    openChatSheet,
    chatLayoutProps,
  } = useChat();

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
  );

  return (
    <>
      <MainContainer>
        <Header>
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
            source={require('../../../assets/images/VoiceActive.png')}
            style={{width: 240, height: 230, marginTop: 40}}
          />
        </Header>
        <Footer>
          <TouchableOpacity onPress={openChatSheet}>
            <Icons name={'messageCircle'} size={28} />
          </TouchableOpacity>
          <MicrophoneContainer onPress={openChatSheet}>
            <Icons name={'microphone'} color={'white'} size={28} />
          </MicrophoneContainer>
          <TouchableOpacity>
            <Icons name={'cross'} size={28} />
          </TouchableOpacity>
        </Footer>
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
            <TouchableOpacity onPress={closeChatSheet}>
              <Icons name={'cross'} size={24} color={Colors.black4} />
            </TouchableOpacity>
            <Text size={22}>athlea</Text>
            <Icons name={'share'} size={24} color={Colors.black4} />
          </SheetHeader>
          <ChatLayout {...chatLayoutProps} />
        </SheetContainer>
      </BottomSheet>
    </>
  );
};
