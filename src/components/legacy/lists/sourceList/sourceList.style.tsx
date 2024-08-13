import styled, {css} from 'styled-components/native';

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 5px 20px 15px;
`;

export const Seperator = styled.View`
  ${({theme}) => css`
    border-bottom-color: ${theme.primaryscale[5]};
    border-bottom-width: 1px;
  `}
`;
