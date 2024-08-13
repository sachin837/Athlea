import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from 'styled-components/native';
import {
  Container,
  HeaderContainer,
  HeaderTitle,
  SummaryContainer,
  SummaryText,
} from './reportPanel.style.tsx';
import PageButtonRow from '../../pageButtonRow';
import {SummaryTextBase} from '../../text/summaryText/summaryText.style.tsx';
import ResponseBarGraph from '../../graphs/graphPlusHeader/components/ResponseBarGraph.tsx';
import ResponseLineGraph from '../../graphs/graphPlusHeader/components/ResponseLineGraph.tsx';
import ResponseZoneGraph from '../../graphs/graphPlusHeader/components/ResponseZoneGraph.tsx';

const lineTrendData = [
  {date: '2024-02-29', highlight: 'False', load: 45.65},
  {date: '2024-03-01', highlight: 'False', load: 46.03},
  {date: '2024-03-02', highlight: 'False', load: 45.8},
  {date: '2024-03-03', highlight: 'False', load: 58.35},
  {date: '2024-03-04', highlight: 'False', load: 44.05},
  {date: '2024-03-05', highlight: 'False', load: 47.63},
  {date: '2024-03-06', highlight: 'False', load: 50.17},
  {date: '2024-03-07', highlight: 'False', load: 46.33},
  {date: '2024-03-08', highlight: 'False', load: 41.59},
  {date: '2024-03-09', highlight: 'False', load: 56.81},
  {date: '2024-03-10', highlight: 'False', load: 59.37},
  {date: '2024-03-11', highlight: 'False', load: 47.45},
  {date: '2024-03-12', highlight: 'False', load: 44.15},
];

const barTrendData = [
  {date: '2024-02-29', highlight: false, load: 50},
  {date: '2024-03-01', highlight: false, load: 55},
  {date: '2024-03-02', highlight: false, load: 60},
  {date: '2024-03-03', highlight: false, load: 65},
  {date: '2024-03-04', highlight: true, load: 70},
  {date: '2024-03-05', highlight: false, load: 75},
  {date: '2024-03-06', highlight: false, load: 80},
  {date: '2024-03-07', highlight: false, load: 85},
];

const zoneData = [
  {
    zone: 'Zone 5',
    bpmRange: '> 163 BPM',
    time: '00:00',
    percentage: '0%',
    color: '#FF6B6B', // Red indicating very high intensity
  },
  {
    zone: 'Zone 4',
    bpmRange: '146 - 163 BPM',
    time: '00:00',
    percentage: '0%',
    color: '#FFD26B', // Orange indicating high intensity
  },
  {
    zone: 'Zone 3',
    bpmRange: '127 - 145 BPM',
    time: '5:00',
    percentage: '10%',
    color: '#6BFF8F', // Green for moderate intensity
  },
  {
    zone: 'Zone 2',
    bpmRange: '109 - 126 BPM',
    time: '20:00',
    percentage: '80%',
    color: '#6BCBFF', // Blue for light intensity
  },
  {
    zone: 'Zone 1',
    bpmRange: '91 - 108 BPM',
    time: '10:00',
    percentage: '10%',
    color: '#B8B8B8', // Grey for very light intensity
  },
];

const barData = [
  {date: '2024-01-01', highlight: 'False', load: 46.03},
  {date: '2024-01-02', highlight: 'False', load: 45.8},
  {date: '2024-01-03', highlight: 'False', load: 58.35},
  {date: '2024-01-04', highlight: 'False', load: 44.05},
  {date: '2024-01-05', highlight: 'False', load: 47.63},
  {date: '2024-01-06', highlight: 'False', load: 50.17},
  {date: '2024-01-07', highlight: 'False', load: 46.33},
  {date: '2024-01-08', highlight: 'False', load: 41.59},
  {date: '2024-01-09', highlight: 'False', load: 56.81},
  {date: '2024-01-10', highlight: 'False', load: 59.37},
  {date: '2024-01-11', highlight: 'False', load: 47.45},
  {date: '2024-01-12', highlight: 'False', load: 44.15},
  {date: '2024-01-13', highlight: 'False', load: 53.36},
  {date: '2024-01-14', highlight: 'False', load: 41.73},
  {date: '2024-01-15', highlight: 'False', load: 57.2},
  {date: '2024-01-16', highlight: 'False', load: 45.85},
  {date: '2024-01-17', highlight: 'False', load: 47.13},
  {date: '2024-01-18', highlight: 'False', load: 40.01},
  {date: '2024-01-19', highlight: 'False', load: 58.56},
  {date: '2024-01-20', highlight: 'False', load: 44.55},
  {date: '2024-01-21', highlight: 'False', load: 40.02},
  {date: '2024-01-22', highlight: 'False', load: 52.55},
  {date: '2024-01-23', highlight: 'False', load: 53.22},
  {date: '2024-01-24', highlight: 'False', load: 47.03},
  {date: '2024-01-25', highlight: 'False', load: 40.96},
  {date: '2024-01-26', highlight: 'False', load: 55.19},
  {date: '2024-01-27', highlight: 'False', load: 51.73},
  {date: '2024-01-28', highlight: 'False', load: 44.92},
  {date: '2024-01-29', highlight: 'False', load: 45.65},
  {date: '2024-01-30', highlight: 'False', load: 59.74},
  {date: '2024-01-31', highlight: 'False', load: 52.36},
];

const lineData = [
  {date: '2024-02-27', highlight: false, load: 51.32},
  {date: '2024-02-28', highlight: false, load: 47.34},
  {date: '2024-02-29', highlight: false, load: 45.65},
  {date: '2024-03-01', highlight: false, load: 46.03},
  {date: '2024-03-02', highlight: false, load: 45.8},
  {date: '2024-03-03', highlight: false, load: 58.35},
  {date: '2024-03-04', highlight: false, load: 44.05},
  {date: '2024-03-05', highlight: false, load: 47.63},
  {date: '2024-03-06', highlight: false, load: 50.17},
  {date: '2024-03-07', highlight: true, load: 57.98},
];

const ReportPanel = ({PanelHeader, PanelText, graphType}) => {
  const theme = useTheme();
  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>{PanelHeader}</HeaderTitle>
      </HeaderContainer>
      <SummaryContainer>
        <SummaryTextBase fontSize={14} numberOfLines={8}>
          {PanelText}
        </SummaryTextBase>
      </SummaryContainer>
      {graphType === 'bar' ? (
        <ResponseBarGraph data={barData} widthPercentage={0.75} />
      ) : graphType === 'line' ? (
        <ResponseLineGraph data={lineData} widthPercentage={0.75} />
      ) : graphType === 'zones' ? (
        <ResponseZoneGraph data={zoneData} widthPercentage={0.75} />
      ) : graphType === 'bartrend' ? (
        <ResponseBarGraph
          data={barTrendData}
          showTrendLine={true}
          widthPercentage={0.75}
        />
      ) : graphType === 'linetrend' ? (
        <ResponseLineGraph
          data={lineTrendData}
          showTrendLine={true}
          widthPercentage={0.75}
        />
      ) : (
        <Text> Graph type not available </Text>
      )}
    </Container>
  );
};

export default ReportPanel;
