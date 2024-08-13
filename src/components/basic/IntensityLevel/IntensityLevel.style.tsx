import styled, { css } from 'styled-components/native'
import { StyleSheet } from 'react-native'

export const Container = styled.View`
`;

export const Label = styled.Text`
  font-size: 12px;
  color: #94A3B8;
  margin-bottom: 4px;
`;

export const BarsContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;


export const styles = StyleSheet.create({
  bar: {
    width: 4,
    marginHorizontal: 1,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
})
