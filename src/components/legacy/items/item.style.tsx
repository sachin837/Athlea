import styled, {css} from 'styled-components/native';
import AthleaIcons from '../../../assets/icons/Icons.tsx';

export const ItemContainer = styled.View`
  flex-direction: column;
  padding: 15px;
`;

export const ItemSeperator = styled.View`
  ${({theme}) => css`
    border-bottom-color: ${theme.primaryscale[5]};
    border-bottom-width: 1px;
  `}
`;

export const ContentText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primaryscale[7]};
    font-weight: ${theme.font.weight.regular};
    padding-bottom: 5px;
  `}
`;

export const SourceTitleText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
    padding-bottom: 5px;
  `}
`;

export const SourceUrlText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[2]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
    padding: 5px 0px;
  `}
`;

export const SourceUrlContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(AthleaIcons)`
  ${({theme, size, paddingRight}) => css`
    color: ${theme.primary};
    font-size: ${size ?? theme.font.size[6]}px;
    padding-right: ${paddingRight ?? 3}px;
  `}
`;
