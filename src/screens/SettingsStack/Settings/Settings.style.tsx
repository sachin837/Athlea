import styled, {css} from "styled-components/native";


export const Subtitle = styled.Text` 
  ${({theme}) => css`
    font-size: 18px;
    color: ${theme.subtitle};
    margin: 0 25px 29px 25px;
  `}
`

// export const ListContainer = styled.View`
//   ${({theme}) => css`
//     padding: 24px 0;
//     border-top-width: 1px;
//     border-top-color: ${theme.borderColor};
//   `}
// `

export const Username = styled.Text`
  ${({theme}) => css`
    color: ${theme.primary};
    font-size: 18px;
  `}
`
export const BackButton = styled.TouchableOpacity`
  gap: 4px;
  marging-right:5px;
`
export const Container = styled.ScrollView`
  margin: 20px;
`;
// Profile Header Component
export const ProfileHeader = styled.View`
  background-color: #fff;
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 15px;
  elevation: 1;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-offset: 0px 2px;
`;

export const ProfileHeaderView = styled.View`
  margin-bottom: 15px;
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-bottom: 10px;
`;

export const ProfileName = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;
export const ProfileListItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
`;
export const ListItem = styled.TouchableOpacity`
${({theme}) => css`
    border-bottom-color: ${props => props.isLastIndex ? '#fff' : theme.black5};
    border-bottom-width: ${props => props.isLastIndex ? '0px' : '1px'};
    font-size: 18px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
    padding: 15px;
  `}
`;

// List Item Component
export const ListContainer = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
  elevation: 1;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-offset: 0px 2px;
`;

export const ItemText = styled.Text`
  font-size: 16px;
  color: #333;
  margin-left: 5px;
`;

export const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ListItemIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const LogoutButton = styled.TouchableOpacity`
  background-color: #fff;
  border: 1px solid #ff3b30;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  align-items: center;
`;

export const LogoutText = styled.Text`
  color: #ff3b30;
  font-size: 16px;
`;

export const FooterText = styled.Text`
  color: #8e8e93;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
`;