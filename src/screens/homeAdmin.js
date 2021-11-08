import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Ionicons,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
export default function home(props) {
  const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          height: 100,
          padding: 20,
          justifyContent: 'space-between',
        }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Calendar />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            flex: 0.5,
            height: 350,
            marginRight: 6,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'sans-serif-condensed',
              padding: 5,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Administrador
          </Text>
          <FontAwesome5 name="user" size={80} color="#3D56B2" />
          <Text
            style={{
              fontFamily: 'sans-serif-condensed',
              fontSize: 16,
              padding: 5,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Nombre
          </Text>
          <Text
            style={{
              fontFamily: 'sans-serif-condensed',
              fontSize: 16,
              padding: 5,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            Apellido
          </Text>
        </View>
        <View
          style={[
            styles.container,
            {
              // Try setting `flexDirection` to `"row"`.
              flexDirection: 'column',
              height: 350,
              borderRadius: 5,
            },
          ]}>
          <View style={{ flex: 0.3 }}>
            <Text
              style={{
                padding: 5,
                textAlign: 'center',
                fontWeight: 'bold',
                fontFamily: 'sans-serif-condensed',
                fontSize: 18,
              }}>
              Calendario
            </Text>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.textStyle}>Mostrar</Text>
            </Pressable>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text
              style={{
                fontFamily: 'sans-serif-condensed',
                padding: 5,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Recordatorios
            </Text>
            <FlatList
              style={{ padding: 10 }}
              data={[
                { key: '- Entrega de documetos' },
                { key: '- Pagar mensualidad' },
                { key: '- Semana 11' },
                { key: '- Revisar Aula Virtual' },
              ]}
              renderItem={({ item }) => (
                <Text
                  style={{ fontFamily: 'sans-serif-condensed', fontSize: 14 }}>
                  {item.key}
                </Text>
              )}
            />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'column', marginTop: 280 }}>
        <Pressable
          style={[styles.button1, styles.buttonOpen1]}
          onPress={() => navigation.navigate('students')}>
          <Text style={styles.textStyle1}>Ver Estudiantes</Text>
        </Pressable>
        <Pressable
          style={[styles.button1, styles.buttonOpen2]}
          onPress={() => navigation.navigate('universities')}>
          <Text style={styles.textStyle1}>Ver Universidades</Text>
        </Pressable>
        <Pressable
          style={[styles.button1, styles.buttonOpen3]}
          onPress={() => navigation.navigate('docs')}>
          <Text style={styles.textStyle1}>Entrega de Documentación</Text>
        </Pressable>
      </View>

      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    height: 190,
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  button1: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    height: 60,
  },
  buttonOpen: {
    backgroundColor: '#3D56B2',
    margin: 2,
  },
  buttonOpen1: {
    backgroundColor: '#F0A500',
    margin: 2,
  },
  buttonOpen2: {
    backgroundColor: '#00A19D',
    margin: 2,
  },
  buttonOpen3: {
    backgroundColor: '#6F69AC',
    margin: 2,
  },
  buttonOpen4: {
    backgroundColor: '#C37B89',
    margin: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
  },
  textStyle1: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
    fontSize: 20,
  },
  texto: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
