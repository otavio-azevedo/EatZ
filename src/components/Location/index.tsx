import React,{useEffect, useState} from 'react';
import { Alert, StyleSheet, TouchableOpacity, View,Text } from 'react-native';
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import * as ExpoLocation from "expo-location";

const initialRegion = {
  latitude: -26.1772288,
  longitude: 133.4170119,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function Location() {

    const [region, setRegion] = useState<Region>();

    const getCurrentPosition = async () => {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
  
      if (status !== "granted") {
        Alert.alert("Ops!", "Permissão de acesso a localização negada.");
      }
  
      let {
        coords: { latitude, longitude },
      } = await ExpoLocation.getCurrentPositionAsync();
  
      setRegion({ latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
    };
  
    useEffect(() => {
      getCurrentPosition();
    }, []);
  
  return (
    <View style={styles.container}>
      <MapView
      style={styles.map}
      initialRegion={initialRegion}
      region={region}
    />
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button]}>
            <Text style={styles.textButton}>Use my current location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}>
            <Text style={styles.textButton}>Search for a city</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
  },
  buttonContainer:{
    marginTop: 10,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#20B2AA",
    paddingVertical: 12,
    borderRadius: 30,
    marginTop:15
},
textButton: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
    lineHeight: 26,
    fontWeight: "bold",
},
});