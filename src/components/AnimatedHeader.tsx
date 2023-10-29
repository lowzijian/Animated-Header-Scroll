import React, {FC, PropsWithChildren} from 'react';
import {Animated, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import IconButton from './IconButton';
import SearchBar, {SEARCH_BAR_HEIGHT} from './SearchBar';

export const HEADER_TITLE_HEIGHT = 56;

interface AnimatedHeaderProps {
  scrollY: Animated.Value;
}

export const HEADER_HEIGHT = SEARCH_BAR_HEIGHT + HEADER_TITLE_HEIGHT;

const AnimatedHeader: FC<PropsWithChildren<AnimatedHeaderProps>> = ({
  scrollY,
  children,
}) => {
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);

  const headerY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_TITLE_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const searchBarActionOpacity = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolateLeft: 'clamp',
  });

  const searchBarWidth = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: ['100%', '80%'],
    extrapolateLeft: 'clamp',
  });

  const renderActions = () => (
    <>
      <IconButton>A</IconButton>
      <IconButton>B</IconButton>
    </>
  );

  const renderHeaderTitleContainer = () => (
    <Animated.View
      style={[
        styles.headerTitleContainer,
        {
          opacity: headerTitleOpacity,
        },
      ]}>
      <Text style={styles.title}>Discover</Text>
      <View style={styles.headerActionContainer}>{renderActions()}</View>
    </Animated.View>
  );

  const renderSearchBar = () => (
    <View style={styles.headerSearchBarContainer}>
      <Animated.View
        style={[
          styles.searchBarContainer,
          {
            width: searchBarWidth, // Animate the left property
          },
        ]}>
        <SearchBar />
      </Animated.View>
      <Animated.View
        style={[
          styles.headerActionSubContainer,
          {opacity: searchBarActionOpacity},
        ]}>
        {renderActions()}
      </Animated.View>
    </View>
  );

  return (
    <Animated.View
      style={[
        styles.header,
        {
          transform: [{translateY: headerY}],
        },
        // {
        //     height:headerHeight
        // }
      ]}>
      <View>
        {renderHeaderTitleContainer()}
        {renderSearchBar()}
      </View>
      {/* {children} */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#949494',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: HEADER_TITLE_HEIGHT,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  headerActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  searchBarContainer: {
    zIndex: 1,
  },
  headerSearchBarContainer: {
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActionSubContainer: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
});

export default AnimatedHeader;
