import React from 'react';
import {Dimensions} from 'react-native';
import {Svg, Circle, G} from 'react-native-svg';
import {useTheme} from 'styled-components/native';
interface DataItem {
  date: string;
  value: number; // Updated from load to value
}

interface CircleData {
  x: number;
  y: number;
  value: number; // Updated from load to value
  isMostRecent: boolean;
}

interface HalfDotGraphProps {
  data: DataItem[];
  timeframe: 'H' | 'D' | 'W' | 'M';
}

const getGroupKey = (
  date: string,
  timeframe: 'H' | 'D' | 'W' | 'M',
): string => {
  const d = new Date(date);
  switch (timeframe) {
    case 'H':
      return `${d.getFullYear()}-${
        d.getMonth() + 1
      }-${d.getDate()}-${d.getHours()}`;
    case 'D':
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    case 'W':
      const firstDayOfWeek = new Date(
        d.setDate(d.getDate() - d.getDay()),
      ).toDateString();
      return firstDayOfWeek;
    case 'M':
      return `${d.getFullYear()}-${d.getMonth() + 1}`;
    default:
      return date; // By default, do not group, use full date
  }
};

const getXPosition = (
  index: number,
  groupsLength: number,
  padding: number,
  width: number,
): number => {
  // Map the index of the group to a position that fits within the width of the SVG
  return padding + (index / (groupsLength - 1)) * (width - padding * 2);
};

const HalfDotGraph: React.FC<HalfDotGraphProps> = ({data, timeframe = 'H'}) => {
  const width = Dimensions.get('window').width / 3;
  const height = 60;
  const padding = 26;
  const circleRadius = 2.5;
  const verticalPadding = 10 + circleRadius;

  const theme = useTheme();
  // Sort data by date
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  const mostRecentDate = sortedData[sortedData.length - 1].date;

  const minValue = Math.min(...sortedData.map(d => d.value));
  const maxValue = Math.max(...sortedData.map(d => d.value));

  const dataGrouped = sortedData.reduce((acc, item) => {
    const key = getGroupKey(item.date, timeframe);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const groupKeys = Object.keys(dataGrouped);
  const groupCount = groupKeys.length;

  const circles: CircleData[] = groupKeys.flatMap((key, groupIndex) => {
    const groupData = dataGrouped[key];
    const x = getXPosition(groupIndex, groupCount, padding, width);
    return groupData.map(item => {
      const y =
        verticalPadding +
        (1 - (item.value - minValue) / (maxValue - minValue)) *
          (height - verticalPadding * 2);
      return {
        x,
        y,
        value: item.value,
        isMostRecent: item.date === mostRecentDate,
      };
    });
  });

  return (
    <Svg height={height} width={width}>
      <G>
        {circles.map((circle, index) => (
          <Circle
            key={index}
            cx={circle.x}
            cy={circle.y}
            r={circleRadius}
            fill={circle.isMostRecent ? theme.secondary : theme.primaryscale[4]}
          />
        ))}
      </G>
    </Svg>
  );
};

export default HalfDotGraph;
