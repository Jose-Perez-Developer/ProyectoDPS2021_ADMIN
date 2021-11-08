import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
 TouchableOpacity,Alert, Linking,MaskInput,TextInputMask
} from 'react-native';
import Constants from 'expo-constants';
//import MaskInput from 'react-native-mask-input';
import { MaskedTextInput} from "react-native-mask-text";

export default function Post({navigation}) {
  
  //// validaciones
 
const [textInputValue, setTextInputValue] = React.useState('');

 const [emailError,setErrorEmail]=useState("");
 const [telefonoError,setErrorTelefono]=useState("");
 const [nombreError,setErrorNombre]=useState("");
 const [direccionError,setErrorDireccion]=useState("");


 //--validacion de correo

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

const validateData = () => {
        setErrorEmail("");
        setErrorTelefono("");
        setErrorNombre("");
        setErrorDireccion("");

        let isValid = true

        //validacion nombre
        if (!uni.nombre1.trim()) {
          setErrorNombre("Ingrese nombre de universidad.")
            isValid = false

        }
        else if(!isNaN(uni.nombre1)){
          setErrorNombre("Ingrese un nombre valido")
            isValid = false          
        }

        //validacion direccion
        if (!uni.direccion1.trim()) {
          setErrorDireccion("Ingrese direccion de universidad.")
            isValid = false
        }


        //validacion de correo
        if (!uni.correo1.trim()) {
          setErrorEmail("Ingrese correo de universidad.")
            isValid = false
        }
        else if(!validateEmail(uni.correo1)) {
            setErrorEmail("Debes de ingresar un email válido.")
            isValid = false
        }


        //validacion numero de telefono
        if (!uni.telefono1.trim()) {
          setErrorTelefono("Ingrese numero telefonico de universidad.")
            isValid = false        
        }
        else if(isNaN(uni.telefono1)){
          setErrorTelefono("Debe ingresar un numero de teleno valido.")
            isValid = false
        }

        //Retornamos el valor booleano
        return isValid
}
 //// fin de validaciones
  
  
  const [uni, setUni] = useState({
    nombre1: '',
    direccion1: '',
    correo1: '',
    telefono1: '',
  });

  const [loading, setLoading] = useState(false);

  const onChangeNombre = (value) => {
    setUni({ ...uni, nombre1: value });
  };

  const onChangeDireccion = (value) => {
    setUni({ ...uni, direccion1: value });
  };

  const onChangeCorreo = (value) => {
    setUni({ ...uni, correo1: value });
  };

  const onChangeTelefono = (value) => {
    setUni({ ...uni, telefono1: value });
  };

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
      'https://rest-server-dps-api.herokuapp.com/Api/universities',
      requestOptions
    )
      .then((response) => {
        setLoading(false);
        response.text();
        navigation.push('Get');
      })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    return resultado;
  };

  const main = async () => {
    const token = await LogeoAdmin('Kaguya65@hotmail.com', 'Pablito25');
    var nuevaUniversidad = {
      nombre: uni.nombre1,
      direccion: uni.direccion1,
      correo: uni.correo1,
      telefono: uni.telefono1,
    };

    const result = saveData(token, nuevaUniversidad);

    console.log(result);
  };

  //Alert
  const InsertUniversity = () =>{
    
        if(!validateData()){
          console.log("error correo");
          return;
        }
    else{
        Alert.alert('Ingreso de Universidad', '¿Desea agregar esta universidad?', [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: main,
          },
        ]);
    }
  };

  return (
    <View style={styles.container}>
           <TextInput
        placeholder={'Nombre'}
        onChangeText={(value) => onChangeNombre(value)}
        style={styles.input}
      />

      <Text style={{color:'#F82006'}}>{nombreError}</Text>

      <TextInput
        placeholder={'Direccion'}
        onChangeText={(value) => onChangeDireccion(value)}
        style={styles.input}
      />

      <Text style={{color:'#F82006'}}>{direccionError}</Text>

      <TextInput
        placeholder={'Correo'}
        onChangeText={(value) => onChangeCorreo(value)}
        style={styles.input}
      />
     
      <Text style={{color:'#F82006'}}>{emailError}</Text>

      <MaskedTextInput
        placeholder={'Telefono'}
        onChangeText={(value) => onChangeTelefono(value)}
        style={styles.input}
        mask="99999999"
      />
      <Text style={{color:'#F82006'}}>{telefonoError}</Text>

      <TouchableOpacity onPress={InsertUniversity}>
        <View style={{ backgroundColor: '#09009B', padding: 10 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {loading ? 'Enviando...' : 'Enviar'}
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
