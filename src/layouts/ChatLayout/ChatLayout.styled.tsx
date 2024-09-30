import styled from 'styled-components/native'
import {StyleSheet} from 'react-native'
import {Colors} from '../../theme'


export const MainContainer = styled.View`
  flex: 1;
  background: white;
`
export const MessageContainer = styled.View<{ marginBottom: number }>`
  margin-bottom: ${(props) => props.marginBottom}px;
`
export const SendContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
export const TypingContainer = styled.View`
margin-bottom:30px;
margin-left:10px;
`
export const ComposerContainer = styled.View`
flex-direction: column;
flex: 1;
justify-content: center;
margin-top:8px;
`;

export const AttachmentContainer = styled.View`
flex-direction: row;
align-items: center;
background-color: #f1f1f1;
padding: 5px;
border-radius: 10px;
margin: 5px;
`;

export const AttachmentTextContainer = styled.View`
flex: 1;
flex-direction: row;
justify-content: space-between;
margin-left: 10px;
`;

export const AttachmentName = styled.Text`
font-size: 14px;
color:black;
`;

export const RemoveButton = styled.TouchableOpacity`
margin-left: 10px;
`;

export const styles = StyleSheet.create({
  inputToolbar: {
    borderTopColor: undefined,
    borderTopWidth: undefined,
    borderColor: Colors.purple,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom:8,
    // backgroundColor:'red',
  },
  send: {
    backgroundColor: Colors.purple,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  microphoneBtn: {
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  messagesContainer: {
    paddingHorizontal: 1,
    paddingTop: 2,
    gap: 8,
  },
  attachmentIcon: {
    width: 30,
    height: 30,
    tintColor: Colors.black2,
  },
  fileImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  
})
