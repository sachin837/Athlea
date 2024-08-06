import styled, {css} from 'styled-components/native';
import {widthPercentageToDP} from '../../../utils/deviceOrientationHook.tsx';
import AthleaIcons from '../../../assets/icons/Icons.tsx';

export const Container = styled.TouchableOpacity`
  flex-direction: column;
  padding: 10px;
`;

export const TrainingContainer = styled.View`
  ${({theme}) => css`
    flex-direction: row;
    background-color: #ffffff;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    border: 2px solid ${theme.primaryscale[3]};
    border-radius: 10px;
  `}
`;

export const SeparatorLine = styled.View`
  ${({theme}) => css`
    height: 1px;
    background-color: ${theme.primaryscale[5]};
    margin: 10px 0;
  `}
`;

export const ItemContainer = styled.View`
  flex-direction: column;
  flex: 1;
  padding: 5px 15px 5px 10px;
`;

export const PageRingContainer = styled.View`
  padding-top: 10px;
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
