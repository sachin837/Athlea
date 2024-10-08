import React, {useState} from 'react';
import {
  Container,
  ContinueButton,
  ContinueButtonText,
  Description,
  MainContainer,
  PermissionDescription,
  PermissionItem,
  PermissionTextContainer,
  PermissionTitle,
  PermissionTitleContainer,
  Title,
} from './BasePermissions.style';
import {Switch} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {BackHeader} from '../Header';
import {Colors} from 'theme';

const BasePermissions = (props: any) => {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [healthEnabled, setHealthEnabled] = useState(false);
  return (
    <Container>
      <BackHeader onBack={props.onClose} />
      <MainContainer>
        <Title>Get Started</Title>
        <Description>
          Before starting, you must grant Athlea permissions to access your
          location and activity data.
        </Description>
        <PermissionItem>
          <PermissionTextContainer>
            <PermissionTitleContainer>
              <Icon name="location-outline" size={20} color="#ffa500" />
              <PermissionTitle>Location</PermissionTitle>
            </PermissionTitleContainer>
            <PermissionDescription>
              Description orem ipsum dolor sit amet consectetur.
            </PermissionDescription>
          </PermissionTextContainer>
          <Switch
            trackColor={{false: Colors.black4, true: Colors.green}}
            thumbColor={Colors.white}
            ios_backgroundColor={locationEnabled ? Colors.green : Colors.black4}
            value={locationEnabled}
            onValueChange={setLocationEnabled}
          />
        </PermissionItem>
        <PermissionItem>
          <PermissionTextContainer>
            <PermissionTitleContainer>
              <Icon name="person-outline" size={20} color="#1e90ff" />
              <PermissionTitle>Motion & Fitness</PermissionTitle>
            </PermissionTitleContainer>
            <PermissionDescription>
              Description orem ipsum dolor sit amet consectetur.
            </PermissionDescription>
          </PermissionTextContainer>
          <Switch
            trackColor={{false: Colors.black4, true: Colors.green}}
            thumbColor={Colors.white}
            ios_backgroundColor={motionEnabled ? Colors.green : Colors.black4}
            value={motionEnabled}
            onValueChange={setMotionEnabled}
          />
        </PermissionItem>
        <PermissionItem>
          <PermissionTextContainer>
            <PermissionTitleContainer>
              <Icon name="heart-outline" size={20} color="#ff4d4f" />
              <PermissionTitle>Apple Health</PermissionTitle>
            </PermissionTitleContainer>
            <PermissionDescription>
              Description orem ipsum dolor sit amet consectetur.
            </PermissionDescription>
          </PermissionTextContainer>
          <Switch
            trackColor={{false: Colors.black4, true: Colors.green}}
            thumbColor={Colors.white}
            ios_backgroundColor={healthEnabled ? Colors.green : Colors.black4}
            value={healthEnabled}
            onValueChange={setHealthEnabled}
          />
        </PermissionItem>
        <ContinueButton onPress={props.onClose}>
          <ContinueButtonText>Continue</ContinueButtonText>
        </ContinueButton>
      </MainContainer>
    </Container>
  );
};

export default BasePermissions;
