import {View} from 'react-native';
import React from 'react';
import {
  Container,
  HeaderContainer,
  HeaderIcon,
  HeaderText,
  IconContainer,
} from './header.style.tsx';
import {IconButton} from '../iconButton';

interface HeaderProps {
  HeaderTextContent: string;
  onPress: () => void;
}

const HeaderComponent = ({
  HeaderTextContent,
  onPress,
  onAddPress,
  addIcon,
}: HeaderProps) => {
  return (
    <Container>
      <HeaderContainer>
        <HeaderText size={24}>{HeaderTextContent}</HeaderText>
        <IconContainer>
          {addIcon && (
            <View
              style={{
                paddingRight: 10,
              }}>
              <IconButton
                type="add"
                size={14}
                borderColor="black"
                iconSize={12}
                accessibilityLabel="Go back"
                onPress={onAddPress}
              />
            </View>
          )}
          <IconButton
            type="right-open"
            size={14}
            borderColor="black"
            iconSize={7}
            accessibilityLabel="Go back"
            onPress={onPress}
          />
        </IconContainer>
      </HeaderContainer>
    </Container>
  );
};

export default HeaderComponent;
