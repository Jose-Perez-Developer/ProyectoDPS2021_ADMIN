//import liraries
import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// create a component
const Get = ({ navigation }) => {
  const [carre, setCarre] = useState();

  const getUniData = async () => {
    try {
      let response = await fetch('https://rest-server-dps-api.herokuapp.com/api/careers?desde=0&limite=10');
      let json = await response.json();
      setCarre(json.Careers);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    getUniData(); 
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('Detail', {
        item: item
      })}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            padding: 5,
          }}>
          <Text style={{ fontWeight: 'bold' }}>{item.nombre}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={carre}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Get;
