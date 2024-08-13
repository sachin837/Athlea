import styled, {css} from 'styled-components/native';
import AthleaIcons from '../../../assets/icons/Icons.tsx';

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
  ${({theme, size, paddingRight}) => css`
    color: ${theme.primary};
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
  padding: 20px 20px 20px 20px;
`;

export const QuestionRowContainer = styled.View`
  padding-bottom: 20px;
`;

export const QuestionText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[6]}px;
    color: ${theme.primaryscale[8]};
    font-weight: ${theme.font.weight.regular};
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
  ${({theme}) => css`
    color: ${theme.secondary};
    font-size: ${theme.font.size[5]}px;
    padding: 0;
    margin: 0;
  `}
`;

export const ActionTextStyle = styled.Text`
  ${({theme}) => css`
    color: ${theme.third};
    font-size: ${theme.font.size[5]}px;
    padding: 0;
    margin: 0;
  `}
`;

export const GraphTextStyle = styled.Text`
  ${({theme, isSelected}) => css`
    color: ${theme.fourth};
    font-size: ${theme.font.size[5]}px;
    padding: 0;
    margin: 0;
    font-weight: ${isSelected ? 'bold' : 'normal'};
  `}
`;
