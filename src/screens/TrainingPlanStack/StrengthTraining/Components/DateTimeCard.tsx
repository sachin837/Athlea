import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DateTimeCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Select date & time:</Text>
        <View style={styles.dateTimeContainer}>
          <View style={[styles.dateTimeSection, styles.marginRight]}>
            <Text style={styles.dateTimeText}>8 May 2024</Text>
            <Icon name="calendar-today" size={20} color="#99a3a4" style={styles.icon} />
          </View>
          <View style={styles.dateTimeSection}>
            <Text style={styles.dateTimeText}>20:00</Text>
            <Icon name="access-time" size={20} color="#99a3a4" style={styles.icon} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 1
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: '100%',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeSection: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 9,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 8,
  },
  dateTimeText: {
    flex: 1,
    color: '#99a3a4',
  },
  icon: {
    marginLeft: 5,
  },
});

export default DateTimeCard;
