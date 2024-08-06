import {View, Text} from 'react-native';
import React from 'react';
import {
  Container,
  Icon,
  Seperator,
  SuggestionsContainer,
  SuggestionsText,
} from './suggestions.style.tsx';
import {SuggestionText} from '../response/response.style.tsx';
import {useAdditionalResponses} from '../../../contexts/AdditonalResponseContext.tsx';

const Suggestions = ({suggestiontext}: {suggestiontext: string}) => {
  const {handleSuggestionSelect} = useAdditionalResponses();

  return (
    <Container onPress={() => handleSuggestionSelect(suggestiontext)}>
      <Seperator />
      <SuggestionsContainer>
        <SuggestionsText>{suggestiontext}</SuggestionsText>
        <Icon name="add" size={18} />
      </SuggestionsContainer>
    </Container>
  );
};

export default Suggestions;
