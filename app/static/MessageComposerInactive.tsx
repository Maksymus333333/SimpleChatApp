import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MessageComposerInactive = () => {
  return (
    <View style={styles.bottom}>
      <View style={styles.bottomChild} />
      <Image style={[styles.clipAttachmentIcon, styles.iconLayout]} resizeMode="cover" source={require('../../assets/Clip, Attachment.png')} />
      <View style={styles.bottomItem} />
      <Text style={styles.writeYourMessage}>Write your message</Text>
      <Image style={[styles.filesIcon, styles.iconLayout]} resizeMode="cover" source={require('../../assets/files.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    maxHeight: '100%',
    overflow: 'hidden',
    maxWidth: '100%',
    bottom: '20%',
    top: '20%',
    height: '60%',
    position: 'absolute',
  },
  writeYourMessage: {
    top: 14,
    left: 12,
    fontSize: 12,
    lineHeight: 12,
    fontFamily: 'Circular Std',
    color: '#797c7b',
    textAlign: 'left',
    position: 'absolute',
  },
  bottomChild: {
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderColor: '#eefaf8',
    borderWidth: 1,
    width: 375,
    position: 'absolute',
    height: 80,
  },
  clipAttachmentIcon: {
    right: '87.2%',
    left: '6.4%',
    width: '6.4%',
    height: '30%',
  },
  bottomItem: {
    top: 20,
    left: 59,
    borderRadius: 12,
    backgroundColor: '#f3f6f6',
    width: 236,
    height: 40,
    position: 'absolute',
  },
  filesIcon: {
    right: '23.47%',
    left: '70.13%',
    width: '11.11%',
    height: '60%',
  },
  bottom: {
    flex: 1,
    width: '100%',
    height: 80,
  },
});

export default MessageComposerInactive;
