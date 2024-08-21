import styled from 'styled-components/native'
import {StyleSheet} from 'react-native'
import {Colors} from '../../theme'


export const MainContainer = styled.View`
  flex: 1;
  background: white;
`

export const styles = StyleSheet.create({
  inputToolbar: {
    borderTopColor: undefined,
    borderTopWidth: undefined,
    borderColor: Colors.purple,
    borderWidth: 1,
    marginHorizontal: 11,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom:8
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
})
