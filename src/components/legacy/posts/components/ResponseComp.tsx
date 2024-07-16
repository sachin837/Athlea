import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react'; // Example of icon library usage
import FastImage from 'react-native-fast-image';
import {useTheme} from 'styled-components/native';
import {Icon} from '../../content/metricContent/metricContent.style.tsx';
import {imageMap} from '../../content/addPersonContent';
const ResponseComp = ({
  imageUrl,
  accountName,
  postText,
  timePosted,
  thumbnailUrl,
  replyAmount,
  likeAmount,
}) => {
  const theme = useTheme();
  const [isLiked, setIsLiked] = useState(false);

  // Toggle like state
  const handleLikePress = () => {
    setIsLiked(!isLiked);
    // Here you could also dispatch an action to update the redux store
    // dispatch(toggleLikePost({ postId: id }));
  };
  return (
    <View style={styles.container}>
      <View>
        {imageUrl ? (
          <Image
            source={imageUrl}
            style={{
              width: 33,
              height: 33,
              marginRight: 1,
            }}
          />
        ) : (
          <Icon
            name="person"
            size={28}
            style={{
              marginRight: 1,
              marginLeft: 9,
            }}
          />
        )}
        {thumbnailUrl && (
          <View>
            <View style={styles.verticalLine} />
            <View style={styles.bottomImagesContainer}>
              <Image
                source={imageMap['RandomImage1.png']}
                style={styles.bottomImage}
              />
              <Image
                source={imageMap['RandomImage2.png']}
                style={styles.secondBottomImage}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.accountName}>{accountName}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.timePosted}>{timePosted}</Text>
            <Icon name="extras" style={{fontSize: 4.5, marginLeft: 16}} />
          </View>
          {/* Additional icons or options can go here */}
        </View>
        <Text style={styles.postText}>{postText}</Text>
        {thumbnailUrl && (
          <FastImage source={{uri: thumbnailUrl}} style={styles.image} />
        )}
        <View style={[styles.actions, {marginBottom: thumbnailUrl ? 15 : 5}]}>
          <TouchableOpacity onPress={handleLikePress}>
            <Icon
              name={isLiked ? 'heart' : 'heart-border'}
              style={[
                styles.icon,
                {color: isLiked ? theme.secondary : 'black'},
              ]}
            />
          </TouchableOpacity>
          <Icon name="comment-border" style={styles.icon} />
          <Icon name="repost" style={styles.icon} />
          <Icon name="share-arrow" style={[styles.icon, {fontSize: 15}]} />
        </View>
        {thumbnailUrl && (
          <View
            style={{
              flexDirection: 'row',
              marginRight: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 14,
                  marginRight: 6,
                }}>
                {replyAmount} replies
              </Text>
              <Text style={{color: 'grey', fontSize: 14, marginRight: 6}}>
                •
              </Text>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 14,
                }}>
                {likeAmount + (isLiked ? 1 : 0)} likes
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 17,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 20,
    alignItems: 'flex-start',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bottomImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingBottom: 10,
    alignItems: 'center',
  },
  bottomImage: {
    width: 16, // Adjust to your preference
    height: 16, // Adjust to your preference
    borderRadius: 10, // Adjust to your preference
  },
  secondBottomImage: {
    width: 20, // Adjust to your preference
    height: 20, // Adjust to your preference
    borderRadius: 10, // Adjust to your preference
    marginLeft: -4, // Adjust to your preference
    zIndex: 4, // Adjust to your preference
    borderColor: 'white', // Adjust to your preference
    borderWidth: 2, // Adjust to your preference
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#D9D9D9', // Or the color of your choice
    marginVertical: 5, // Adjust as necessary
    height: 250, // Adjust as necessary
    marginRight: 10, // Adjust as necessary
    marginLeft: 16, // Adjust as necessary
  },
  image: {
    width: 305, // Your desired width
    height: 160, // Your desired height
    borderRadius: 8, // Round the corners of the image
    borderColor: 'grey', // Adjust as needed
    borderWidth: 1, // Adjust as needed
    marginTop: 10, // Adjust as needed
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountName: {
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
  },
  timePosted: {
    color: 'grey',
    fontSize: 16,
  },
  postText: {
    // Styling for the post text, including color and margin
    marginTop: 8,
    color: 'black',
    fontSize: 16,
    width: '85%',
  },
  actions: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    marginTop: 16,
    marginBottom: 15,
    alignItems: 'center',
  },
  icon: {
    // Style your icons as needed
    fontSize: 18,
    marginRight: 14,
  },
});

export default ResponseComp;
