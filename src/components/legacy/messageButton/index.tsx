import React from 'react';
import {
  MessageContainer,
  Icon,
  NotificationCircle,
  NotificationText,
} from './messageButton.style.tsx';
import {useModal} from '../../../contexts/ModalContext.tsx';
import {useTheme} from 'styled-components/native';

const MessageButton = ({id, onPress, isActive, notificationCount = 1}) => {
  const {showModal, isVisible} = useModal();
  const theme = useTheme();

  const handlePress = () => {
    onPress && onPress(id);
    showModal(id);
  };

  return (
    <MessageContainer onPress={handlePress}>
      <Icon
        name="athleaiconsvg"
        size={2.25}
        color={isActive || isVisible ? theme.secondary : undefined}
      />
      {notificationCount > 0 && (
        <NotificationCircle>
          <NotificationText>{notificationCount}</NotificationText>
        </NotificationCircle>
      )}
    </MessageContainer>
  );
};

export default MessageButton;
