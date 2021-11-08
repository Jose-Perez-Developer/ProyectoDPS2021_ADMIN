import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import Constants from 'expo-constants';
import RNPickerSelect from 'react-native-picker-select';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Post({ navigation }) {

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

  //codigo agregar carrera
  const [carre, setCarre] = useState({
    nombre: '',
    pensum: '',
    ciclos: '',
    idUniversidad: '',
  });

  const [loading, setLoading] = useState(false);

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
      'https://rest-server-dps-api.herokuapp.com/api/careers',
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

  const [refreshPage, setRefreshPage] = useState('');
  const main = async () => {
    const token = await LogeoAdmin('Kaguya65@hotmail.com', 'Pablito25');
    var nuevaCarrera = {
      nombre: carre.nombre,
      pensum: carre.pensum,
      ciclos: carre.ciclos,
      IdUniversidad: carre.idUniversidad,
    };
    const result = saveData(token, nuevaCarrera);
    console.log(result);
  };

  //Alert
  const createTwoButtonAlert = () =>{    
    if(!validateData()){
          console.log("error correo");
          return;
        }
    else{
    Alert.alert('Ingreso de Carrera', '¿Desea agregar esta carrera?', [
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

  let uniPicker = uni.map((data) => {
    return <Picker.Item label={data.nombre} value={data.uid} />;
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Nombre'}
        onChangeText={(value) => onChangeNombre(value)}
        style={styles.input}
      />
      <Text style={{color:'#F82006'}}>{nombreError}</Text>

      <TextInput
        placeholder={'Pensum'}
        onChangeText={(value) => onChangePensum(value)}
        style={styles.input}
      />
      <Text style={{color:'#F82006'}}>{pensumError}</Text>

      <TextInput
        placeholder={'Ciclos'}
        onChangeText={(value) => onChangeCiclos(value)}
        style={styles.input}
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

      <TouchableOpacity onPress={createTwoButtonAlert}>
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
