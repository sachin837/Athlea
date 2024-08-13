import styled, {css, DefaultTheme} from 'styled-components/native';

export const StyledContainer = styled.View`
  background-color: #fff;
`;

export const TopContainer = styled.View`
  flex: 0.12;
`;

export const TopNavigationContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

export const BrandIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

export const BrandName = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

export const WatchImage = styled.Image`
  /* we keep width and height dynamic since they might change */
`;

export const WatchName = styled.Text`
  font-weight: 400;
  margin-top: 10px;
`;
