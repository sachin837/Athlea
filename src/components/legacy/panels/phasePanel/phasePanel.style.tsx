import styled, {css} from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  ${({theme}) => css`
    background-color: ${theme.panelbackground};
    border-radius: 10px;
    padding: 40px 25px 30px 25px;
    margin: 20px 20px 0px 20px;
    flex-direction: column;
  `}
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 30px;
`;

export const HeaderTitle = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[6]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.bold};
  `}
`;

export const ActivityLoadContainer = styled.View`
  flex-direction: column;
  padding-bottom: 15px;
`;

export const ScoreTextContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const ScoreHeader = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primaryscale[8]};
    font-weight: ${theme.font.weight.medium};
    padding-bottom: 10px;
  `}
`;

export const ScoreText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[7]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.medium};
  `}
`;

export const ScoreLabel = styled.Text`
  ${({theme, paddingLeft}) => css`
    font-size: ${theme.font.size[3]}px;
    color: ${theme.primaryscale[8]};
    font-weight: ${theme.font.weight.medium};
    padding-left: ${paddingLeft ? paddingLeft : 4}px;
    padding-right: 4px;
    padding-bottom: 3.5px;
  `}
`;

export const ScoreContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const TrainingStressScoreContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 15px;
  justify-content: space-between;
`;

export const DailyActivityLoadContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const GraphLabel = styled.Text`
  ${({theme}) => css`
    font-size: 10px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.bold};
  `}
`;

export const TrainingPhaseContainer = styled.View``;

export const GraphContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
