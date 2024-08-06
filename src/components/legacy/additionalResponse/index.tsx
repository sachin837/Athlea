import React from 'react';
import {View} from 'react-native';
import Response from '../response';
import {useAdditionalResponses} from '../../../contexts/AdditonalResponseContext.tsx';
import useBottomSheet from '../../../hooks/useBottomSheet.tsx';

const AdditionalResponseRenderer = ({
  additionalResponses,
  topBarVisible,
  setShowTextInput,
}) => {
  const {mainScrollRef} = useAdditionalResponses();
  const {
    isBottomSheetVisible,
    bottomSheetRef2,
    openBottomSheet,
    snapPoints,
    handleSheetChanges,
    scrollRef,
    setIsBottomSheetVisible,
  } = useBottomSheet(setShowTextInput);
  // Check if additionalResponses exists and has entries to render
  if (!additionalResponses || additionalResponses.length === 0) {
    return null; // Return null or any placeholder when there are no additional responses to render
  }

  return (
    <View>
      {additionalResponses.map((response, index) => (
        // Render a Response component for each additional response, passing the individual response as selectedThread
        <Response
          key={index}
          topBarVisible={false}
          selectedThread={response}
          setShowTextInput={setShowTextInput}
        />
      ))}
    </View>
  );
};

export default AdditionalResponseRenderer;
