import {View, Text} from 'react-native';
import React from 'react';
import SourceItem from '../../items/sourceItems';
import {
  Icon,
  SubheaderText,
  TopBarContainer,
} from '../../response/response.style.tsx';
import {HeaderContainer, Seperator} from './sourceList.style.tsx';
import DataItem from '../../items/dataItems';

const SourceList = ({title, icon, selectedThread, contentType}) => {
  return (
    <View>
      <HeaderContainer>
        <Icon name={icon} size={20} />
        <SubheaderText>{title}</SubheaderText>
      </HeaderContainer>
      <Seperator />
      <View>
        {contentType === 'sources' && selectedThread.sources.length > 0 ? (
          selectedThread.sources.map((source, index) => (
            <SourceItem
              key={index}
              sourcecontent={source.sourcecontent}
              source={source.source}
              sourceUrl={source.sourceUrl}
              iconName={source.iconName}
            />
          ))
        ) : contentType === 'data' && selectedThread.data.length > 0 ? (
          selectedThread.data.map((data, index) => (
            // Render data items here
            <DataItem
              key={index}
              datacontent={data.dataContent}
              data={data.data}
            />
          ))
        ) : (
          <Text>No {contentType}</Text>
        )}
      </View>
    </View>
  );
};

export default SourceList;
