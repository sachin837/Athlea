import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {
  Descriptor,
  GraphBox,
  GraphContainer,
  HeaderContainer,
  LastUpdated,
  LastUpdatedContainer,
  LastUpdatedIcon,
  MetricContainer,
  MetricContainer1,
  MetricHeader,
  MetricLabel,
  MetricValue,
  MetricValueContainer,
  StatsIcon,
} from '../favorite.style.ts';
import {GraphType} from '../../../../store/favorites';
import {formatLastUpdated} from '../../../../utils/formatDate.tsx';
import HalfGraph from '../../graphs/halfGraph';
import * as d3 from 'd3';
import LineGraph from '../../graphs/halfLineGraph';
import {Dot} from '../../message/notification/notification.style.tsx';
import DotGraph from '../../graphs/dotGraph';
import HalfDotGraph from '../../graphs/dotGraph/halfDotGraph';
import SleepGraph from '../../graphs/sleepGraph';
import {useTheme} from 'styled-components/native';

interface FavoriteCardProps {
  category: string;
  metricHeaderText: string;
  metricValue: string;
  metricLabel: string;
  lastUpdated: number | null;
  data: any; // It's best to specify a more precise type than 'any' if possible
  // onMessageButtonPress: () => void;
  // showMessage: boolean;
  // showAppleWatch?: boolean;
  // showGarmin?: boolean;
  graphType: GraphType;
}

const iconAttributesByCategory = {
  Heart: {
    iconName: 'heart',
    iconColor: '#FF0000', // red color
    iconSize: 1.75,
  },
  Fitness: {
    iconName: '#4BE6B2',
    iconColor: '#0000FF', // blue color
    iconSize: 1.75,
  },
  Activity: {
    iconName: 'stats',
    iconColor: '#6580F4', // green color
    iconSize: 1.75,
  },
  Recovery: {
    iconName: 'hotel',
    iconColor: '#000080', // navy color
    iconSize: 1.75,
  },
  // Add more categories and their corresponding icon attributes here
};

const formatHoursToHoursMinutes = hours => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return {h, m}; // returning an object with hours and minutes
};

// Helper function to get icon attributes by category
function getIconAttributes(category) {
  return (
    iconAttributesByCategory[category] || {
      iconName: 'help_outline', // default icon if category is not found
      iconColor: '#808080', // default color if category is not found (grey)
      iconSize: 1.75,
    }
  );
}

const FavoriteCard = ({
  metricHeaderText,
  metricValue,
  metricLabel,
  data,
  category,
  lastUpdated,
  onMessageButtonPress,
  showMessage,
  showAppleWatch,
  showGarmin,
  graphType,
  descriptor,
}: FavoriteCardProps) => {
  const theme = useTheme();
  const renderGraph = (graphType: GraphType) => {
    let noDataMessage = 'No data available'; // Default message

    // Early return if data is null or undefined to avoid runtime errors
    if (!data) {
      return <Text>{noDataMessage}</Text>;
    }

    const fullDay = data.fullDay;

    const weeklyTrendData = data.weeklyTrend;

    const safeAccess = (nestedData, defaultValue) => {
      return nestedData || defaultValue;
    };

    // Example usage of safeAccess for sleep data
    const sleepEvents = safeAccess(data?.yesterday?.sleepEvents, []);

    if (!data) {
      return <Text>{noDataMessage}</Text>;
    }

    const dates = Array.from({length: 7})
      .map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d3.timeFormat('%Y-%m-%d')(d);
      })
      .reverse();

    switch (graphType) {
      case 'RectangleLine':
        if (!data || !data.fullDay || data.fullDay.length === 0) {
          noDataMessage = 'No daily heart rate data available';
          return <Text>{noDataMessage}</Text>; // Specific fallback UI for fullDay data
        }
        return <HalfDotGraph data={fullDay} />;
      case 'LineGraph':
        const formattedLineData = dates.map((date, index) => ({
          date: date,
          load: weeklyTrendData[index] || 0,
        }));
        return <LineGraph data={formattedLineData} />;
      case 'BarGraph':
        // Combine dates with weeklyTrendData into the expected format
        const formattedBarData = dates.map((date, index) => ({
          date: date,
          load: weeklyTrendData[index] || 0, // Fallback to 0 if no data for a date
        }));

        // Now pass this formattedData to HalfGraph
        return <HalfGraph data={formattedBarData} />;
      case 'SleepGraph':
        if (sleepEvents.length === 0) {
          return <Text>No sleep data available</Text>;
        }
        // Assume SleepGraph is a component that takes sleepEvents as a prop
        return <SleepGraph data={sleepEvents} />;
      default:
        return null;
    }
  };

  console.log('metric value', metricValue);

  const {iconName, iconColor, iconSize} = getIconAttributes(category);

  const formattedLastUpdated = lastUpdated
    ? formatLastUpdated(lastUpdated)
    : 'Unknown';

  // Assuming metricValue is a string representing hours like "0.0667"
  const sleepTime = formatHoursToHoursMinutes(parseFloat(metricValue));

  return (
    <View>
      <MetricContainer1>
        <MetricContainer>
          <HeaderContainer>
            <StatsIcon color={iconColor} name={iconName} size={iconSize} />
            <MetricHeader color={iconColor}>{metricHeaderText}</MetricHeader>
          </HeaderContainer>
          <Descriptor>{descriptor}</Descriptor>
          <MetricValueContainer>
            {metricHeaderText === 'Sleep Analysis' ? (
              <>
                <MetricValue>{sleepTime.h}</MetricValue>
                <MetricLabel>hr</MetricLabel>
                <MetricValue>{sleepTime.m}</MetricValue>
                <MetricLabel>min</MetricLabel>
              </>
            ) : (
              <>
                <MetricValue>{metricValue}</MetricValue>
                <MetricLabel>{metricLabel}</MetricLabel>
              </>
            )}
          </MetricValueContainer>
          {/* Additional views or components */}
        </MetricContainer>
        <GraphBox>
          <LastUpdatedContainer>
            <LastUpdated>{formattedLastUpdated}</LastUpdated>
            <LastUpdatedIcon
              name="right-open-mini"
              size={3}
              color={theme.primaryscale[8]}
            />
          </LastUpdatedContainer>
          <GraphContainer>{renderGraph(graphType)}</GraphContainer>
        </GraphBox>
      </MetricContainer1>
    </View>
  );
};

export default FavoriteCard;
