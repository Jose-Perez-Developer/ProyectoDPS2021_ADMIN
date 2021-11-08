import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Picker,
  Alert
} from 'react-native';
import Constants from 'expo-constants';
import { MaskedTextInput} from "react-native-mask-text";

export default function Post({navigation}) {
  
   //// validaciones
 const [nombreError,setErrorNombre]=useState("");
 const [apellidoError,setErrorApellido]=useState("");
 const [carnetError,setErrorCarnet]=useState("");
 const [edadError,setErrorEdad]=useState("");
 const [fechaError,setErrorFecha]=useState("");
 const [direccionError,setErrorDireccion]=useState("");
 const [emailError,setErrorEmail]=useState("");
 const [telefonoError,setErrorTelefono]=useState("");


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
        setErrorApellido("")
        setErrorCarnet("");
        setErrorEdad("");
        setErrorFecha("");

        let isValid = true

        //validacion nombre
        if (!user.nombre.trim()) {
          setErrorNombre("Ingrese nombre de becario.")
            isValid = false

        }
        else if(!isNaN(user.nombre)){
          setErrorNombre("Ingrese un nombre valido")
            isValid = false          
        }

        //validacion apellido
        if (!user.apellido.trim()) {
          setErrorApellido("Ingrese apellido de becario.")
            isValid = false

        }
        else if(!isNaN(user.apellido)){
          setErrorApellido("Ingrese un apellido valido")
            isValid = false          
        }

        //validacion direccion
        if (!user.direccion.trim()) {
          setErrorDireccion("Ingrese direccion de casa.")
            isValid = false
        }

        //validacion carnet
        if (!user.carnet.trim()) {
          setErrorCarnet("Ingrese numero de carnet.")
            isValid = false
        }

        //validacion fecha
        if (!user.fechaNacimiento.trim()) {
          setErrorFecha("Ingrese fecha de nacimiento")
            isValid = false
        }

        //validacion de correo
        if (!user.correo.trim()) {
          setErrorEmail("Ingrese correo personal.")
            isValid = false
        }
        else if(!validateEmail(user.correo)) {
            setErrorEmail("Debes de ingresar un email válido.")
            isValid = false
        }

        //validacion numero de telefono
        if (!user.telefono.trim()) {
          setErrorTelefono("Ingrese numero telefonico.")
            isValid = false        
        }
        else if(isNaN(user.telefono)){
          setErrorTelefono("Debe ingresar un numero de teleno valido.")
            isValid = false
        }

        //validacion edad
        if (!user.edad.trim()) {
          setErrorEdad("Ingrese su edad.")
            isValid = false        
        }
        else if(isNaN(user.edad)){
          setErrorEdad("Debe ingresar una edad valido.")
            isValid = false
        }
        else if(user.edad < 16){
            setErrorEdad("Debe ingresar una edad valido.")
            isValid = false
        }

        //Retornamos el valor booleano
        return isValid
}
 //// fin de validaciones


  
  
  //codigo para agregar select

  const [uni, setUni] = useState([]);
  const [carre, setCarre] = useState([]);
  const [cambio, setCambio] = useState();
  const [cambio1, setCambio1] = useState();

  //select universidad
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

  let uniPicker = uni.map((data) => {
    return <Picker.Item label={data.nombre} value={data.uid} />;
  });

  //select carrera
  const getUniData1 = async () => {
    try {
      let response = await fetch(
        'https://rest-server-dps-api.herokuapp.com/api/careers?desde=0&limite=10'
      );
      let json = await response.json();
      setCarre(json.Careers);
    } catch (error) {
      console.error(error);
    }
  };
  let uniPicker2 = carre.map((data) => {
    return <Picker.Item label={data.nombre} value={data.uid} />;
  });

  useState(() => {
    getUniData();
    getUniData1();
  }, []);
  //fin de codigo agregar select

  //Codigo para Agregar nuevo estudiante
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    carnet: '',
    edad: '',
    fechaNacimiento: '',
    direccion: '',
    correo: '',
    telefono: '',
    idCarrera: '',
    idUniversidad: '',
  });

  const [loading, setLoading] = useState(false);

  const onChangeNombre = (value) => {
    setUser({ ...user, nombre: value });
  };

  const onChangeApellido = (value) => {
    setUser({ ...user, apellido: value });
  };

  const onChangeCarnet = (value) => {
    setUser({ ...user, carnet: value });
  };

  const onChangeEdad = (value) => {
    setUser({ ...user, edad: value });
  };

  const onChangeDireccion = (value) => {
    setUser({ ...user, direccion: value });
  };

  const onChangeCorreo = (value) => {
    setUser({ ...user, correo: value });
  };

  const onChangeTelefono = (value) => {
    setUser({ ...user, telefono: value });
  };

  const onChangefecha = (value) => {
    setUser({ ...user, fechaNacimiento: value });
  };

  const onChangeCarrera = (value) => {
    setUser({ ...user, idCarrera: value });
  };

  const onChangeUniversidad = (value) => {
    setUser({ ...user, idUniversidad: value });
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
      'https://rest-server-dps-api.herokuapp.com/Api/scholars',
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
    var nuevoEstudiante = {
      nombre: user.nombre,
      apellido: user.apellido,
      carnet: user.carnet,
      password: 'polloFrito54',
      edad: user.edad,
      fechaNacimiento: user.fechaNacimiento,
      direccion: user.direccion,
      correo: user.correo,
      telefono: user.telefono,
      IdCarrera: user.idCarrera,
      IdUniversidad: user.idUniversidad,
    };
    const result = saveData(token, nuevoEstudiante);
    console.log(result);
  };

  //Alert
  const InsertStudent = () =>{
    if(!validateData()){
          console.log("error correo");
          return;
        }
    else{
          console.log("pasa vaidaciones");
    Alert.alert('Ingreso de Estudiante', '¿Desea agregar este estudiante?', [
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
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          placeholder={'Nombre'}
          onChangeText={(value) => onChangeNombre(value)}
          style={styles.input}
        />
      <Text style={{color:'#F82006'}}>{nombreError}</Text>

        <TextInput
          placeholder={'Apellido'}
          onChangeText={(value) => onChangeApellido(value)}
          style={styles.input}
        />
      <Text style={{color:'#F82006'}}>{apellidoError}</Text>

        <TextInput
          placeholder={'Carnet'}
          onChangeText={(value) => onChangeCarnet(value)}
          style={styles.input}
        />
      <Text style={{color:'#F82006'}}>{carnetError}</Text>

        <MaskedTextInput
          placeholder={'Edad'}
          onChangeText={(value) => onChangeEdad(value)}
          style={styles.input}
          mask="99"
        />
      <Text style={{color:'#F82006'}}>{edadError}</Text>

        <MaskedTextInput
          placeholder={'Fecha de nacimiento'}
          onChangeText={(value) => onChangefecha(value)}
          style={styles.input}
        mask="99/99/9999"
        />
      <Text style={{color:'#F82006'}}>{fechaError}</Text>

        <TextInput
          placeholder={'Direccion'}
          onChangeText={(value) => onChangeDireccion(value)}
          style={styles.input}
        />
        <Text style={{color:'#F82006'}}>{direccionError}</Text>

        <TextInput
          placeholder={'Correo electronico'}
          onChangeText={(value) => onChangeCorreo(value)}
          style={styles.input}
        />
      <Text style={{color:'#F82006'}}>{emailError}</Text>

      <MaskedTextInput
        placeholder={'Numero de telefono'}
        onChangeText={(value) => onChangeTelefono(value)}
        style={styles.input}
        mask="99999999"
      />
      <Text style={{color:'#F82006'}}>{telefonoError}</Text>

        <View>
          <Picker
            mode="dropdown"
            style={styles.input}
            selectedValue={cambio1}
            onValueChange={(itemValue) => {
              setCambio1(itemValue);
              onChangeCarrera(itemValue);
            }}>
            {uniPicker2}
          </Picker>
        </View>

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

        <TouchableOpacity onPress={InsertStudent}>
          <View style={{ backgroundColor: '#09009B', padding: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              {loading ? 'Enviando...' : 'Enviar'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
