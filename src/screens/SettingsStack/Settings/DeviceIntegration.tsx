import React, { useState } from 'react'
import {
  DetailsSection,
  HeaderButton,
  IconWrapper,
  Section,
  SheetContainer,
  SheetHeader,
  ToggleItem,
} from './Settings.style'
import { Text } from 'components'
import {Colors} from 'theme'
import { Switch } from 'react-native'
import { Icons } from 'assets/icons'

export const DeviceIntegration = ({onClose}) => {
  const [platforms, setPlatforms] = useState({
    apple: true,
    garmin: false,
    fitbit: false,
    whoop: false,
  });
  
  return (
    <SheetContainer>
      <SheetHeader>
        <HeaderButton onPress={onClose}>
          <Text color={Colors.black3}>Cancel</Text>
        </HeaderButton>
        <Text color={Colors.black1} size={16} weight="500" centered>
        Device integration
        </Text>
        <HeaderButton>
          <Text color={Colors.black3}>Save</Text>
        </HeaderButton>
      </SheetHeader>
      <DetailsSection>
        <Section>
          {Object.entries(platforms).map(([key, value], index) => (
            <ToggleItem key={index}>
              <IconWrapper style={{gap:10}}>
                <Icons name={key} size={20} />
                <Text color={Colors.blackNew2} size={16} style={{textTransform: 'capitalize'}} weight="400">{key}</Text>
              </IconWrapper>
              <Switch
                trackColor={{false: Colors.black4, true: Colors.green}}
                thumbColor={Colors.white}
                ios_backgroundColor={value ? Colors.green : Colors.black4}
                value={value}
                onValueChange={(val) =>
                  setPlatforms((prevState) => ({
                    ...prevState,
                    [key]: val,
                  }))
                }
              />
            </ToggleItem>
          ))}
        </Section>
      </DetailsSection>
    </SheetContainer>
  )
};
