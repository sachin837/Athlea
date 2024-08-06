import React from 'react'
import {Image} from 'react-native'
import {Container, StyledContainer, StyledTitle} from './SplashView.style'


const SplashView = () => {
  return (
    <StyledContainer>
      <Container>
        <Image
          source={require('../../assets/images/icons8-dot3.png')}
          style={{width: 40, height: 40, marginTop: 5, marginRight: 3}}
        />
        <StyledTitle>Athlea</StyledTitle>
      </Container>
    </StyledContainer>
  )
}

export default SplashView
