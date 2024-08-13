import React from 'react';
import {
  FilterButton,
  FilterText,
  SelectedFilterButton,
  FilterList,
  SelectedFilterText,
} from './filter.style.tsx';

interface FilterProps {
  filters: string[];
  selectedFilter: string | null;
  onFilterSelect: (filter: string | null) => void; // Add this prop for handling filter selection
}

const FilterComponent = ({
  filters,
  selectedFilter,
  onFilterSelect, // Use this prop for handling filter selection
}: FilterProps) => {
  const handleFilterPress = (item: string) => {
    onFilterSelect(item === selectedFilter ? null : item); // Call onFilterSelect instead of directly setting the state
  };

  const renderItem = ({item}) => (
    <FilterButton
      as={item === selectedFilter ? SelectedFilterButton : undefined}
      onPress={() => handleFilterPress(item)}>
      {item === selectedFilter ? (
        <SelectedFilterText>{item}</SelectedFilterText>
      ) : (
        <FilterText>{item}</FilterText>
      )}
    </FilterButton>
  );

  return (
    <FilterList
      data={filters}
      renderItem={({item}) => renderItem({item})} // Adjusted for clarity
      keyExtractor={item => item}
    />
  );
};

export default FilterComponent;
