import styled, {css} from 'styled-components/native';
import {StyleSheet} from 'react-native';

// Container for the entire screen
export const Container = styled.View`
  flex: 1;
  background-color: #f5f7fb;
  margin-bottom: 10px;
`;

export const MainContainer = styled.View`
  flex: 1;
  background-color: #f5f7fb;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #111;
`;

// Description text
export const Description = styled.Text`
  font-size: 16px;
  color: #888;
  margin-bottom: 20px;
`;

// Permission item container
export const PermissionItem = styled.View`
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  elevation: 1;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  shadow-offset: 0px 2px;
`;

// Permission item text container
export const PermissionTextContainer = styled.View`
  flex: 1;
  padding-left: 5px;
`;

export const PermissionTitleContainer = styled.View`
  flex-direction: row;
`;
// Permission title
export const PermissionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
  margin-left: 5px;
`;

// Permission description
export const PermissionDescription = styled.Text`
  font-size: 14px;
  color: #888;
`;

// Continue button
export const ContinueButton = styled.TouchableOpacity`
  background-color: #6c5ce7;
  padding: 15px;
  border-radius: 30px;
  align-items: center;
  margin-top: 30px;
`;

export const ContinueButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 20,
  },
});
