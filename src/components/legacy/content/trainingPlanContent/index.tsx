import {View, Text, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import PhaseSelector from '../../selectors/PhaseSelector';
import {
  ActivityLoaderContainer,
  Container,
  DescriptorContainer,
  DescriptorText,
  GraphContainer,
  HeaderContainer,
  SubheaderText,
  ValueDescriptionText,
  ValueText,
} from './trainingPlan.style.tsx';
import PhaseLineGraph from '../../graphs/trainingPhasesLine';
import {BottomSheet} from 'react-native-btr';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

const TrainingPlanContent = () => {
  const [selectedPhase, setSelectedPhase] = useState('General');
  const scrollViewRef = useRef(null);

  const descriptionChange = (phase: string) => {
    switch (phase) {
      case 'General':
        return (
          <DescriptorText>
            During the{' '}
            <Text style={{fontWeight: 'bold', color: 'black'}}>General</Text>{' '}
            phase, the training predominantly focused on building a broad
            aerobic base and improving overall fitness. The workouts were mainly
            composed of long, steady rides and cross-training activities, aimed
            at enhancing endurance, muscular strength, and recovery. This
            foundational phase set the stage for more intensive training in the
            subsequent phases.
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            This phase also emphasized the importance of establishing a solid
            routine, ensuring a balanced approach to training, recovery, and
            nutrition. The objective was to create a strong foundation, both
            physically and mentally, to support more specialized training in the
            future.
          </DescriptorText>
        );
      case 'Prep':
        return (
          <DescriptorText>
            The <Text style={{fontWeight: 'bold', color: 'black'}}>Prep</Text>{' '}
            phase marked a transition towards more structured training, with
            increased emphasis on intensity and specificity. Workouts included a
            mix of endurance rides and tempo efforts, designed to prepare the
            body for the higher demands of the specific training phases. The
            goal was to fine-tune fitness while avoiding overtraining.
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            In this phase, athletes started integrating more specific drills and
            techniques relevant to their discipline. It was a period of building
            strength and speed, while still maintaining a focus on overall
            endurance and conditioning.
          </DescriptorText>
        );
      case 'Specific 1':
        return (
          <DescriptorText>
            During the{' '}
            <Text style={{fontWeight: 'bold', color: 'black'}}>Specific 1</Text>{' '}
            phase, the training became highly targeted towards specific goals
            and events. The focus was on simulating race conditions, including
            interval training at race pace and hill repeats. Recovery and
            nutrition were also prioritized to optimize performance and
            adaptability to high-intensity efforts.
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            This phase often involved detailed analysis of past performances and
            strategic planning for upcoming challenges. The aim was to adapt the
            training to meet the specific demands of the athlete’s key events,
            focusing on maximizing their strengths and addressing any
            weaknesses.
          </DescriptorText>
        );
      case 'Specific 2':
        return (
          <DescriptorText>
            The{' '}
            <Text style={{fontWeight: 'bold', color: 'black'}}>Specific 2</Text>{' '}
            phase was characterized by an increased focus on specific skill
            development and targeted workouts. This phase involved a combination
            of high-intensity interval training, hill climbs, and speed work,
            aiming to enhance explosive power, agility, and race-specific
            endurance. Emphasis was also placed on refining techniques and
            tactical skills relevant to upcoming competitive events.
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            Training sessions were often shorter but more intense, with a focus
            on quality over quantity. The emphasis was on sharpening skills and
            building confidence, ensuring athletes were mentally and physically
            prepared for the competitive environment.
          </DescriptorText>
        );
      case 'Specific 3':
        return (
          <DescriptorText>
            The{' '}
            <Text style={{fontWeight: 'bold', color: 'black'}}>Specific 3</Text>{' '}
            phase represented the peak of race-specific preparation, with a
            focus on fine-tuning performance. Workouts were highly
            individualized, based on personal strengths and weaknesses. This
            phase also included tapering strategies to ensure peak fitness and
            mental readiness for upcoming competitions.
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
            Athletes in this phase engaged in a lot of race simulation and
            strategic planning, analyzing courses, competition, and personal
            tactics. The training was as much about mental preparation as it was
            about physical readiness, with a focus on achieving peak performance
            at the right time.
          </DescriptorText>
        );
      default:
        return (
          <DescriptorText>
            The past week's training regimen was characterized by a focus on
            foundational aerobic building while also incorporating short,
            high-intensity intervals on Wednesday. The systematic approach aimed
            to gradually bolster endurance, anaerobic capacity, and
            physiological adaptability to varied workout intensities.
          </DescriptorText>
        );
    }
  };
  return (
    <Container>
      <HeaderContainer>
        <SubheaderText>Activity Load</SubheaderText>
        <ActivityLoaderContainer>
          <ValueDescriptionText>Daily Activity Load</ValueDescriptionText>
          <ValueText>4hr 30min</ValueText>
        </ActivityLoaderContainer>
      </HeaderContainer>
      <GraphContainer>
        <PhaseLineGraph selectedPhase={selectedPhase} />
      </GraphContainer>
      <BottomSheetScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}>
        <PhaseSelector
          options={[
            'General',
            'Prep',
            'Specific 1',
            'Specific 2',
            'Specific 3',
          ]}
          scrollViewRef={scrollViewRef}
          onSelect={setSelectedPhase}
        />
      </BottomSheetScrollView>
      <DescriptorContainer>
        {descriptionChange(selectedPhase)}
      </DescriptorContainer>
    </Container>
  );
};

export default TrainingPlanContent;
