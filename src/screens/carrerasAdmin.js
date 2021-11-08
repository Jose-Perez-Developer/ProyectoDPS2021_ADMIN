import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../../routes/rootCarrera';
export default function template3() {
  return (
    <NavigationContainer independent={true}>
      <RootNavigator />
    </NavigationContainer>
  );
}
