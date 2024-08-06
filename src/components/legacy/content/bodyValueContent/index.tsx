import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components/native';
import BodySection from './components/BodySection.tsx';
import {bodyMap} from '../../../screens/TrainingPlan/TrainingPlan.tsx';
import {
  GraphContainer,
  MetricContainer,
  MetricContainer1,
  MetricContainer2,
  MetricHeader,
  MetricLabel,
  MetricValue,
  MetricValueContainer,
} from '../../panels/statsPanel/statsPanel.style.tsx';
import HalfRectangleLineGraph from '../../graphs/halfRectangeLineGraph';
import HalfActivityAmountGraph from '../../graphs/halfActivityAmountGraph';
import HalfActivityTimeGraph from '../../graphs/halfActivityTimeGraph';
import HalfLoadGraph from '../../graphs/halfGraph/halfLoadGraph.tsx';
import ResponseBarGraph from '../../graphs/graphPlusHeader/components/ResponseBarGraph.tsx';

const BodyValueContent = ({
  selectedBodyPartImage,
  selectedActivityText,
  data,
}) => {
  const theme = useTheme();

  // Initial state for the body part image
  const [bodyPartSelection, setBodyPartSelection] = useState({
    current: null,
    image: selectedBodyPartImage,
  });

  const handleBodyPartSelect = bodyPart => {
    // Check if the currently selected body part is being selected again
    if (bodyPartSelection.current === bodyPart) {
      // Reset to initial state if the same part is selected again
      setBodyPartSelection({current: null, image: selectedBodyPartImage});
    } else {
      // Update to new selection using the bodyMap for the image source
      const newImage = bodyMap[bodyPart];
      setBodyPartSelection({current: bodyPart, image: newImage});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.activityTextContainer}>
        <Text style={[styles.activityText, {color: theme.primaryscale[8]}]}>
          {selectedActivityText}
        </Text>
      </View>
      <Image
        source={bodyPartSelection.image}
        style={styles.image}
        resizeMode="contain"
      />
      <BodySection
        bodyPartText="Full Body"
        percentageText="+0.2%"
        positionLeft={40}
        positionTop={450}
        onPress={() => handleBodyPartSelect('FullBody')}
      />
      <BodySection
        bodyPartText="Arms"
        percentageText="+0.1%"
        positionLeft={20}
        positionTop={200}
        onPress={() => handleBodyPartSelect('Arms')}
      />
      <BodySection
        bodyPartText="Legs"
        percentageText="+0.0%"
        positionLeft={260}
        positionTop={400}
        onPress={() => handleBodyPartSelect('Legs')}
      />
      <BodySection
        bodyPartText="Shoulders"
        percentageText="+0.1%"
        positionLeft={260}
        positionTop={100}
        onPress={() => handleBodyPartSelect('Shoulders')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  activityTextContainer: {
    alignSelf: 'flex-start',
    paddingBottom: 30,
  },
  activityText: {
    fontSize: 18,
    fontWeight: 'bold',
    // color is set dynamically in the component based on `theme`
  },
  graphHeaderText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
  },
  image: {
    width: 400,
    height: 450,
    alignSelf: 'center',
  },
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '84%',
    paddingBottom: 20,
    alignItems: 'flex-end',
  },
  graphSubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export default BodyValueContent;
