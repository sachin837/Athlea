import {View, Text} from 'react-native'
import React from 'react'
import ProgressRing from '../../../centerContent/components/progressCircle'
import {StyleSheet} from 'react-native'
import CommentActiveComp from '../../../message/commentActive'

const ProgressRingBlock = () => {
  return (
    <View>
      <View style={styles.rowCommentContainer}>
        <View style={styles.ringContainer}>
          <ProgressRing progress={2} size={4} />
          <Text style={styles.labelTitle}>Legs</Text>
        </View>
        <View style={styles.commentContainer}>
          <CommentActiveComp
            width={70}
            MessageContent="You have 2 new messages from your coach. Click to view"
            TimeTextContent="now"
            animate={false}
            showIcons={false}
          />
        </View>
      </View>
      <View style={styles.rowCommentContainer}>
        <View style={styles.ringContainer}>
          <ProgressRing progress={2} size={4} />
          <Text style={styles.labelTitle}>Shoulders</Text>
        </View>
        <View>
          <CommentActiveComp
            width={70}
            MessageContent="You have 2 new messages from your coach. Click to view"
            TimeTextContent="now"
            animate={false}
            showIcons={false}
          />
        </View>
      </View>
      <View style={styles.rowCommentContainer}>
        <View style={styles.ringContainer}>
          <ProgressRing progress={2} size={4} />
          <Text style={styles.labelTitle}>Arms</Text>
        </View>
        <View>
          <CommentActiveComp
            width={70}
            MessageContent="You have 2 new messages from your coach. Click to view"
            TimeTextContent="now"
            animate={false}
            showIcons={false}
          />
        </View>
      </View>
      <View style={styles.rowCommentContainer}>
        <View style={styles.ringContainer}>
          <ProgressRing progress={2} size={4} />
          <Text style={styles.labelTitle}>Back</Text>
        </View>
        <View>
          <CommentActiveComp
            width={70}
            MessageContent="You have 2 new messages from your coach. Click to view"
            TimeTextContent="now"
            animate={false}
            showIcons={false}
          />
        </View>
      </View>
      <View style={styles.rowCommentContainer}>
        <View style={styles.ringContainer}>
          <ProgressRing progress={2} size={4} />
          <Text style={styles.labelTitle}>Thighs</Text>
        </View>
        <View>
          <CommentActiveComp
            width={70}
            MessageContent="You have 2 new messages from your coach. Click to view"
            TimeTextContent="now"
            animate={false}
            showIcons={false}
          />
        </View>
      </View>
    </View>
  )
}

export default ProgressRingBlock

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  rowCommentContainer: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  ringContainer: {
    paddingLeft: 6,
    paddingRight: 14,
    paddingVertical: 6,
    alignItems: 'center',
  },
  commentContainer: {
    padding: 6,
  },
  labelTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
})
