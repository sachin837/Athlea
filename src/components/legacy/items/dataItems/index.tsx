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

const DataItem = ({datacontent, data}: {datacontent: string; data: string}) => {
  return (
    <View>
      <ItemContainer>
        <SourceTitleText>{data}</SourceTitleText>
        <ContentText>{datacontent}</ContentText>
      </ItemContainer>
      <ItemSeperator />
    </View>
  );
};

export default DataItem;
