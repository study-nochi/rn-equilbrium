/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme, View} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {accelerometer} from 'react-native-sensors';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const accelerometerValue = useSharedValue({x: 0, y: 0, z: 0});

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const leftBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        accelerometerValue.value.y,
        [-1, 0],
        ['red', 'green'],
      ),
    };
  });

  const rightBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        accelerometerValue.value.y,
        [0, 1],
        ['green', 'red'],
      ),
    };
  });

  useEffect(() => {
    const subscription = accelerometer.subscribe(({x, y, z}) => {
      accelerometerValue.value = {x, y, z};
    });

    return () => subscription.unsubscribe();
  }, [accelerometerValue]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1}}>
        <Animated.View style={[{flex: 1}, leftBackground]} />
        <Animated.View style={[{flex: 1}, rightBackground]} />
      </View>
    </SafeAreaView>
  );
}

export default App;
