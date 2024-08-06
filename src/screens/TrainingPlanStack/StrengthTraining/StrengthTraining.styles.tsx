import styled, { css } from 'styled-components/native'
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MainContainer = styled.View`
  ${({ theme }) => css`
    background: ${theme.pageBackground};
    flex: 1;
  `}
`
export const SectionContainer = styled.View`
  gap: 16px;
  padding-top: 24px;
`
export const TitleContainer = styled.View`
  gap: 4px;
`

export const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  activeCardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  activeCardIicon: {
    marginLeft: 'auto',
  },
  TrainingCardheaderStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
})


export const StarIcon = styled(Icon)`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const Footer = styled.View`
  padding: 12px 16px 24px;
  gap: 24px;
`
// DATE TIME CARD
export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top:6px
`;

export const TextInputContainer = styled.View`
  width: 47%;
`;

export const DateTimeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  padding: 1px;
    border-radius: 8px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
`;

export const DateTimeCardView = styled.View`
${({ theme }) => css`
  background-color: ${theme.background};
  padding: 16px;
  border-radius: 8px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  width: 100%;
  `}
`;

// ActivitiesCard
export const ActivitiesCardContainer = styled.View`
${({ theme }) => css`
  background: ${theme.background};
  padding: 10px;
  margin-top: 15px;
  border-radius: 8px;
  border-color: #ccc;
  `}
`;

export const ActivitiesCardCard = styled.View`
${({ theme }) => css`
  background: ${theme.background};
  flex-direction: row;
  padding-vertical: 10px;
  align-items: center;
  `}
`;

export const ActivitiesCardSeparator = styled.View`
  height: 1px;
  background-color: #ccc;
  margin-vertical: 5px;
`;

export const ActivitiesCardInfo = styled.View`
  flex: 1;
`;

export const ActivitiesCardRow = styled.View`
  flex-direction: row;
  margin-top:2px
`;

export const ActivitiesCardDescription = styled.Text`
  color: #99a3a4;
  margin-right: 5px;
  font-size: 12px;
`;

export const ActivitiesCardButtonContainer = styled.View`
  margin-top: 10px;
`;

export const ActivitiesCardIconComponent = styled(Icon)`
  margin-left: auto;
`;

//TrainingCard

export const TrainingCardContainer = styled.View`
  margin-bottom: 16px;
`;

export const TrainingCardCard = styled.View`
 ${({ theme }) => css`
  background-color: ${theme.background};
  padding: 16px;
  border-radius: 8px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
   `}
`;

export const TrainingCardInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
  width: 80%;
  margin-top:3px
`;

export const TrainingCardInfo = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledTextInput = styled.TextInput`
  flex: 1;
  height: 40px;
  font-size: 16px;
`;