import {View, Text, StyleSheet, Button} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActionIconContainer,
  ActionTextStyle,
  Container,
  ContentText,
  DataBox,
  DataContainer,
  DataRowContainer,
  DataTextContainer,
  GraphTextStyle,
  HighlightedTextStyle,
  Icon,
  IconContainer,
  LabelText,
  QuestionContainer,
  QuestionText,
  ResponseContainer,
  ResponseContentContainer,
  ResponseLabelContainer,
  ResponseRowContainer,
  SourcesBox,
  SourcesContainer,
  SourcesRowContainer,
  SourcesTextContainer,
  SubheaderText,
  SuggestionContainer,
  SuggestionsBox,
  SuggestionsLabelContainer,
  SuggestionsRowContainer,
  TextInputContainer,
  TopBarContainer,
  TopBarSeperator,
} from './response.style.tsx';
import {useTheme} from 'styled-components/native';
import SourcePanel from '../panels/sourcePanel';
import DataPanel from '../panels/dataPanel';
import Suggestions from '../suggestions';
import {Seperator} from '../suggestions/suggestions.style.tsx';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {addThread, updateThreadDateSaved} from '../../../store/threads';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import useBottomSheet from '../../../hooks/useBottomSheet.tsx';
import SourceItem from '../items/sourceItems';
import SourceList from '../lists/sourceList';
import TextInputComp from '../input/text';
import GraphPlusHeaderGraph from '../graphs/graphPlusHeader';
import {isAction} from 'redux';
import useActionSheet from '../../../hooks/useActionSheet.tsx';
import {set} from 'date-fns';
import DetachedModal from '../modals/detached';
import {useAdditionalResponses} from '../../../contexts/AdditonalResponseContext.tsx';
import AdditionalResponseRenderer from '../additionalResponse';
import {Animated} from 'react-native';
import useAnimateText from '../../../utils/animateText.tsx';
import useRenderBodyText from '../../../hooks/useRenderBodyText.tsx';

const Response = ({
  selectedThread,
  closeBottomSheet,
  setShowTextInput,
  topBarVisible,
  ref,
}) => {
  // Log the entire object
  const renderBodyText = useRenderBodyText();

  // Use renderBodyText function to render text with the given parameters

  const [contentType, setContentType] = useState(null);
  const [selectedGraphIndex, setSelectedGraphIndex] = useState(null);
  const theme = useTheme();
  const navigation = useNavigation();
  const highlightedSections = selectedThread.highlightedSections || [];
  const actions = selectedThread.actions || [];
  const graphType = selectedThread.graphType || []; // Default to line graph
  // Dependency array ensures this effect runs only when isBottomSheetVisible changes
  const dispatch = useDispatch();

  const handleAddThread = () => {
    const now = new Date().toISOString(); // Current timestamp

    // Add the 'dateSaved' and 'updated' properties
    const threadWithAdditionalInfo = {
      ...selectedThread,
      dateSaved: now,
      updated: now,
    };

    dispatch(addThread(threadWithAdditionalInfo)); // Dispatch the addThread action
    console.log('thread added');
  };

  const {
    isBottomSheetVisible,
    bottomSheetRef2,
    openBottomSheet,
    snapPoints,
    handleSheetChanges,
    scrollRef,
    setIsBottomSheetVisible,
  } = useBottomSheet(setShowTextInput);

  const handleSelection = type => {
    setContentType(type);
    openBottomSheet();
  };

  // Modal visibility and content state
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Function to handle action text press
  const handleActionPress = actionContent => {
    // Show the action sheet
    setShowTextInput(false);
    setModalContent(actionContent); // Set content based on the action
    setModalVisible(true); // Show the modal
  };

  // Close modal function
  const handleCloseModal = () => {
    setModalVisible(false);
    setShowTextInput(true);
  };

  const {mainScrollRef} = useAdditionalResponses();
  const hasAdditionalResponse = selectedThread?.additionalResponses?.length > 0;

  useEffect(() => {
    if (isBottomSheetVisible) {
      mainScrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
    }
  }, [isBottomSheetVisible]);

  useEffect(() => {
    const yOffset = 2300;

    if (hasAdditionalResponse) {
      mainScrollRef.current?.scrollTo({y: yOffset, animated: true});
    }
  }, [hasAdditionalResponse]);

  const fadeInValue1 = useRef(new Animated.Value(0)).current;
  const fadeInValue2 = useRef(new Animated.Value(0)).current;
  const fadeInValue3 = useRef(new Animated.Value(0)).current;
  const fadeInValue4 = useRef(new Animated.Value(0)).current;

  const animations = [
    Animated.timing(fadeInValue1, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }),
    Animated.timing(fadeInValue2, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }),
    Animated.timing(fadeInValue3, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }),
    Animated.timing(fadeInValue4, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }),
    // ...and so on for each component
  ];

  useEffect(() => {
    // Start a staggered animation
    Animated.stagger(900, animations).start(); // 300ms delay between each animation
  }, []);

  const bodyContent = renderBodyText(
    selectedThread.ThreadBodyText,
    highlightedSections,
    actions,
    graphType,
    setSelectedGraphIndex,
    selectedGraphIndex,
    handleActionPress,
  );

  return (
    <>
      <Container>
        {topBarVisible && (
          <>
            <TopBarContainer>
              <TouchableOpacity onPress={() => closeBottomSheet()}>
                <Icon name="close-icon-fill" size={30} />
              </TouchableOpacity>
              <SubheaderText>Thread</SubheaderText>
              <Icon name="share" size={30} />
            </TopBarContainer>
            <TopBarSeperator />
          </>
        )}
        <ResponseContainer>
          <Animated.View style={{opacity: fadeInValue1}}>
            <QuestionContainer>
              <QuestionText>{selectedThread.ThreadHeaderText}</QuestionText>
            </QuestionContainer>
          </Animated.View>
          <Animated.View style={{opacity: fadeInValue2}}>
            <SourcesBox>
              <SourcesContainer>
                <SourcesTextContainer>
                  <Icon name="sources" size={20} />
                  <SubheaderText>Sources</SubheaderText>
                </SourcesTextContainer>
                <LabelText onPress={() => handleSelection('sources')}>
                  show all
                </LabelText>
              </SourcesContainer>
              <BottomSheetScrollView
                horizontal
                ref={mainScrollRef}
                showsHorizontalScrollIndicator={false}>
                {selectedThread.sources.map((source, index) => (
                  <SourcePanel
                    key={index}
                    sourcecontent={source.sourcecontent}
                    source={source.source}
                    iconName={source.iconName}
                    sourceUrl={source.sourceUrl}
                  />
                ))}
              </BottomSheetScrollView>
            </SourcesBox>
          </Animated.View>
          <Animated.View style={{opacity: fadeInValue3}}>
            <DataBox>
              <DataContainer>
                <DataTextContainer>
                  <Icon name="stats" size={20} />
                  <SubheaderText>Data</SubheaderText>
                </DataTextContainer>
                <LabelText onPress={() => handleSelection('data')}>
                  show all
                </LabelText>
              </DataContainer>
              <BottomSheetScrollView
                horizontal
                ref={mainScrollRef}
                showsHorizontalScrollIndicator={false}>
                {selectedThread.data.map((data, index) => (
                  <DataPanel
                    key={index}
                    dataContent={data.dataContent}
                    data={data.data}
                    iconName={data.iconName}
                  />
                ))}
              </BottomSheetScrollView>
            </DataBox>
          </Animated.View>
          <Animated.View style={{opacity: fadeInValue4}}>
            <ResponseContentContainer>
              <ResponseRowContainer>
                <ResponseLabelContainer>
                  <Icon name="response" size={15} />
                  <SubheaderText>Response</SubheaderText>
                </ResponseLabelContainer>
                <LabelText color={theme.secondary}>
                  {selectedThread.accuracy}
                </LabelText>
              </ResponseRowContainer>
              <ContentText>{bodyContent}</ContentText>
            </ResponseContentContainer>
          </Animated.View>
          <IconContainer>
            <ActionIconContainer>
              <Icon name="redo" size={20} paddingRight={15} />
              <Icon
                name="save"
                size={20}
                paddingRight={15}
                onPress={handleAddThread}
              />
              <Icon name="share" size={20} paddingRight={15} />
            </ActionIconContainer>
            <Icon name="extras" size={10} />
          </IconContainer>

          <SuggestionsBox>
            <SuggestionsRowContainer>
              <SuggestionsLabelContainer>
                <Icon name="ai" size={20} />
                <SubheaderText>Similar</SubheaderText>
              </SuggestionsLabelContainer>
            </SuggestionsRowContainer>
            <SuggestionContainer>
              {selectedThread.suggestions.map((suggestion, index) => (
                <Suggestions
                  key={index}
                  suggestiontext={suggestion.suggestionText}
                />
              ))}
              <Seperator />
            </SuggestionContainer>
          </SuggestionsBox>
        </ResponseContainer>
        {isBottomSheetVisible && (
          <BottomSheet
            key={'bottomSheet'}
            ref={bottomSheetRef2}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}>
            <BottomSheetScrollView ref={mainScrollRef}>
              <SourceList
                title={contentType === 'sources' ? 'Sources' : 'Data'}
                icon={contentType === 'sources' ? 'sources' : 'stats'}
                contentType={contentType}
                selectedThread={selectedThread}
              />
            </BottomSheetScrollView>
          </BottomSheet>
        )}
      </Container>
      {modalVisible && (
        <DetachedModal
          isVisible={modalVisible}
          onClose={handleCloseModal}
          content={modalContent}
        />
      )}
    </>
  );
};

export default Response;
