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
  SheetFooter,
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
    closeMicSheet,
    openMicSheet,
    chatLayoutProps,
    backToHome,
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
          <TouchableOpacity onPress={backToHome}>
            <Icons name={'cross'} size={24} color={Colors.black4} />
          </TouchableOpacity>
          <Text size={22} color={Colors.black1}>athlea</Text>
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
    </>
  );
};
