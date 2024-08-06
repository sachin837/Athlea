import styled from 'styled-components/native';
import AthleaIcons from '../../../assets/icons/Icons.tsx';
import {css} from 'styled-components/native';

export const TagIcon = styled(AthleaIcons)`
  ${({theme, size, color}) => css`
    color: ${color || theme.primary};
    font-size: ${size ?? theme.font.size[6]}px;
    padding: 5px;
  `}
`;

export const TagText = styled.Text`
  ${({theme, color}) => css`
    font-size: 13px;
    color: ${color || theme.primaryscale[8]};
    font-weight: ${theme.font.weight.regular};
  `}
`;

export const TagContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 12px;
`;

export const TagRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 5px;
  padding-top: 6px;
`;

export const TagBackgroundContainer = styled.View`
  ${({theme, color}) => css`
    background-color: ${color || theme.black};
    border-radius: 5px;
    padding: 5px;
    margin-right: 5px;
  `}
`;
