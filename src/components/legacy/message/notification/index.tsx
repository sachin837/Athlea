import React from 'react';
import {
  BotContainer,
  BotText,
  Container,
  Dot,
  MessageIcon,
  MessageText,
  TimeText,
  HighlightedMessageText,
  MessageContainer, // Add this styled component for highlighted text
} from './notification.style.tsx';
import {useTheme} from 'styled-components/native';
import {Text} from 'react-native';

interface NotificationProps {
  BotTextContent: string;
  TimeTextContent: string;
  MessageTextContent: string;
  HighlightedContent: string; // Add a prop for the highlighted content
}

const NotificationComp: React.FunctionComponent<NotificationProps> = ({
  BotTextContent,
  TimeTextContent,
  MessageTextContent,
  HighlightedContent,
}) => {
  const theme = useTheme();

  // Function to render text with highlighted parts
  const renderHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        // If the part matches the highlight, render it with HighlightedMessageText styling
        <HighlightedMessageText key={index} theme={theme}>
          {part}
        </HighlightedMessageText>
      ) : (
        // Otherwise, render it as normal text
        part // Just return the string part which will be rendered within the parent Text component
      ),
    );
  };

  return (
    <Container>
      <BotContainer theme={theme}>
        <MessageIcon theme={theme} name="athleaiconsvg" size={1.7} />
        <BotText theme={theme}>{BotTextContent}</BotText>
        <Dot theme={theme} />
        <TimeText theme={theme}>{TimeTextContent}</TimeText>
      </BotContainer>
      <MessageContainer>
        <MessageText>
          {renderHighlightedText(MessageTextContent, HighlightedContent)}
        </MessageText>
      </MessageContainer>
    </Container>
  );
};

export default NotificationComp;
