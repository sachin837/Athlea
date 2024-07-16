import styled, {css} from 'styled-components/native';
import AthleaIcons from '../../../assets/icons/Icons.tsx';

export const Container = styled.View`
  padding-left: 8px;
`;

export const LoadingField = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 20px;
`;

export const Icon = styled(AthleaIcons)`
  ${({theme, size, paddingRight}) => css`
    color: ${theme.primary};
    font-size: ${size ?? theme.font.size[6]}px;
    padding-right: ${paddingRight ?? 3}px;
  `}
`;

export const SubheaderText = styled.Text`
  ${({theme}) => css`
    font-size: 16px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
    padding-left: 5px;
  `}
`;
