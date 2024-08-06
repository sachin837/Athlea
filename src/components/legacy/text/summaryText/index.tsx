import React from 'react';
import {SummaryTextBase} from './summaryText.style.tsx';

export const SummaryText = ({
  children,
  numberOfLines = 2,
  fontSize,
  fontWeight,
  padding,
  paddingBottom,
}: {
  children: string;
  numberOfLines?: number;
  fontSize?: string;
  fontWeight?: string;
  padding?: number;
  paddingBottom?: number;
}) => (
  <SummaryTextBase
    fontSize={fontSize}
    fontWeight={fontWeight}
    numberOfLines={numberOfLines}
    ellipsizeMode="tail"
    padding={padding}
    paddingBottom={paddingBottom}>
    {children}
  </SummaryTextBase>
);
