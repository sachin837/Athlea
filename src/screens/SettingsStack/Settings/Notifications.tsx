import React, { useState } from 'react'
import {
  Description,
  DetailsSection,
  HeaderButton,
  MainToggle,
  Section,
  SheetContainer,
  SheetHeader,
  ToggleItem,
} from './Settings.style'
import { Text } from 'components'
import {Colors} from 'theme'
import { Switch } from 'react-native'

export const Notifications = ({onClose}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [generalNotifications, setGeneralNotifications] = useState({
    n1: true,
    n2: false,
    n3: false,
    n4: false,
  });
  const [workoutsNotifications, setWorkoutsNotifications] = useState({
    n1: true,
    n2: false,
    n3: true,
    n4: false,
  });
  const [feedNotifications, setFeedNotifications] = useState({
    n1: true,
    n2: false,
    n3: true,
  });
  return (
    <SheetContainer>
      <SheetHeader>
        <HeaderButton onPress={onClose}>
          <Text color={Colors.black3}>Cancel</Text>
        </HeaderButton>
        <Text color={Colors.black1} size={16} weight="500" centered>
        Notifications
        </Text>
        <HeaderButton>
          <Text color={Colors.black3}>Save</Text>
        </HeaderButton>
      </SheetHeader>
      <DetailsSection>
        <MainToggle>
          <Text color={Colors.blackNew2} size={16} weight="400">
            Notifications
          </Text>
          <Switch
            trackColor={{false: Colors.black4, true: Colors.green}}
            thumbColor={Colors.white}
            ios_backgroundColor={notificationsEnabled ? Colors.green : Colors.black4}
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </MainToggle>
        <Description>
          Description orem ipsum dolor sit amet consectetur. Quis nisi elit
          volutpat sed aliquam ut massa ut
        </Description>

        <Section>
          <Text color={Colors.black1} size={16} weight="700">General</Text>
          {Object.entries(generalNotifications).map(([key, value], index) => (
            <ToggleItem key={index}>
              <Text color={Colors.blackNew2} size={16} weight="400">Notification {index + 1}</Text>
              <Switch
                trackColor={{false: Colors.black4, true: Colors.green}}
                thumbColor={Colors.white}
                ios_backgroundColor={value ? Colors.green : Colors.black4}
                value={value}
                onValueChange={(val) =>
                  setGeneralNotifications((prevState) => ({
                    ...prevState,
                    [key]: val,
                  }))
                }
              />
            </ToggleItem>
          ))}
        </Section>

        <Section>
          <Text color={Colors.black1} size={16} weight="700">Workouts</Text>
          {Object.entries(workoutsNotifications).map(([key, value], index) => (
            <ToggleItem key={index}>
              <Text color={Colors.blackNew2} size={16} weight="400">Notification {index + 1}</Text>
              <Switch
                trackColor={{false: Colors.black4, true: Colors.green}}
                thumbColor={Colors.white}
                ios_backgroundColor={value ? Colors.green : Colors.black4}
                value={value}
                onValueChange={(val) =>
                  setWorkoutsNotifications((prevState) => ({
                    ...prevState,
                    [key]: val,
                  }))
                }
              />
            </ToggleItem>
          ))}
        </Section>

        <Section>
          <Text color={Colors.black1} size={16} weight="700">Feed</Text>
          {Object.entries(feedNotifications).map(([key, value], index) => (
            <ToggleItem key={index}>
              <Text color={Colors.blackNew2} size={16} weight="400">Notification {index + 1}</Text>
              <Switch
                trackColor={{false: Colors.black4, true: Colors.green}}
                thumbColor={Colors.white}
                ios_backgroundColor={value ? Colors.green : Colors.black4}
                value={value}
                onValueChange={(val) =>
                  setFeedNotifications((prevState) => ({
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
