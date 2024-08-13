import styled from 'styled-components/native';
import {css} from 'styled-components/native';

export const Container = styled.View`
  ${({theme}) => css`
    border-radius: 10px;
    padding: 5px;
    margin: 20px;
    flex-direction: column;
  `}
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 30px;
  padding-top: 10px;
`;

export const ActivityLoadContainer = styled.View`
  flex-direction: column;
  padding-bottom: 15px;
`;

export const ScoreTextContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const ScoreHeader = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[5]}px;
    color: ${theme.primaryscale[8]};
    font-weight: ${theme.font.weight.medium};
  `}
`;

export const ActivityText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[7]}px;
    color: ${theme.third};
    font-weight: ${theme.font.weight.medium};
  `}
`;

export const SubHeader = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.medium};
  `}
`;

export const ScoreText = styled.Text`
  ${({theme, color, paddingLeft}) => css`
    font-size: ${theme.font.size[7]}px;
    color: ${color ? color : theme.fourth};
    font-weight: ${theme.font.weight.medium};
    padding-left: ${paddingLeft ? paddingLeft : 0}px;
  `}
`;

export const ScoreLabel = styled.Text`
  ${({theme, paddingLeft, paddingRight}) => css`
    font-size: ${theme.font.size[3]}px;
    color: ${theme.primaryscale[8]};
    font-weight: ${theme.font.weight.medium};
    padding-left: ${paddingLeft ? paddingLeft : 4}px;
    padding-right: ${paddingRight ? paddingRight : 0}px;
    padding-bottom: 3px;
  `}
`;

export const ScoreContainer = styled.View`
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
  margin-bottom: 10px;
`;

export const DescriptorContainer = styled.View``;

export const DescriptorText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
  `}
`;
