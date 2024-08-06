import React from 'react';
import {View} from 'react-native';
import {TagContainer, TagIcon, TagRowContainer, TagText} from './tag.style.tsx';

interface TagRowProps {
  Tag1?: boolean;
  Tag2?: boolean;
  Tag3?: boolean;
  SourceNum?: number;
  ViewAmount?: number;
}

const TagRow = ({
  Tag1,
  Tag2,
  Tag3,
  SourceNum,
  ViewAmount,
  Tag1Text = 'Recommended',
  Tag1Icon = 'ai',
  Tag2Icon = 'sources',
  Tag3Icon = 'people',
  Tag1TextColor,
  SourceNumColor,
}: TagRowProps) => {
  return (
    <TagRowContainer>
      {Tag1 && (
        <TagContainer>
          <TagIcon color={Tag1TextColor} size={18} name={Tag1Icon} />
          <TagText color={Tag1TextColor}>{Tag1Text}</TagText>
        </TagContainer>
      )}
      {Tag2 && (
        <TagContainer>
          <TagIcon color={SourceNumColor} size={18} name={Tag2Icon} />
          <TagText color={SourceNumColor}>{SourceNum} sources</TagText>
        </TagContainer>
      )}
      {Tag3 && (
        <TagContainer>
          <TagIcon size={14} name={Tag3Icon} />
          <TagText>{ViewAmount}</TagText>
        </TagContainer>
      )}
    </TagRowContainer>
  );
};

export default TagRow;
