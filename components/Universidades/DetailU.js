//import liraries
import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
 TouchableOpacity,Alert, Linking,MaskInput,TextInputMask
} from 'react-native';
import { MaskedTextInput} from "react-native-mask-text";

// create a component
const Detail = ({ route, navigation }) => {
 

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
        if (!uni.nombre.trim()) {
          setErrorNombre("Ingrese nombre de universidad.")
            isValid = false

        }
        else if(!isNaN(uni.nombre)){
          setErrorNombre("Ingrese un nombre valido")
            isValid = false          
        }

        //validacion direccion
        if (!uni.direccion.trim()) {
          setErrorDireccion("Ingrese direccion de universidad.")
            isValid = false
        }


        //validacion de correo
        if (!uni.correo.trim()) {
          setErrorEmail("Ingrese correo de universidad.")
            isValid = false
        }
        else if(!validateEmail(uni.correo)) {
            setErrorEmail("Debes de ingresar un email válido.")
            isValid = false
        }


        //validacion numero de telefono
        if (!uni.telefono.trim()) {
          setErrorTelefono("Ingrese numero telefonico de universidad.")
            isValid = false        
        }
        else if(isNaN(uni.telefono)){
          setErrorTelefono("Debe ingresar un numero de teleno valido.")
            isValid = false
        }
        else if(uni.telefono.length <8 || uni.telefono.length >8){
          setErrorTelefono("Debe ingresar un numero de teleno valido.")
            isValid = false
        }

        //Retornamos el valor booleano
        return isValid
}
 //// fin de validaciones


  const { item } = route.params;

  const [uni, setUni] = useState({
    nombre: item.nombre,
    direccion: item.direccion,
    correo: item.correo,
    telefono: item.telefono,
  });

  const onChangeNombre = (value) => {
    setUni({ ...uni, nombre: value });
  };

  const onChangeDireccion = (value) => {
    setUni({ ...uni, direccion: value });
  };

  const onChangeCorreo = (value) => {
    setUni({ ...uni, correo: value });
  };

  const onChangeTelefono = (value) => {
    setUni({ ...uni, telefono: value });
  };

  //se utiliza para loguearse
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

  //actualiza los datos
  const updateData = async (token = '', informacion = {}, uid) => {
    var requestOptions = {
      method: 'PUT',
      headers: {
        'x-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(informacion),
      redirect: 'follow',
    };

    const resultado = await fetch(
      'https://rest-server-dps-api.herokuapp.com/Api/universities/' + item.uid,
      requestOptions
    )
      .then((response) => {
        response.text();
        navigation.push('Get');
      })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    return resultado;
  };

  const mainUpdate = async () => {
    const token = await LogeoAdmin('Kaguya65@hotmail.com', 'Pablito25');
    var nuevaUniversidad = {
      nombre: uni.nombre,
      direccion: uni.direccion,
      correo: uni.correo,
      telefono: uni.telefono,
    };

    const result = updateData(token, nuevaUniversidad, item.uid);
  };

  const mainDelete = async () => {
    const token = await LogeoAdmin('Kaguya65@hotmail.com', 'Pablito25');
    // var nuevaUniversidad = {nombre: uni.nombre, direccion: uni.direccion,correo:uni.direccion, telefono:uni.telefono};
    const result = deleteData(token, item.uid);
  };

  //eliminar datos
  const deleteData = async (token = '', uid) => {
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
      'https://rest-server-dps-api.herokuapp.com/Api/universities/' + item.uid,
      requestOptions
    )
      .then((response) => {
        response.text();
        navigation.push('Get');
      })
      .then((response) => {
        response.text();
        navigation.push('Get');
      })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
    return resultado;
  };

  //Alert update
  const UpdateButtonAlert = () =>{
      if(!validateData()){
          console.log("error correo");
          return;
        }
    else{
          Alert.alert(
        'Actualizar Universidad',
        '¿Desea actualizar esta universidad?',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: mainUpdate,
          },
        ]
      );
    }
  };

  //Alert delete
  const DeleteButtonAlert = () =>
    Alert.alert('Eliminar Universidad', '¿Desea eliminar esta universidad?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: mainDelete,
      },
    ]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Nombre'}
        onChangeText={(value) => onChangeNombre(value)}
        style={styles.input}
        value={uni.nombre}
      />
      <Text style={{color:'#F82006'}}>{nombreError}</Text>

      <TextInput
        placeholder={'Direccion'}
        onChangeText={(value) => onChangeDireccion(value)}
        style={styles.input}
        value={uni.direccion}
      />
      <Text style={{color:'#F82006'}}>{direccionError}</Text>


      <TextInput
        placeholder={'Correo'}
        onChangeText={(value) => onChangeCorreo(value)}
        style={styles.input}
        value={uni.correo}
      />

      <Text style={{color:'#F82006'}}>{emailError}</Text>

      <TextInput
        placeholder={'Telefono'}
        onChangeText={(value) => onChangeTelefono(value)}
        style={styles.input}
        value={uni.telefono}
        mask="99999999"
      />
      <Text style={{color:'#F82006'}}>{telefonoError}</Text>


      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={UpdateButtonAlert}>
          <View style={{ backgroundColor: '#09009B', padding: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Actualizar
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={DeleteButtonAlert}>
          <View style={{ backgroundColor: 'red', padding: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Eliminar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    //backgroundColor: '#fff',
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
export default Detail;
