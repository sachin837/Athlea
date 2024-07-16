import React from 'react';
import {View} from 'react-native';
import {TagBackgroundContainer, TagRowContainer, TagText} from '../tag.style.tsx';

interface TagRowProps {
  Tag1?: boolean;
  Tag2?: boolean;
  Tag3?: boolean;
  SourceNum?: number;
  ViewAmount?: number;
}

const SocialTagRow = ({Tag1, Tag2, Tag3}: TagRowProps) => {
  return (
    <TagRowContainer>
      {Tag1 && (
        <TagBackgroundContainer>
          <TagText color="white">Athlete</TagText>
        </TagBackgroundContainer>
      )}
      {Tag2 && (
        <TagBackgroundContainer>
          <TagText color="white">Coach</TagText>
        </TagBackgroundContainer>
      )}
      {Tag3 && (
        <TagBackgroundContainer>
          <TagText color="white">Expert</TagText>
        </TagBackgroundContainer>
      )}
    </TagRowContainer>
  );
};

export default SocialTagRow;
