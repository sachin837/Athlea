import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from '../response/response.style.tsx';
import PhaseGraph from '../graphs/phaseGraph';
import CommentComp from '../message/comment';
import MessageButton from '../messageButton';
import SuggestionComp from '../message/suggestion';

const WorkoutCard = ({
  week,
  workouts,
  phase,
  data,
  id,
  onMessagePress,
  showMessageModal,
  hideModal,
  showSuggestion,
  summary = '',
}) => {
  console.log(id, showSuggestion);

  // State to track the active message button
  // State to track the active message button
  const [activeId, setActiveId] = useState(null);

  // Handler for when a message button is pressed
  const handleButtonPress = () => {
    setActiveId(id); // Set the active button id
    onMessagePress(id); // Call the parent component's onPress function
  };

  // Effect to set activeId to null when hideModal is called
  useEffect(() => {
    if (hideModal) {
      setActiveId(null);
    }
  }, [hideModal]);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          {/* <Icon name="clock" size={14} /> */}
          <Text style={styles.weekText}>{week}</Text>
        </View>
        <View style={styles.graphContainer}>
          <PhaseGraph
            data={data}
            phase={phase}
            svgHeightProp={40}
            svgWidthProp={130}
            roundedX={1.5}
            roundedY={1.5}
          />
        </View>
      </View>
      <View style={styles.separator} />

      {workouts.map((workout, index) => (
        <View key={index} style={styles.workoutContainer}>
          <Text style={styles.dayText}>{workout.day}</Text>
          <Text style={styles.descriptionText}>{workout.description}</Text>
        </View>
      ))}
      {showSuggestion && (
        <SuggestionComp
          BotTextContent="Athlea"
          TimeTextContent="Now"
          MessageTextContent={summary}
          TimeTextColor="black"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 16,
    marginBottom: 16,
  },
  graphContainer: {
    paddingTop: 18,
  },
  weekText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingRight: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  workoutContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    marginTop: 4,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 20,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    width: '80%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
  },
});

export default WorkoutCard;
