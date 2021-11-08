//import liraries
import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
  Alert
} from 'react-native';

// create a component
const Detail = ({ route, navigation }) => {

 //// validaciones
 
const [textInputValue, setTextInputValue] = React.useState('');

 const [pensumError,setErrorPensum]=useState("");
 const [ciclosError,setErrorCiclos]=useState("");
 const [nombreError,setErrorNombre]=useState("");

const validateData = () => {
        setErrorNombre("");
        setErrorCiclos("");
        setErrorPensum("");

        let isValid = true

        //validacion nombre
        if (!carre.nombre.trim()) {
          setErrorNombre("Ingrese nombre de carrera.")
            isValid = false

        }
        else if(!isNaN(carre.nombre)){
          setErrorNombre("Ingrese un nombre valido")
            isValid = false          
        }

        //validacion pensum
        if (!carre.pensum.trim()) {
          setErrorPensum("Ingrese pensum de carrera.")
            isValid = false
        }


        //validacion de ciclos
        if (!carre.ciclos.trim()) {
          setErrorCiclos("Ingrese cantidad de ciclos.")
            isValid = false
        }
        else if(isNaN(carre.ciclos)){
          setErrorCiclos("Debe ingresar un numero de ciclos valido.")
            isValid = false
        }

        //Retornamos el valor booleano
        return isValid
}
 //// fin de validaciones
  



  //codigo para agregar select
  const [uni, setUni] = useState([]);
  const [cambio, setCambio] = useState();

  const getUniData = async () => {
    try {
      let response = await fetch(
        'https://rest-server-dps-api.herokuapp.com/Api/universities?desde=0&limite=10'
      );
      let json = await response.json();
      setUni(json.Universities);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    getUniData();
  }, []);

  //fin de codigo agregar select

  //codigo para actualizar la carrera
  const { item } = route.params;

  const [carre, setCarre] = useState({
    nombre: item.nombre,
    pensum: item.pensum,
    ciclos: item.ciclos,
    idUniversidad: item.idUniversidad,
  });

  const onChangeNombre = (value) => {
    setCarre({ ...carre, nombre: value });
  };

  const onChangePensum = (value) => {
    setCarre({ ...carre, pensum: value });
  };

  const onChangeCiclos = (value) => {
    setCarre({ ...carre, ciclos: value });
  };

  const onChangeUniversidad = (value) => {
    setCarre({ ...carre, idUniversidad: value });
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
      'https://rest-server-dps-api.herokuapp.com/api/careers/' + item.uid,
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
    var updateCarrera = {
      nombre: carre.nombre,
      pensum: carre.pensum,
      ciclos: carre.ciclos,
      IdUniversidad: carre.idUniversidad,
    };
    const result = updateData(token, updateCarrera, item.uid);
  };

  const mainDelete = async () => {
    const token = await LogeoAdmin('Kaguya65@hotmail.com', 'Pablito25');
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
      //  body:JSON.stringify(informacion),
      //redirect: 'follow',
    };
    const resultado = await fetch(
      'https://rest-server-dps-api.herokuapp.com/api/careers/' + item.uid,
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

  let uniPicker = uni.map((data) => {
    return <Picker.Item label={data.nombre} value={data.uid} />;
  });

  //Alert update
  const UpdateButtonAlert = () =>{
            if(!validateData()){
          console.log("error correo");
          return;
        }
    else{ 
    Alert.alert('Actualizar Carrera', '¿Desea actualizar esta carrera?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: mainUpdate,
      },
    ]);
    }
  };

  //Alert delete
  const DeleteButtonAlert = () =>
    Alert.alert('Eliminar Carrera', '¿Desea eliminar esta carrera?', [
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
        value={carre.nombre}
      />
      <Text style={{color:'#F82006'}}>{nombreError}</Text>
      
      <TextInput
        placeholder={'Pensum'}
        onChangeText={(value) => onChangePensum(value)}
        style={styles.input}
        value={carre.pensum}
      />
      <Text style={{color:'#F82006'}}>{pensumError}</Text>

      <TextInput
        placeholder={'Ciclos'}
        onChangeText={(value) => onChangeCiclos(value)}
        style={styles.input}
        value={carre.ciclos}
      />
      <Text style={{color:'#F82006'}}>{ciclosError}</Text>

      <View>
        <Picker
          mode="dropdown"
          style={styles.input}
          selectedValue={cambio}
          onValueChange={(itemValue) => {
            setCambio(itemValue);
            onChangeUniversidad(itemValue);
          }}>
          {uniPicker}
        </Picker>
      </View>

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
