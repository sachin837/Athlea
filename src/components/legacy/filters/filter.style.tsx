import styled from 'styled-components/native';

export const FilterButton = styled.TouchableOpacity`
  padding: 10px 20px;
  margin: 3px;
  border: 1px solid #000;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const FilterText = styled.Text`
  font-size: 16px;
  color: #000;
`;

export const SelectedFilterText = styled(FilterText)`
  color: #fff;
`;

export const SelectedFilterButton = styled(FilterButton)`
  background-color: #000;
`;

export const FilterList = styled.FlatList.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  padding: 10px 15px;
`;
