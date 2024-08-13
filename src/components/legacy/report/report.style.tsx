import styled, {css} from 'styled-components/native';
import AthleaIcons from '../../../assets/icons/Icons.tsx';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitleContainer = styled.View`
  flex-direction: column;
`;

export const HeaderSubText = styled.Text.attrs<{size: number}>(props => {
  const {size} = props;
  return {
    size: size,
  };
})<{size: number}>`
  ${({theme, size}) => css`
    font-size: ${size ? size : 18}px;
    color: ${theme.primary};
    font-weight: 400;
  `}
`;

export const HeaderText = styled.Text.attrs<{size: number}>(props => {
  const {size} = props;
  return {
    size: size,
  };
})<{size: number}>`
  ${({theme, size}) => css`
    font-size: ${size ? size : 20}px;
    color: ${theme.primary};
    font-weight: 600;
    padding-bottom: 5px;
  `}
`;

export const HeaderIcon = styled(AthleaIcons).attrs(props => {
  const {size, name} = props;
  return {
    size: size,
    name: name,
  };
})`
  ${({theme}) => css`
    margin-left: 10px;
    margin-top: 4px;
    color: ${theme.primary};
  `}
`;

export const BodyContainer = styled.View`
  flex-direction: column;
`;

export const ComponentContainer = styled.View`
  flex-direction: column;
`;

export const RecommendedContainer = styled.View`
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 10px;
`;

export const NutritionContainer = styled.View`
  flex-direction: column;
  padding-top: 20px;
`;
export const OverviewContainer = styled.View`
  flex-direction: column;
  padding-bottom: 20px;
  padding-top: 20px;
`;

export const ComponentTitle = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[6]}px;
    color: ${theme.primary};
    font-weight: 500;
    padding-bottom: 5px;
  `}
`;

export const ReportBodyText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
    overflow: hidden;
  `}
`;

export const RecommendationText = styled.Text`
  ${({theme}) => css`
    font-size: ${theme.font.size[4]}px;
    color: ${theme.primary};
    font-weight: ${theme.font.weight.regular};
    padding-bottom: 10px;
  `}
`;

export const GraphContainer = styled.View`
  align-items: center;
`;
