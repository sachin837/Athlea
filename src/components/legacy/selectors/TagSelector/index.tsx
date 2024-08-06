import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const categorizedTags = {
  'Fitness Levels': ['Beginner', 'Intermediate', 'Advanced'],
  'Primary Training Focus': [
    'Endurance',
    'Strength',
    'Flexibility and Mobility',
    'Weight Loss or Body Composition',
    'Sport-Specific Training',
  ],
  'Health and Wellness Goals': [
    'Improve general health',
    'Enhance mental well-being',
    'Manage stress',
    'Improve sleep quality',
    'Increase energy levels',
  ],
  'Performance Goals': [
    'Complete a specific race or event',
    'Achieve a personal best',
    'Increase speed, agility, or power',
    'Improve technical skills or efficiency',
  ],
  'Lifestyle Preferences': [
    'Preferred training times',
    'Available days per week for training',
    'Preferred training duration per session',
    'Access to equipment and facilities',
    'Dietary preferences and restrictions',
  ],
  'Recovery and Rehabilitation Goals': [
    'Recover from an injury',
    'Prevent future injuries',
    'Improve posture and ergonomics',
    'Enhance recovery techniques',
  ],
  'Special Considerations': [
    'Existing health conditions or injuries',
    'Age-related considerations',
    'Pregnancy or postpartum training',
    'Training for a specific life event',
  ],
  'Motivation and Support Needs': [
    'Accountability',
    'Community support',
    'Educational resources',
  ],
};

const TagSelector = ({selectedTags, setSelectedTags}) => {
  const toggleTag = tag => {
    setSelectedTags(prevSelectedTags =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter(t => t !== tag)
        : [...prevSelectedTags, tag],
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {Object.entries(categorizedTags).map(([category, tags]) => (
          <View
            key={category}
            style={{
              marginBottom: 20,
            }}>
            <Text style={styles.categoryHeader}>{category}</Text>
            <View style={styles.tagContainer}>
              {tags.map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <TouchableOpacity
                    key={tag}
                    style={[styles.tag, isSelected && styles.selectedTag]}
                    onPress={() => toggleTag(tag)}>
                    <Text
                      style={[
                        styles.tagText,
                        isSelected && styles.selectedTagText,
                      ]}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 30,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginHorizontal: -2, // Adjust this as needed to control the wrapping
  },
  categoryHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 14, // Adjust padding to match the visual style of the tags
    borderRadius: 20,
    // Adjust margin to control space between tags
    marginBottom: 7, // Adjust bottom margin to control vertical space between lines
    marginHorizontal: 2, // Adjust horizontal margin to control space between tags
  },
  selectedTag: {
    backgroundColor: '#000',
  },
  tagText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
  },
  selectedTagText: {
    color: '#fff',
  },
});

export default TagSelector;
