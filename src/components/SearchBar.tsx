import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const SEARCH_BAR_HEIGHT = 56;

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Text style={styles.placeholder}>Enter Your Search here ....</Text>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    height: SEARCH_BAR_HEIGHT,
    flex: 1,
  },
  searchBar: {
    paddingHorizontal: 8,
    backgroundColor: '#e6e6e6',
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});
