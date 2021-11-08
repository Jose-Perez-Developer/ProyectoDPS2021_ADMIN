import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();

import Post from '../components/Estudiantes/Post';
import Get from '../components/Estudiantes/Get';
import Detail from '../components/Estudiantes/Detail'

const rootStack = () => {
  
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
          title: 'Administración de usuarios',
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
      options={{ title: 'Agregar'}}
      />
      <Stack.Screen name="Detail" component={Detail} 
      options={{ title: 'Editar estudiante'}}      
      />
    </Stack.Navigator>
  );
};

export default rootStack;
