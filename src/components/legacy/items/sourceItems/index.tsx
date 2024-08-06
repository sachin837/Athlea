import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import useBottomSheet from '../../../../hooks/useBottomSheet.tsx';
import {
  ContentText,
  Icon,
  ItemContainer,
  ItemSeperator,
  SourceTitleText,
  SourceUrlContainer,
  SourceUrlText,
} from '../item.style.tsx';

const SourceItem = ({
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
  const {closeBottomSheet} = useBottomSheet();
  return (
    <View>
      <ItemContainer>
        <SourceUrlContainer>
          <Icon name={iconName} size={14} paddingRight={5} />
          <SourceUrlText>{sourceUrl}</SourceUrlText>
        </SourceUrlContainer>
        <SourceTitleText>{source}</SourceTitleText>
        <ContentText>{sourcecontent}</ContentText>
      </ItemContainer>
      <ItemSeperator />
    </View>
  );
};

export default SourceItem;
