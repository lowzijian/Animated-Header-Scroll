import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const TAB_BAR_HEIGHT = 56;

const TabBar = () => {
  return (
    <View style={styles.TabBar}>
      <Text style={styles.text}>Sample Tab bar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TabBar: {
    height: TAB_BAR_HEIGHT,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default TabBar;
