import {StyleSheet} from 'react-native'
import styled, {css} from 'styled-components/native'
import {Colors} from 'theme'

export const Subtitle = styled.Text`
  ${({theme}) => css`
    font-size: 18px;
    color: ${theme.subtitle};
    margin: 0 25px 29px 25px;
  `}
`

export const Username = styled.Text`
  ${({theme}) => css`
    color: ${theme.primary};
    font-size: 18px;
  `}
`
export const BackButton = styled.TouchableOpacity`
  gap: 4px;
  marging-right: 5px;
`
export const Container = styled.ScrollView`
  margin: 20px;
`
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
`

export const ProfileListItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
`
export const ListItem = styled.TouchableOpacity<{isLastIndex: boolean}>`
  ${({theme, isLastIndex}) => css`
    border-bottom-color: ${isLastIndex ? '#fff' : theme.black5};
    border-bottom-width: ${isLastIndex ? '0px' : '1px'};
    font-size: 18px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
    padding: 15px;
  `}
`

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
`

export const DeleteAccountItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
  elevation: 1;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-offset: 0px 2px;
`

export const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`

export const ListItemIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`

export const LogoutButton = styled.TouchableOpacity`
  ${({}) => css`
    background-color: #fff;
    border: 1px solid ${Colors.warning500};
    padding: 15px;
    border-radius: 10px;
    margin-top: 20px;
    align-items: center;
  `}
`

export const SheetContainer = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`

export const SheetHeader = styled.View`
  ${({theme}) => css`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 16px;
    border-bottom-width: 1px;
    border-color: ${theme.divider};
  `}
`

export const HeaderButton = styled.TouchableOpacity`
  padding: 10px;
`

export const ButtonText = styled.Text`
  font-size: 18px;
  color: #007aff;
`

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`

export const AvatarContainer = styled.View`
  margin: 30px 0 40px 0;
  align-items: center;
`

export const DetailsSection = styled.View`
  margin-top: 10px;
  padding: 20px;
`

export const Footer = styled.View`
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`

export const styles = StyleSheet.create({
  commonInputStyle: {
    color: Colors.black1,
  },
})
