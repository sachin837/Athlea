import styled, {css} from 'styled-components/native';
import AthleaIcons from '../../../../assets/icons/Icons.tsx';

export const Container = styled.TouchableOpacity`
  flex-direction: column;
  padding: 10px;
  background-color: ${({theme}) => theme.panelbackground};
  border-radius: 5px;
  margin-right: 10px;
  width: 145px;
  height: 110px;
`;

export const PanelLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(AthleaIcons)`
  ${({theme, size}) => css`
    color: ${theme.primary};
    font-size: ${size ?? theme.font.size[2]}px;
  `}
`;

export const PanelLabelText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[2]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
    padding-left: 4px;
  `}
`;
