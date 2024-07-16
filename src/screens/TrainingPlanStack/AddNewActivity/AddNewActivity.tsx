import { View, ScrollView, StyleSheet, FlatList } from 'react-native'
import { BackHeader, Text } from '../../../components';
import {
  MainContainer, TitleContainer, SectionContainer, styles
} from './AddNewActivity.styles';
import Dropdown from '../../../components/basic/Dropdown/Dropdown';
import { useAddTrainingType } from './useAddNewActivityType';
export const AddNewActivity = () => {
  const { BodyPart, activities } = useAddTrainingType();

  const renderActivity = ({ item }) => {
    const UserComponent = item.userImage;
    const IconComponent = item.image;
    return (
      <View style={stylesInner.card} >
        <UserComponent width={50} height={50} style={stylesInner.image} />
        <View style={stylesInner.info}>
          <Text style={stylesInner.title}>{item.title}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={stylesInner.description}>{item?.description}</Text>
            <Text style={stylesInner.duration}>● {item?.dis}</Text>
            <Text style={stylesInner.duration}>● {item?.duration}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <MainContainer>
      <BackHeader
        title={'Add session'}
      />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <TitleContainer>
          <Text type={'heading2'} style={{ fontWeight: 'bold', color: 'black' }}>Add new activity</Text>
          <Text type={'subBody'} themeColor={'subtitle'}>Set up the activities list</Text>
        </TitleContainer>
        <SectionContainer style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10, marginTop: 15 }}>
          <View>
            <Text style={stylesInner.label}>Body Part</Text>
            <Dropdown data={BodyPart} />
            <Text style={stylesInner.label}>Equipment</Text>
            <Dropdown data={BodyPart} />
          </View>
        </SectionContainer>
        <View style={{marginTop:20}}>
          <FlatList
            data={activities}
            renderItem={renderActivity}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
    </MainContainer>
  )
}

const stylesInner = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000', // Set the text color to match your design
  },
  card: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor:'#fff',
    marginVertical:5,
    paddingHorizontal:10,
    borderRadius:12
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    color: '#99a3a4',
    marginRight: 5,
    fontSize: 12
  },
  duration: {
    color: '#99a3a4',
    fontSize: 12

  },
  icon: {
    marginLeft: 'auto',
  },
});