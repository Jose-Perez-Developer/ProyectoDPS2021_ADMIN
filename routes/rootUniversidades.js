import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();

import Post from '../components/Universidades/PostU';
import Get from '../components/Universidades/GetU';
import Detail from '../components/Universidades/DetailU'

const rootStackU = () => {
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
          title: 'Administración Universidades',
          headerRight: () => (
            <Ionicons
              name={'ios-add-circle'}
              size={25}
              color={'white'}
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate('Post')}
            />
          ),
        })}
      />
      <Stack.Screen name="Post" component={Post} 
      options={{ title: 'Agregar Universidad'}}
      />
      <Stack.Screen name="Detail" component={Detail} 
      options={{ title: 'Editar Universidad'}}      
      />
    </Stack.Navigator>
  );
};

export default rootStackU;
