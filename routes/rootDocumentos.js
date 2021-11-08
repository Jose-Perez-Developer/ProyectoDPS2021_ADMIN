import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();

import Get from '../components/Documentos/GetD';
import Remove from '../components/Documentos/Remove';

const rootDocumentos = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#09009B',
        },
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="Get"
        component={Get}
        options={({ navigation, route }) => ({
          title: 'Recepcion documentos',
          headerRight: () => (
            <Ionicons
              name={'ios-remove-circle'}
              size={25}
              color={'white'}
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('Remove')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Remove"
        component={Remove}
        options={{ title: 'Eliminar Recepcion' }}
      />
    </Stack.Navigator>
  );
};

export default rootDocumentos;
