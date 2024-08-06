import styled, {css} from 'styled-components/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../../../utils/deviceOrientationHook.tsx';

export const Container = styled.View`
  ${({theme}) => css`
    background-color: #fff;
    border-radius: 10px;
    padding: 25px;
    margin: 6px 10px;
    flex-direction: column;
    border: 2px solid ${theme.primaryscale[3]};
    width: ${widthPercentageToDP(90)}px;
    height: '80%';
  `}
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
`;

export const HeaderTitle = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.bold};
  `}
`;

export const SummaryContainer = styled.View`
  flex-direction: column;
  margin-bottom: 20px;
`;

export const SummaryText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[3]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
    overflow: hidden;
  `}
`;
