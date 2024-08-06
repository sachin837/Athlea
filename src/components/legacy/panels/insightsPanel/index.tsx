import React from 'react';
import {Text} from 'react-native';
import {
  ActivityLoadContainer,
  Container,
  DescriptorContainer,
  DescriptorText,
  HeaderContainer,
  HeaderTitle,
  SubHeader,
  SubHeaderContainer,
} from './insights.style.tsx';
import {useTheme} from 'styled-components/native';
import useAnimateText from '../../../../utils/animateText.tsx';
import DescriptionComp from '../../message/description';
import {Icon} from '../sourcePanel/sourcePanel.style.tsx';
import {View} from 'react-native';

const InsightsPanel = ({openBottomSheet, content}) => {
  const theme = useTheme();

  if (!content) {
    return (
      <View>
        <Text>No data available for the selected date.</Text>
      </View>
    );
  }

  return (
    <Container onPress={() => openBottomSheet()}>
      <ActivityLoadContainer>
        <HeaderContainer>
          <HeaderTitle>Daily Insights</HeaderTitle>
          <SubHeaderContainer>
            <Icon name="athleaiconsvg" size={14} color={theme.primary} />
            <SubHeader>Athlea</SubHeader>
          </SubHeaderContainer>
        </HeaderContainer>
      </ActivityLoadContainer>
      <DescriptorContainer>
        <DescriptionComp MessageContent={content.MessageContent} speed={20} />
      </DescriptorContainer>
    </Container>
  );
};

export default InsightsPanel;
