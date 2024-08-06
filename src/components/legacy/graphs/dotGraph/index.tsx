import React from 'react';
import {Svg, Circle, G} from 'react-native-svg';

const getGroupKey = (date, timeframe) => {
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
    // Add other cases for '6M' and 'Y' as needed
    default:
      return date; // By default, do not group, use full date
  }
};

const getXPosition = (index, groupsLength, padding, width) => {
  // Map the index of the group to a position that fits within the width of the SVG
  return padding + (index / (groupsLength - 1)) * (width - padding * 2);
};

const DotGraph = ({data, timeframe = 'H'}) => {
  const width = 349 / 2.5; // Fixed SVG width
  const height = 65; // Height remains the same
  const padding = 10; // Padding for the left and right of the graph

  // First, find the most recent date from all the data
  const mostRecentDate = data.reduce(
    (latest, item) =>
      new Date(item.date) > new Date(latest) ? item.date : latest,
    data[0].date,
  );

  // Calculate minLoad and maxLoad
  const allLoads = data.map(d => d.load);
  const minLoad = Math.min(...allLoads);
  const maxLoad = Math.max(...allLoads);

  // Group the data
  const dataGrouped = data.reduce((acc, {date, load}) => {
    const key = getGroupKey(date, timeframe);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({date, load});
    return acc;
  }, {});

  const groupKeys = Object.keys(dataGrouped);
  const groupCount = groupKeys.length;

  // Calculate the positions of the circles, including the most recent check
  const circles = groupKeys.flatMap((key, groupIndex) => {
    const groupLoads = dataGrouped[key];
    const x = getXPosition(groupIndex, groupCount, padding, width);
    return groupLoads.map(({date, load}) => {
      const y =
        height - ((load - minLoad) / (maxLoad - minLoad)) * (height - padding);
      return {
        x,
        y,
        load,
        isMostRecent: date === mostRecentDate, // Check if this is the most recent
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
            r="4"
            fill={circle.isMostRecent ? 'red' : 'grey'} // Conditional fill based on the most recent check
          />
        ))}
      </G>
    </Svg>
  );
};

export default DotGraph;
