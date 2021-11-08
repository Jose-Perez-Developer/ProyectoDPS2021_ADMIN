import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/navigationAdmin';
export default function App() {
  return (
    <NavigationContainer>
      <Navigation></Navigation>
    </NavigationContainer>
  );
}

