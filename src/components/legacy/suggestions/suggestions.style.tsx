import styled, {css} from 'styled-components/native';
import AthleaIcons from '../../../assets/icons/Icons.tsx';

export const Container = styled.TouchableOpacity`
  flex: 1;
`;

export const SuggestionsContainer = styled.View`
  flex-direction: row;
  padding: 20px 10px;
  align-items: center;
  justify-content: space-between;
`;

export const SuggestionsText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
    max-width: 300px;
  `}
`;

export const Icon = styled(AthleaIcons)`
  ${({theme, size}) => css`
    color: ${theme.primary};
    font-size: ${size ?? theme.font.size[6]}px;
    padding-right: 20px;
  `}
`;

export const Seperator = styled.View`
  ${({theme}) => css`
    border-bottom-color: ${theme.primaryscale[6]};
    border-bottom-width: 1px;
  `}
`;
