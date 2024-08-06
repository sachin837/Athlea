import styled, { css } from 'styled-components/native';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Text } from '../../../components';

export const MainContainer = styled.View`
  ${({ theme }) => css`
    background: ${theme.pageBackground};
    flex: 1;
  `}
`;

export const SectionContainer = styled.View`
${({ theme }) => css`
  background: ${theme.background};
  margin:10px;
  border-radius: 10px;
  padding:10px;
  padding-top:10px
  `}
`;

export const UserContainer = styled.View`
padding-top: 24px;
  background-color: #fff;
  border-radius: 10px;
`;

export const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 1,
    paddingVertical: 2,
  },
});


export const CardContainer = styled.View`
  ${({ theme }) => css`
  background: ${theme.background};
  margin: 8px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-left-radius:16px;
  border-bottom-right-radius:16px;
  `}
`;

export const ImageContainer = styled.View`
  height: 206px;
`;

export const StyledImage = styled.Image`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const InfoContainer = styled.View`
  margin-horizontal: 10px;
  margin-vertical: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top:2px
`;

export const DescriptionContainer = styled.View`
  margin-horizontal: 8px;
  margin-vertical: 8px;
`;

export const DetailsContainer = styled.View`
  margin-horizontal: 5px;
  margin-vertical: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom:8px;
  padding-left:5px

`;

export const DetailItem = styled.View``;
export const IntensityLevelItem = styled.View`
padding-right:30px
`;

export const StarIcon = styled(Icon)`
  position: absolute;
  top: 2px;
  right: 8px;
`;