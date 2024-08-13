import {View, Text} from 'react-native';
import React from 'react';
import {
  Container,
  Icon,
  PanelLabelContainer,
  PanelLabelText,
} from './dataPanel.style.tsx';
import {SummaryTextBase} from '../../text/summaryText/summaryText.style.tsx';
import {useTheme} from 'styled-components';

const DataPanel = ({
  data,
  onPress,
  dataContent,
  iconName,
}: {
  dataContent: string;
  data: string;
  onPress?: () => void;
  iconName: string;
}) => {
  const theme = useTheme();
  return (
    <Container onPress={onPress}>
      <SummaryTextBase
        fontWeight={theme.font.weight.regular}
        numberOfLines={4}
        paddingBottom={5}
        fontSize={theme.font.size[3]}
        color={theme.primary}>
        {dataContent}
      </SummaryTextBase>
      <PanelLabelContainer>
        <Icon name={iconName} size={14} />
        <PanelLabelText>{data}</PanelLabelText>
      </PanelLabelContainer>
    </Container>
  );
};

export default DataPanel;
