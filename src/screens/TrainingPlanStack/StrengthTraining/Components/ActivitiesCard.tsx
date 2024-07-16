import React from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import { Button } from '../../../../components';
import Loading from "../../../../assets/images/loading.svg";
import User from "../../../../assets/images/user.svg";
import { useAddTrainingType } from '../useAddTrainingType';

const ActivitiesCard = () => {
    const { data, addNewActivity } = useAddTrainingType();
    const activities = [
        { id: 1, title: 'Warm Up', description: 'Dynamic stretching', duration: '10 min', userImage: User, image: Loading },
        { id: 2, title: 'Warm Up', description: 'Dynamic stretching', duration: '10 min', userImage: User, image: Loading },
        { id: 3, title: 'Warm Up', description: 'Dynamic stretching', duration: '10 min', userImage: User, image: Loading },
        { id: 4, title: 'Warm Up', description: 'Dynamic stretching', duration: '10 min', userImage: User, image: Loading },
        { id: 5, title: 'Warm Up', description: 'Dynamic stretching', duration: '10 min', userImage: User, image: Loading },
    ];

    const renderActivity = ({ item }) => {
        const UserComponent = item.userImage;
        const IconComponent = item.image;
        return (
            <View style={styles.card} >
                <UserComponent width={50} height={50} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.duration}>● {item.duration}</Text>
                    </View>
                </View>
                <IconComponent width={20} height={20} style={styles.icon} />
            </View>
        );
    };

    const renderSeparator = () => {
        return (
            <View style={styles.separator} />
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Activities</Text>
            <FlatList
                data={activities}
                renderItem={renderActivity}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={renderSeparator}
            />
            <View style={{ marginTop: 10}}>
                <Button
                    outlined
                    text={'+ Add New'}
                    onPress={() => addNewActivity()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 20,
        borderColor: '#ccc',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
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
        marginRight:5,
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

export default ActivitiesCard;
