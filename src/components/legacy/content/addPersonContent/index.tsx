import {View, Text, TextInput} from 'react-native';
import React, {useMemo, useState} from 'react';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import AddPersonField from './components/AddPersonField.tsx';
import {StyleSheet} from 'react-native';
import {Icon} from '../metricContent/metricContent.style.tsx';
import theme from '../../../../theme';
import {useTheme} from 'styled-components/native';

const Persons = [
  {
    PersonName: 'Glenn Higgins',
    PersonImageName: 'RandomImage1.png',
    Recommended: true,
    Specialization: 'strength',
  },
  {
    PersonName: 'Sarah Johnson',
    PersonImageName: 'RandomImage2.png',
    Recommended: true,
    Specialization: 'nutrition',
  },
  {
    PersonName: 'Elizabeth Davis',
    PersonImageName: 'RandomImage3.png',
    Recommended: true,
    Specialization: 'nutrition',
  },
  {
    PersonName: 'Hannah Smith',
    PersonImageName: 'RandomImage4.png',
    Recommended: false,
    Specialization: 'recovery',
  },
  {
    PersonName: 'Wendy Wilson',
    PersonImageName: 'RandomImage5.png',
    Recommended: false,
    Specialization: 'endurance',
  },
  {
    PersonName: 'John Taylor',
    PersonImageName: 'RandomImage6.png',
    Recommended: false,
    Specialization: 'endurance',
  },
  {
    PersonName: 'Linda Anderson',
    PersonImageName: 'RandomImage7.png',
    Recommended: false,
    Specialization: 'strength',
  },
  {
    PersonName: 'Thomas Hayden',
    PersonImageName: 'RandomImage8.png',
    Recommended: false,
    Specialization: 'wellbeing',
  },
  {
    PersonName: 'Charlie Smith',
    PersonImageName: 'RandomImage9.png',
    Recommended: false,
    Specialization: 'nutrition',
  },
  {
    PersonName: 'Josephine White',
    PersonImageName: 'RandomImage10.png',
    Recommended: false,
    Specialization: 'wellbeing',
  },
  {
    PersonName: 'Karen Harris',
    Recommended: false,
    Specialization: 'nutrition',
  },
  {
    PersonName: 'Jessica Martin',
    Recommended: false,
    Specialization: 'strength',
  },
  {
    PersonName: 'Jennifer Garcia',
    Recommended: false,
    Specialization: 'nutrition',
  },
  {
    PersonName: 'Thomas Martinez',
    Recommended: false,
    Specialization: 'strength',
  },
  {
    PersonName: 'Michael Rodriguez',
    Recommended: false,
    Specialization: 'endurance',
  },
  {
    PersonName: 'Patricia Lee',
    Recommended: false,
    Specialization: 'recovery',
  },
  {
    PersonName: 'William Perez',
    Recommended: false,
    Specialization: 'wellbeing',
  },
  {
    PersonName: 'James Lopez',
    Recommended: false,
    Specialization: 'recovery',
  },
  {
    PersonName: 'Susan Clark',
    Recommended: false,
    Specialization: 'nutrition',
  },
  {
    PersonName: 'David Lewis',
    Recommended: false,
    Specialization: 'recovery',
  },
];

export const imageMap = {
  'RandomImage1.png': require('../../../../assets/images/people/RandomImage1.png'),
  'RandomImage2.png': require('../../../../assets/images/people/RandomImage2.png'),
  'RandomImage3.png': require('../../../../assets/images/people/RandomImage3.png'),
  'RandomImage4.png': require('../../../../assets/images/people/RandomImage4.png'),
  'RandomImage5.png': require('../../../../assets/images/people/RandomImage5.png'),
  'RandomImage6.png': require('../../../../assets/images/people/RandomImage6.png'),
  'RandomImage7.png': require('../../../../assets/images/people/RandomImage7.png'),
  'RandomImage8.png': require('../../../../assets/images/people/RandomImage8.png'),
  'RandomImage9.png': require('../../../../assets/images/people/RandomImage9.png'),
  'RandomImage10.png': require('../../../../assets/images/people/RandomImage10.png'),
  // Add the rest of your images here
};

const AddPersonContent = ({
  bottomSheetRef,
  openBottomSheet,
  onClose,
  setPersonName,
  setAddPersonImage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const snapPoints = useMemo(() => ['97%'], []);
  const theme = useTheme();
  const handleSheetChanges = index => {
    if (index === -1) {
      onClose && onClose();
    } else {
      openBottomSheet();
    }
  };

  const handleAddPerson = (PersonName, PersonImageName) => {
    console.log('Adding person:', PersonName);
    setPersonName(PersonName);
    setAddPersonImage(PersonImageName);
    onClose && onClose();
  };

  // Filter the Persons array based on the search query
  const filteredPersons = useMemo(() => {
    return Persons.filter(person =>
      person.PersonName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}>
      <View style={styles.searchContainer}>
        <Icon
          paddingTop={1}
          color={theme.primaryscale[8]}
          name="search"
          size={20}
        />
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search Persons..."
        />
      </View>
      <BottomSheetScrollView>
        {filteredPersons.map((person, index) => {
          const personImageSource = person.PersonImageName
            ? imageMap[person.PersonImageName]
            : null;
          return (
            <AddPersonField
              key={index}
              PersonName={person.PersonName}
              PersonImageSource={personImageSource}
              PersonImageName={person.PersonImageName}
              Recommended={person.Recommended}
              Specialization={person.Specialization}
              onAddPerson={handleAddPerson}
              addStatsText="follow"
            />
          );
        })}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: '#e2e2e2',
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  searchInput: {
    fontSize: 16,
    padding: 10,
  },
});

export default AddPersonContent;
