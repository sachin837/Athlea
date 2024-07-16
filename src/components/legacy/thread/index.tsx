import React from 'react';
import {View} from 'react-native';
import {
  Container,
  HeaderContainer,
  HeaderText,
  Seperator,
} from './thread.style.tsx';
import {SummaryText} from '../text/summaryText';
import TagRow from '../tags';
import {useTheme} from 'styled-components/native';
import NotificationComp from '../message/notification';
import SuggestionComp from '../message/suggestion';

interface ThreadProps {
  ThreadHeaderText: string;
  ThreadBodyText: string;
  Tag1?: boolean;
  Tag2?: boolean;
  Tag3?: boolean;
  SourceNum?: number;
  ViewAmount?: number;
  notifications?: any;
  onPress?: () => void;
}

const ThreadComponent = ({
  ThreadHeaderText,
  ThreadBodyText,
  Tag1,
  Tag2,
  Tag3,
  Tag1Text = 'Recommended',
  Tag2Text = 'Sources',
  Tag1Icon = 'ai',
  Tag2Icon = 'sources',
  Tag3Icon = 'people',
  SourceNum,
  ViewAmount,
  notifications,
  onPress,
}: ThreadProps) => {
  const theme = useTheme();

  return (
    <Container onPress={onPress}>
      <HeaderText>{ThreadHeaderText}</HeaderText>
      <SummaryText
        fontSize={17}
        fontWeight={theme.font.weight.regular}
        numberOfLines={4}
        padding={5}
        paddingBottom={10}>
        {ThreadBodyText}
      </SummaryText>
      <TagRow
        Tag1={Tag1}
        Tag2={Tag2}
        Tag3={Tag3}
        Tag1Text={Tag1Text}
        Tag1Icon={Tag1Icon}
        Tag2Icon={Tag2Icon}
        Tag3Icon={Tag3Icon}
        SourceNum={SourceNum}
        ViewAmount={ViewAmount}
      />
      {notifications &&
        notifications.map((notification, index) => (
          <SuggestionComp
            key={index}
            BotTextContent={notification.BotTextContent}
            TimeTextContent={notification.TimeTextContent}
            MessageTextContent={notification.MessageTextContent}
            botType={notification.botType}
          />
        ))}
      <Seperator />
    </Container>
  );
};

export default ThreadComponent;
