import React, {useCallback, useMemo, useRef} from 'react';
import {Keyboard, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {BottomSheetAnimationConfigs} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/types';
import {
  Container,
  Icon,
  QuestionContainer,
  QuestionRowContainer,
  QuestionText,
  SubheaderText,
  TopBarContainer,
} from './inputSuggestions.style.tsx';
import {useInput} from '../../../contexts/InputContext.tsx';
import {threads} from '../../../data/threads.ts';
import {useNavigation} from '@react-navigation/native';

const suggestions = [
  'What are the benefits of high-intensity interval training (HIIT) for athletes?',
  'Can you recommend a training plan for a beginner triathlete?',
  'What is the best way to recover from a sports injury?',
  'How do professional athletes manage their diet during the off-season?',
  'What are some mental strategies to enhance performance in competitive sports?',
  'How can I improve my swimming technique for better efficiency?',
  'What are the essential exercises for building core strength for soccer players?',
  'Can yoga and meditation improve athletic performance?',
  'What role does sports psychology play in enhancing athletic ability?',
  'How to prepare for a marathon: Tips and training advice?',
  'What are the key components of a successful team training session?',
  'How to maintain fitness levels during a sports season break?',
  'What are some common mistakes to avoid in strength training for athletes?',
  'How does altitude training benefit endurance athletes?',
  'What are effective ways to increase flexibility and prevent injuries in gymnastics?',
  'Can wearable technology improve training outcomes for athletes?',
  'What nutritional supplements are recommended for muscle recovery?',
  'How to balance weight training and cardio for optimal athletic performance?',
];

function InputSuggestionsComp({onSelectSuggestion, handleSheetChanges}) {
  const bottomSheetRef2 = useRef<BottomSheetAnimationConfigs>(null);
  // Assuming '100%' is the last snap point
  const snapPoints = useMemo(() => ['90%'], []);
  const scrollRef = useRef(null);
  const {inputValue} = useInput();

  return (
    <BottomSheet
      key={'bottomSheet'}
      ref={bottomSheetRef2}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <BottomSheetScrollView ref={scrollRef}>
        <Container>
          <TopBarContainer>
            <Icon
              name="close-icon-fill"
              size={30}
              onPress={() => bottomSheetRef2.current.close()}
            />
            <SubheaderText>Suggestions</SubheaderText>
            <Icon name="search" size={30} />
          </TopBarContainer>
          <QuestionContainer>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  onSelectSuggestion(suggestion);
                }}
                key={index}>
                <QuestionRowContainer>
                  <QuestionText>{suggestion}</QuestionText>
                </QuestionRowContainer>
              </TouchableOpacity>
            ))}
          </QuestionContainer>
        </Container>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

export default InputSuggestionsComp;
