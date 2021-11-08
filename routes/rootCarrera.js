import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();

import Post from '../components/Carreras/PostCa';
import Get from '../components/Carreras/GetCa';
import Detail from '../components/Carreras/DetailCa'

const rootStackC = () => {
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
          title: 'Administración de carreras',
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
      options={{ title: 'Agregar Carrera'}}
      />
      <Stack.Screen name="Detail" component={Detail} 
      options={{ title: 'Editar Carrera'}}      
      />
    </Stack.Navigator>
  );
};

export default rootStackC;
