import styled, {css} from 'styled-components/native';
import AthleaIcons from '../../../assets/icons/Icons.tsx';
import {Text, View} from 'react-native';
import React from 'react';

export const Container = styled.View`
  flex: 1;
`;

export const TopBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

export const Icon = styled(AthleaIcons)`
  ${({theme, size, paddingRight, color}) => css`
    color: ${color ?? theme.primary};
    font-size: ${size ?? theme.font.size[6]}px;
    padding-right: ${paddingRight ?? 3}px;
  `}
`;

export const TopBarSeperator = styled.View`
  ${({theme}) => css`
    border-bottom-color: ${theme.primaryscale[5]};
    border-bottom-width: 1px;
    margin-top: 10px;
  `}
`;

export const ResponseContainer = styled.View`
  flex-direction: column;
  padding: 20px;
`;

export const QuestionContainer = styled.View`
  flex-direction: column;
  padding: 10px 0px 20px 0px;
`;

export const QuestionText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[7]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.medium};
  `}
`;

export const SourcesBox = styled.View`
  flex-direction: column;
  padding-bottom: 20px;
`;

export const SourcesContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
`;

export const SourcesRowContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  flex-direction: row;
`;

export const SourcesTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SubheaderText = styled.Text`
  ${({theme}) => css`
    font-size: 22px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.medium};
    padding-left: 5px;
  `}
`;

export const DataBox = styled.View`
  flex-direction: column;
  padding-bottom: 30px;
`;

export const DataContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
`;

export const DataTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DataRowContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  flex-direction: row;
`;

export const ResponseContentContainer = styled.View`
  flex-direction: column;
`;

export const ResponseLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ResponseRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
`;

export const LabelText = styled.Text`
  ${({theme, color}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${color ?? theme.primary};
    font-weight: ${theme.font.weight.regular};
  `}
`;

export const ContentText = styled.Text`
  ${({theme, color}) => css`
    font-size: ${theme.font.size[5]}px;
    color: ${color ?? theme.primary};
    font-weight: ${theme.font.weight.regular};
    padding-bottom: 20px;
  `}
`;

export const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0px;
`;

export const ActionIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextInputContainer = styled.View`
  position: absolute;
  bottom: 20px;
`;

export const SuggestionsRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px 0px 30px 0px;
`;

export const SuggestionsLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SuggestionsBox = styled.View`
  flex-direction: column;
`;

export const SuggestionSeperator = styled.View`
  ${({theme}) => css`
    border-bottom-color: ${theme.primaryscale[5]};
    border-bottom-width: 1px;
    margin-top: 10px;
  `}
`;

export const SuggestionContainer = styled.View`
  flex-direction: column;
`;

export const SuggestionText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
  `}
`;

export const SimilarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

export const HighlightedTextStyle = styled.Text`
  ${({theme, aiActive, isSelected, size}) => css`
    color: ${theme.secondary};
    font-size: ${size ?? theme.font.size[5]}px;
    font-weight: ${isSelected ? 'normal' : 500};
  `}
`;

export const ActionTextStyle = styled.Text`
  ${({theme, aiActive, isSelected, size}) => css`
    color: ${theme.third};
    font-size: ${size ?? theme.font.size[5]}px;
    font-weight: ${isSelected ? 'normal' : 500};
  `}
`;

export const GraphTextStyle = styled.Text`
  ${({theme, isSelected, aiActive}) => css`
    color: ${theme.fourth};
    font-size: ${theme.font.size[5]}px;
    font-weight: ${isSelected ? 'normal' : 500};
  `}
`;

// Original styled components (without aiActive prop)
const StyledHighlightedText = styled.Text`
  ${({theme}) => css`
    color: ${theme.secondary};
    font-size: ${theme.font.size[5]}px;
    font-weight: 500;
  `}
`;

const StyledActionText = styled.Text`
  ${({theme, isSelected}) => css`
    color: ${isSelected ? theme.primaryscale[9] : theme.third};
    font-size: ${theme.font.size[5]}px;
    font-weight: ${isSelected ? 'normal' : 500};
  `}
`;

const StyledGraphText = styled.Text`
  ${({theme, isSelected}) => css`
    color: ${theme.fourth};
    font-size: ${theme.font.size[5]}px;
    font-weight: ${isSelected ? 'normal' : 500};
  `}
`;

// Functional component wrapper
const TextWithNumber = ({
  children,
  Component,
  showNumber,
  number,
  ...props
}) => (
  <View style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
    {showNumber && (
      <View
        style={{
          height: 16,
          width: 16,
          borderRadius: 8,
          backgroundColor: 'grey',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 5,
        }}>
        <Text style={{color: 'white', fontSize: 12}}>{number}</Text>
      </View>
    )}
    <Component {...props}>{children}</Component>
  </View>
);

// Export the adjusted components
export const HighlightedTextStyleWithNumber = props => (
  <TextWithNumber Component={StyledHighlightedText} {...props} />
);
export const ActionTextStyleWithNumber = props => (
  <TextWithNumber Component={StyledActionText} {...props} />
);
export const GraphTextStyleWithNumber = props => (
  <TextWithNumber Component={StyledGraphText} {...props} />
);
