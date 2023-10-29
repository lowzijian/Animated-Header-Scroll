import React, {useRef} from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AnimatedHeader, {
  HEADER_HEIGHT,
  HEADER_TITLE_HEIGHT,
} from './src/components/AnimatedHeader';
import TabBar, {TAB_BAR_HEIGHT} from './src/components/TabBar';
import {debounce} from 'lodash';

const Card = ({index}: {index: number}) => (
  <View style={styles.card}>
    <Text>{index}</Text>
  </View>
);

const SCROLL_THRESHOLD = HEADER_HEIGHT / 2;

const App = () => {
  const scrollY = useRef(new Animated.Value(0));
  const scrollRef = useRef<ScrollView | null>(null);
  const diffClamp = Animated.diffClamp(scrollY.current, 0, HEADER_HEIGHT);

  const AnimatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollY.current},
        },
      },
    ],
    {
      useNativeDriver: false,
    },
  );

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const clampValue = Number.parseInt(JSON.stringify(diffClamp));
    console.log(clampValue);

    startAutoCollapse(clampValue);
  };

  const startAutoCollapse = debounce((clampValue: number) => {
    if (clampValue >= HEADER_HEIGHT / 2 && clampValue < HEADER_HEIGHT) {
      // If clampValue is more than half of HEADER_HEIGHT, fully collapse the header
      Animated.timing(scrollY.current, {
        toValue: HEADER_HEIGHT,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      console.log('gege')
    } else {
      // If clampValue is less than or equal to half of HEADER_HEIGHT, fully open the header
      Animated.timing(scrollY.current, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
    // scrollRef.current?.scrollTo({y: remaining, animated: true});
  }, 300);

  const resetHeaderPosition = () => {
    Animated.timing(scrollY.current, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.body}>
      <AnimatedHeader scrollY={scrollY.current}>
        <TabBar />
      </AnimatedHeader>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={AnimatedEvent}
        style={styles.content}
        contentContainerStyle={{
          gap: 8,
          paddingTop: HEADER_HEIGHT,
        }}
        ref={scrollRef}
        onMomentumScrollEnd={handleMomentumScrollEnd}>
        {Array.from({length: 20}).map((_, index) => (
          <Card index={index} key={index.toString()} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    height: 160,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default App;
