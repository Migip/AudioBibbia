import { StyleSheet, useColorScheme } from 'react-native';
import Homepage from './App/Homepage';
import clTheme from './Globals/classes/colorTheme';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();
  clTheme.configInstance(colorScheme);
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