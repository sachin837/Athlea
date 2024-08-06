import {View, Text} from 'react-native'
import React from 'react'
import {CenterIcon, CenterText, Container} from './centerField.style'

const CenterFieldComp = ({CenterFieldText}) => {
  return (
    <Container>
      <CenterText>{CenterFieldText}</CenterText>
      <CenterIcon name="right-open-mini" size={3} color="black" />
    </Container>
  )
}

export default CenterFieldComp
