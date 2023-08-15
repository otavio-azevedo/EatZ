import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

import { styles } from './styles';
import { HomeSearchCityModal } from '../../modals/HomeSearchCityModal';
import { searchStoresByCity } from '../../services/stores';

interface Region {
  latitude: number;
  longitude: number;
}

const initialRegion = {
  latitude: -29.6842614,
  longitude: -51.1346826,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState<Region | null>(null);
  const [searchCityModalVisible, setSearchCityModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState<SearchCityResponse>({
    cityId: 4137,
    cityName: 'Novo Hamburgo',
    latitude: initialRegion.latitude,
    longitude: initialRegion.longitude,
    stateAcronym: 'RS',
    countryAcronym: 'BR',
  });
  const [stores, setStores] = useState<SearchStoresByCityResponse[]>([]);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentLocation = await getCurrentPositionAsync();
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      searchStoresByCityCallback(selectedCity.cityId);
      setLocation({
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
      });
    }
  }, [selectedCity]);

  const searchStoresByCityCallback = useCallback(
    async (cityId: number) => {
      const stores = await searchStoresByCity(cityId);
      setStores(stores);
    },

    [selectedCity],
  );

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        region={{
          latitude: location?.latitude,
          longitude: location?.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location?.latitude,
              longitude: location?.longitude,
            }}
          />
        )}
        {stores.map((store) => (
          <Marker
            key={store.storeId}
            coordinate={{
              latitude: store.latitude,
              longitude: store.longitude,
            }}
          >
            <CustomMarker />
          </Marker>
        ))}
      </MapView>

      <Modal
        visible={searchCityModalVisible}
        transparent={true}
        onRequestClose={() => setSearchCityModalVisible(false)}
        animationType='slide'
      >
        <HomeSearchCityModal
          handleClose={() => setSearchCityModalVisible(false)}
          setSelectedCity={(selectedCity: SearchCityResponse) =>
            setSelectedCity(selectedCity)
          }
        />
      </Modal>

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: '#ccc',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSearchCityModalVisible(true)}
        >
          <Text style={styles.textButton}>Buscar cidade</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonGoList}
          onPress={() =>
            navigation.navigate('OffersCatalog', {
              cityId: selectedCity.cityId,
            })
          }
        >
          <Text style={styles.textButtonGoList}>
            Ir para listagem de ofertas!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CustomMarker() {
  return (
    <View style={styles.customMarker}>
      <Text style={styles.customMarkerText}>E</Text>
    </View>
  );
}
