import React from 'react'
import {
  AvatarContainer,
  DetailsSection,
  HeaderButton,
  SheetContainer,
  SheetHeader,
  styles,
} from './Settings.style'
import {useTheme} from 'styled-components/native'
import {ProfileImage, Text, TextInput} from 'components'
import {Colors} from 'theme'

export const PersonalDetails = ({onClose}) => {
  const theme = useTheme()
  return (
    <SheetContainer>
      <SheetHeader>
        <HeaderButton onPress={onClose}>
          <Text color={Colors.black3}>Cancel</Text>
        </HeaderButton>
        <Text color={Colors.black1} size={16} weight="500" centered>
            Personal details
        </Text>
        <HeaderButton>
          <Text color={Colors.black3}>Save</Text>
        </HeaderButton>
      </SheetHeader>

      <AvatarContainer style={{marginBottom: 10}}>
        <ProfileImage
          edit
          size={100}
          backgroundColor={'#e1e1e1'}
          source={require('../../../assets/images/people/RandomImage1.png')}
        />
        <Text color={Colors.black3} style={{marginTop: 20}} centered>
            Change photo
        </Text>
      </AvatarContainer>
      <DetailsSection style={{gap: 10}}>
        <TextInput
          label={'Name'}
          placeholder={'Name'}
          placeholderTextColor={theme.placeholder}
          inputStyle={styles.commonInputStyle}
          autoCapitalize="none"
          value="Charlie Cooper"
        />
        <TextInput
          label={'Email'}
          placeholder={'Email'}
          placeholderTextColor={theme.placeholder}
          inputStyle={styles.commonInputStyle}
          autoCapitalize="none"
          value="charlie.cooper@gmail.com"
        />
        <TextInput
          label={'Gender'}
          placeholder={'Gender'}
          placeholderTextColor={theme.placeholder}
          inputStyle={styles.commonInputStyle}
          autoCapitalize="none"
          value="Male"
        />
        <TextInput
          label={'Age'}
          placeholder={'Age'}
          placeholderTextColor={theme.placeholder}
          inputStyle={styles.commonInputStyle}
          autoCapitalize="none"
          value="37 years"
        />
        <TextInput
          label={'Weight'}
          placeholder={'Weight'}
          placeholderTextColor={theme.placeholder}
          inputStyle={styles.commonInputStyle}
          autoCapitalize="none"
          value="75 kg"
        />
        <TextInput
          label={'Height'}
          placeholder={'Height'}
          placeholderTextColor={theme.placeholder}
          inputStyle={styles.commonInputStyle}
          autoCapitalize="none"
          value="178 cm"
        />
      </DetailsSection>
    </SheetContainer>
  )
};
