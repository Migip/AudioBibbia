import { StyleSheet, useColorScheme } from 'react-native';
import Homepage from './App/Homepage';
import clTheme from './Globals/classes/colorTheme';

export default function App() {
  const colorScheme = useColorScheme();
  clTheme.configInstance(colorScheme);
  return (
    <Homepage />
  );
};