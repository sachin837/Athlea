import React from 'react'
import {Image} from 'react-native'
import {Container, DotsContainer, LogoContainer, LogoText } from './SplashView.style'
import { Images } from '../../assets/images'
import TypingIndicator from 'components/basic/TypingIndicator'
import { Colors } from 'theme'


const SplashView = () => {
  return (
    <Container>
      <LogoContainer>
        <Image
          source={Images.AthleaLogo}
          resizeMode="contain"
          style={{ width: 250, height: 60 }}
        />
      </LogoContainer>

      {/* Dots Indicator */}
      <DotsContainer>
        <TypingIndicator backgroundColor={Colors.purple} />
      </DotsContainer>
    </Container>
  )
}

export default SplashView
