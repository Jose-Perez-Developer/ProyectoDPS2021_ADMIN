//import liraries
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
  MaskInput,
  TextInputMask,
  Button,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
//import MaskInput from 'react-native-mask-input';
import { MaskedTextInput } from 'react-native-mask-text';
import Iframe from 'react-iframe';

// create a component
const Get = ({ navigation }) => {
  const [shouldShow, setShouldShow] = useState(true);
  const [loading, setLoading] = useState(false);

  //------Codigo referente al registro de recepcion
  const [doc, setDoc] = useState({
    fecha1: '',
    fecha2: '',
    descripcion: '',
    estado: '',
  });

  const onChangefecha1 = (value) => {
    setDoc({ ...doc, fecha1: value });
  };

  const onChangefecha2 = (value) => {
    setDoc({ ...doc, fecha2: value });
  };

  const onChangedescripcion = (value) => {
    setDoc({ ...doc, descripcion: value });
  };

  //Logueo de admin e insert de documentacion
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
  var Estado = false;
  
  const mainFunction = async () => {
    const token = await LogeoAdmin('Kaguya65@hotmail.com', 'Pablito25');
    console.log(token);
    var nuevaDocumentacion = {
      FechaInicial: doc.fecha1,
      FechaFinal: doc.fecha2,
      Descripcion: doc.descripcion,
    };
    const result = saveData(token, nuevaDocumentacion);
    Estado = true;
  };

  //enviar datos
  const saveData = async (token = '', informacion = {}) => {
    setLoading(true);
    var requestOptions = {
      method: 'POST',
      headers: {
        'x-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(informacion),
      redirect: 'follow',
    };

    const resultado = await fetch(
      'https://rest-server-dps-api.herokuapp.com/api/receptions',
      requestOptions
    )
      .then((response) => {
        setLoading(false);
        response.text();
      })

      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    return resultado;
  };

  //Actualiza estado de documentos
  const updateEstado = async (token = '') => {
    setLoading(true);
    var requestOptions = {
      method: 'PUT',
      headers: {
        'x-token': token,
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
    };

    const resultado = await fetch(
      'https://rest-server-dps-api.herokuapp.com/api/receptions/false',
      requestOptions
    )
      .then((response) => {
        setLoading(false);
        response.text();
      })

      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    return resultado;
  };

  //----Fin de codigo referente al registro de recepcion
  const [recep, setRecep] = useState();

  const getUniData = async () => {
    try {
      let response = await fetch(
        'https://rest-server-dps-api.herokuapp.com/api/receptions'
      );
      let json = await response.json();
      setRecep(json.Receptions);
      console.log(recep);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    getUniData();
  }, []);

  //----Codigo que mostrara el listado de recepciones
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            padding: 5,
          }}>
          <Text style={{ fontWeight: 'bold' }}>{item.Estudiante.nombre}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  //---- Fin de codigo que mostrara las recepciones
  //Trayendo estado
  

  function CambiarEstado(){
    
  }


  //variable de prueba de estado
 
console.log(Estado)
  if (Estado == true) {
    return (
      <View>
        <FlatList
          data={recep}
          renderItem={renderItem}
          keyExtractor={(item) => item.Estudiante.uid}
        />
      </View>
    );
  } else if (Estado == false) {
    return (
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>


            {/*Here we will return the view when state is true 
          and will return false if state is false*/}
            
              <View>
                <Text>Fecha inicial</Text>
                <MaskedTextInput
                  placeholder={'Fecha inicial'}
                  onChangeText={(value) => onChangefecha1(value)}
                  style={styles.input}
                  mask="99/99/9999"
                />

                <Text>Fecha final</Text>
                <MaskedTextInput
                  placeholder={'Fecha final'}
                  onChangeText={(value) => onChangefecha2(value)}
                  style={styles.input}
                  mask="99/99/9999"
                />

                <Text>Agrege una descripcion</Text>
                <View style={styles.textAreaContainer}>
                  <TextInput
                    style={styles}
                    underlineColorAndroid="transparent"
                    placeholder="Agregar una descripcion"
                    placeholderTextColor="grey"
                    onChangeText={(value) => onChangedescripcion(value)}
                    numberOfLines={7}
                    multiline={true}
                  />
                </View>

                <TouchableOpacity onPress={mainFunction}>
                  <View style={{ backgroundColor: '#09009B', padding: 10 }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>
                      {loading ? 'Enviando...' : 'Enviar'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: '#E6E1E0',
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
  texto: {
    fontFamily: 'sans-serif-condensed',
    margin: 10,
  },
  container: {
    flex: 1,
    margin: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
  },
});

//make this component available to the app
export default Get;
