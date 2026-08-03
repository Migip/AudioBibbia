import { StyleSheet, useColorScheme, Platform } from 'react-native';
import Homepage from './App/Homepage';
import clTheme from './Globals/classes/colorTheme';
import * as NavigationBar from 'expo-navigation-bar';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();
  clTheme.configInstance(colorScheme);
  useEffect(() => {
    // NavigationBar.setBehaviorAsync('overlay-swipe'); // riappare temporaneamente allo swipe

    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
    }
  }, []);
  // const [fontsLoaded, fontError] = useFonts({
  //   ...FontAwesome6.font,
  // });

  // useEffect(() => {
  //   if (fontsLoaded || fontError) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, fontError]);

  // if (!fontsLoaded && !fontError) return null;
  return (
    <Homepage />
  );
};