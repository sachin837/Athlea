import styled, {css} from 'styled-components/native';
import AthleaIcons from '../../../assets/icons/Icons.tsx';

export const Container = styled.TouchableOpacity`
  flex-direction: column;
  padding: 15px;
`;

export const HeaderText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[5]}px;
    color: ${theme.primary};
    font-weight: 500;
    padding: 0px 5px 5px 5px;
  `}
`;

export const HeaderContainer = styled.View`
  align-items: center;
  padding-bottom: 15px;
`;

export const Seperator = styled.View`
  ${({theme}) => css`
    border-bottom-color: ${theme.primaryscale[5]};
    border-bottom-width: 1px;
    margin-top: 10px;
  `}
`;
