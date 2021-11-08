import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Picker,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import { MaskedTextInput } from 'react-native-mask-text';

export default function Remove({ navigation }) {
  const [loading, setLoading] = useState(false);

  //boton de logueo
  const LogeoAdmin = async (correo = '', password = '') => {
    var raw2 = { correo, password };
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(raw2),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const tokenAuth = await fetch(
      'https://rest-server-dps-api.herokuapp.com/api/auth/login',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => JSON.parse(result))
      .then((data) => data.token)
      .catch((error) => console.log('error', error));
    return tokenAuth;
  };

  const mainDelete = async () => {
    const token = await LogeoAdmin('Kaguya65@hotmail.com', 'Pablito25');
    const result = deleteData(token);
    // var nuevaUniversidad = {nombre: uni.nombre, direccion: uni.direccion
    //correo:uni.direccion, telefono:uni.telefono};
  };

  //eliminar datos
  const deleteData = async (token = '') => {
    var requestOptions = {
      method: 'DELETE',
      headers: {
        'x-token': token,
        'Content-Type': 'application/json',
      },
      // body:JSON.stringify(informacion),
      //redirect: 'follow',
    };
    const resultado = await fetch(
      'https://rest-server-dps-api.herokuapp.com/api/receptions',
      requestOptions
    )
      .then((response) => {
        response.text();
        navigation.push('Get');
      })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    //console.log(token)
    return resultado;
  };

  return (
    <View style={styles.container}>
      <Text>Esta seguro que desea eliminar la Recepcion de documentos? </Text>

      <Text>--------</Text>

      <Text>
        Al eliminar la Recepcion de documentos se debera crear una nueva para
        que los estdiantes suban los documentos
      </Text>

      <TouchableOpacity onPress={mainDelete}>
        <View style={{ backgroundColor: '#09009B', padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {loading ? 'Eliminando...' : 'Eliminar'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    margin: 15,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },
});
