import styled, {css} from 'styled-components/native';
import {widthPercentageToDP} from '../../../utils/deviceOrientationHook.tsx';
import AthleaIcons from '../../../assets/icons/Icons.tsx';

export const Container = styled.View`
  flex-direction: column;
  margin: 8px 0;
`;

export const TrainingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0px;
`;

export const SeparatorLine = styled.View`
  ${({theme}) => css`
    height: 1px;
    background-color: ${theme.primaryscale[1]};
    margin: 10px 0;
  `}
`;

export const ItemContainer = styled.View`
  flex-direction: column;
  flex: 1;
  padding: 5px 15px 5px 10px;
`;

export const ItemCategoryTitle = styled.Text`
  ${({theme}) => css`
    font-size: 12px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
    padding-bottom: 5px;
  `}
`;

export const ItemTitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ItemTitle = styled.Text`
  ${({theme}) => css`
    font-size: 16px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.bold};
  `}
`;

export const ItemDate = styled.Text`
  ${({theme}) => css`
    font-size: 12px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
  `}
`;

export const ItemIcon = styled(AthleaIcons)`
  ${({theme}) => css`
    font-size: 24px;
    color: ${theme.primary};
  `}
`;
