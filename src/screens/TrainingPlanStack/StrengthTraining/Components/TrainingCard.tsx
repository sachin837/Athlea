import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TitleContainer, StarIcon } from '../StrengthTraining.styles';

const TrainingCard = () => {
    return (
        <View>
            <View style={cardStyles.card}>
                <TitleContainer style={cardStyles.header}>
                    <Text style={cardStyles.title}>Strength training</Text>
                    <StarIcon name="star-border" size={20} color="#333" />
                </TitleContainer>
                <View style={cardStyles.infoContainer}>
                    <View style={cardStyles.info}>
                        <Text style={cardStyles.label}>Duration</Text>
                        <Text style={cardStyles.value}>45'00"</Text>
                    </View>
                    <View style={cardStyles.info}>
                        <Text style={cardStyles.label}>Intensity</Text>
                        <Icon name="signal-cellular-alt" size={20} color="#333" />
                    </View>
                </View>
                <Text style={cardStyles.description}>
                    Description orem ipsum dolor sit amet consectetur. Quis nisi elit volutpat sed aliquam ut massa ut
                </Text>
            </View>
        </View>
    );
};

const cardStyles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
        width: '80%'
    },
    info: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    label: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});

export default TrainingCard;
