import React, {FunctionComponent, useState} from 'react';
import {useTheme} from 'styled-components/native';
import useDeviceOrientation from '../../../../hooks/useDeviceOrientation.tsx';
import {IconTypes} from '../../../../assets/icons/IconTypes.tsx';
import {IconProp} from '../../iconButton/iconButton.style.tsx';
import {StrictTextInputProps} from '../textProp';
import {
  Container,
  ContentWrapper,
  Icon,
  IconButton,
  IconContainer,
  LeftIcon,
  MicIcon,
  StyledInput,
} from './text.style.tsx';
import {threads} from '../../../../data/threads.ts';
import {useNavigation} from '@react-navigation/native';

interface ModifiedStrictTextInputProps extends StrictTextInputProps {
  leftIconName?: string;
  leftIconType?: IconTypes;
  rightIconName?: string;
  rightIconType?: IconTypes;
  leftIconDisable?: boolean;
  rightIconDisable?: boolean;
  leftIconHandleClick?: () => void;
  rightIconHandleClick?: () => void;
  iconButtonProps?: IconProp;
  leftIconSize?: number;
  rightIconSize?: number;
  notificationsButton?: boolean;
  setNotificationsButton?: (notificationsButton: boolean) => void;
  openBottomSheet?: () => void;
  closeBottomSheet?: () => void;
  left?: number;
  // ... include other necessary props if any
}

const TextInputComp: FunctionComponent<ModifiedStrictTextInputProps> = ({
  placeholder = '',
  handleChange,
  leftIconName,
  rightIconName,
  leftIconDisable,
  rightIconDisable,
  rightIconHandleClick,
  leftIconSize,
  rightIconSize,
  notificationsButton,
  setNotificationsButton,
  openBottomSheet,
  closeBottomSheet,
  left,
  onFocus: propOnFocus,
  onBlur: propOnBlur,
  inputValue,
  handleSubmit,
  onChangeText,
  // ... include other used props if any
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();
  // Console log when the left icon is clicked
  const leftIconHandleClick = () => {
    const shouldOpen = !notificationsButton;
    setNotificationsButton(shouldOpen);
    if (shouldOpen) {
      console.log('Opening bottom sheet');
      openBottomSheet();
    } else {
      console.log('Closing bottom sheet');
      closeBottomSheet();
    }
  };

  const onInputEnter = inputValue => {
    // Mark selection as made

    // Optional: Immediately navigate if the suggestion matches a thread header text
    // This part is up to your app's flow and whether you want to navigate right away
    const selectedThread = threads.find(
      thread =>
        thread.ThreadHeaderText.toLowerCase() === inputValue.toLowerCase(),
    );
    if (selectedThread) {
      navigation.navigate('ResponsePage', {selectedThread});
      inputValue = ''; // Clear input value
    } else {
      console.log('No matching thread found for suggestion:', suggestion);
      // Handle the case where no matching thread is found if needed
    }
  };

  // Log when the component is focused
  const handleFocus = () => {
    console.log('Input is focused');
    setIsFocused(true);
    if (propOnFocus) {
      propOnFocus();
    }
  };

  // Log when the component loses focus
  const handleBlur = () => {
    console.log('Input has lost focus');
    setIsFocused(false);
    if (propOnBlur) {
      propOnBlur();
    }
  };

  return (
    <Container notificationsButton={notificationsButton}>
      <ContentWrapper>
        <IconContainer>
          {!isFocused && leftIconName && (
            <LeftIcon
              theme={theme}
              name={leftIconName}
              onPress={leftIconHandleClick}
              disable={leftIconDisable}
              size={leftIconSize}
              notificationsButton={notificationsButton}
            />
          )}
          {!isFocused && rightIconName && (
            <Icon
              theme={theme}
              name={rightIconName}
              onPress={rightIconHandleClick}
              disable={rightIconDisable}
              size={rightIconSize}
            />
          )}
        </IconContainer>
        <StyledInput
          theme={theme}
          placeholder={placeholder}
          onChangeText={onChangeText} // Use the new handler function
          value={inputValue}
          left={isFocused ? 5 : left}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmit}
        />
        <IconButton>
          {!isFocused ? (
            <MicIcon name="mic-outline" size={20} />
          ) : (
            <MicIcon
              name="right-open-mini"
              size={24}
              onPress={() => {
                handleSubmit(); // Call handleSubmit which now also resets the input
                onInputEnter(inputValue); // If you need to keep this logic, ensure it doesn't conflict with handleSubmit
              }}
            />
          )}
        </IconButton>
      </ContentWrapper>
    </Container>
  );
};

export default TextInputComp;
