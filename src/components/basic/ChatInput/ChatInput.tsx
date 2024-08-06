import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from '../../../components';
import {
  ChatBoxContainer,
  ChatBoxMessageContainer,
  ChatBoxMessageContent,
  ChatBoxMessageTextContainer,
  ChatBoxInputContainer
} from './ChatInput.style';
import Logo from "../../../assets/images/Logo.svg";
import Microphone from "../../../assets/images/microphone.svg";

const ChatInput = (props: any) => {
  return (
    <ChatBoxContainer>
      <ChatBoxMessageContainer>
        <Logo width={35} height={35} style={{ marginRight: 12 }} />
        <ChatBoxMessageContent>
          <ChatBoxMessageTextContainer>
            <Text type={'heading3'} themeColor={'subtitle'} size={15} weight='bold'>Athlea</Text>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
              <Text type={'small'} themeColor={'subtitle'}>
                Welcome to your personal trainer app! ...
                <Text type={'small'}> See more</Text>
              </Text>
            </View>
          </ChatBoxMessageTextContainer>
        </ChatBoxMessageContent>
      </ChatBoxMessageContainer>
      <ChatBoxInputContainer>
        <TextInput
          style={{ flex: 1, height: 40, fontSize: 16 }}
          placeholder="Ask Athlea ..."
        />
        <TouchableOpacity>
          <Microphone height={20} width={24} />
        </TouchableOpacity>
      </ChatBoxInputContainer>
    </ChatBoxContainer>
  );
};

export default ChatInput;
