import {View, Text} from 'react-native';
import React from 'react';
import {
  Container,
  Icon,
  PanelLabelContainer,
  PanelLabelText,
} from './sourcePanel.style.tsx';
import {SummaryTextBase} from '../../text/summaryText/summaryText.style.tsx';
import {useTheme} from 'styled-components/native';
import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SourcePanel = ({
  source,
  onPress,
  sourcecontent,
  iconName,
  sourceUrl,
}: {
  sourcecontent: string;
  source: string;
  onPress?: () => void;
  iconName: string;
  sourceUrl: string;
}) => {
  const theme = useTheme();
  const navigation = useNavigation();

  // const handlePress = () => {
  //   Linking.openURL(sourceUrl).catch(err =>
  //     console.error('Failed to open URL:', err),
  //   );
  // };

  const handlePress = () => {
    navigation.navigate('WebViewScreen', {sourceUrl, source});
  };

  return (
    <Container onPress={onPress}>
      <SummaryTextBase
        fontWeight={theme.font.weight.regular}
        numberOfLines={4}
        paddingBottom={5}
        fontSize={theme.font.size[3]}
        color={theme.primary}>
        {sourcecontent}
      </SummaryTextBase>
      <PanelLabelContainer>
        <Icon name={iconName} size={14} />
        <PanelLabelText numberOfLines={1}>{source}</PanelLabelText>
      </PanelLabelContainer>
    </Container>
  );
};

export default SourcePanel;
