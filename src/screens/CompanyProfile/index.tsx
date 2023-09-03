import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { getCitiesByState, getStatesByCountry } from '../../services/location';
import { createStore, getStoreByCurrentUser } from '../../services/stores';
import UnderConstruction from '../../components/UnderConstruction';

export default function CompanyProfileScreen({
  navigation
}) {
  const [hasStoreRegistered, setHasStoreRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [phone, setPhone] = useState('');

  const [selectedState, setSelectedState] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState<number>(0);
  const [zipCode, setZipCode] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [complement, setComplement] = useState('');
  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [logo, setLogo] = useState(null);

  const [states, setStatesPicker] = useState([]);
  const [cities, setCitiesPicker] = useState([]);

  const handleSubmit = async () => {
    setIsLoading(true);

    let logoBase64 = null;

    if (logo) {
      logoBase64 = await FileSystem.readAsStringAsync(logo, {
        encoding: FileSystem.EncodingType.Base64,
      });
    }

    const createStoreRequest: CreateStoreRequest = {
      name,
      documentNumber,
      phone,
      zipCode,
      neighborhood,
      complement,
      cityId: selectedCity,
      street,
      streetNumber: streetNumber ? parseInt(streetNumber) : null,
      description,
      logoImage: logoBase64,
    };

    const storeId = await createStore(createStoreRequest);
    setIsLoading(false);

    if (storeId) navigation.navigate('OfferRegister', { storeId: storeId });
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Precisamos de permissão para acessar a galeria de fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

  const getStatesByCountryCallback = useCallback(async () => {
    const states = await getStatesByCountry();
    setStatesPicker(states);
  }, []);

  const handleChangeState = async (stateId: number) => {
    setSelectedState(stateId);
    setIsLoading(true);
    await getCitiesByStateCallback(stateId);
    setIsLoading(false);
  };

  const getCitiesByStateCallback = useCallback(
    async (stateId: number) => {
      const cities = await getCitiesByState(stateId);
      setCitiesPicker(cities);
    },
    [selectedState],
  );

    useEffect(()=>{
      const getStoreByCurrentUserAsync = async () => {
        try {
          var response = await getStoreByCurrentUser();
          
          if (response)
            setHasStoreRegistered(true);
          else
            setHasStoreRegistered(false);
        } catch (error) {
          setHasStoreRegistered(false);
        }
      };
    
      getStoreByCurrentUserAsync();
      console.log(hasStoreRegistered);
    },[hasStoreRegistered])

  useEffect(() => {
    getStatesByCountryCallback();
  }, []);

  if (hasStoreRegistered) {
    return <UnderConstruction />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <Icon
              name='id-card-o'
              size={25}
              color='#2E8494'
              style={{ marginRight: 15 }}
            />
            <Text style={styles.title}>Dados de identificação</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder='Nome'
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder='CNPJ'
            value={documentNumber}
            onChangeText={setDocumentNumber}
          />

          <TextInput
            style={styles.input}
            placeholder='Telefone'
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            style={styles.input}
            placeholder='Descrição'
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.uploadContainer}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handlePickImage}
            >
              <Text style={styles.buttonText}>
                Clique aqui para fazer upload do seu logo
              </Text>
            </TouchableOpacity>

            {logo ? (
              <Image source={{ uri: logo }} style={styles.logo} />
            ) : (
              <Icon
                name='image'
                size={25}
                color='#BEBEBE'
                style={{ marginRight: 15 }}
              />
            )}
          </View>

          <View style={styles.divider} />
          <View style={styles.row}>
            <Icon
              name='map-marker'
              size={25}
              color='#2E8494'
              style={{ marginRight: 15 }}
            />
            <Text style={styles.title}>Endereço</Text>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedState}
              onValueChange={(itemValue) => handleChangeState(itemValue)}
              placeholder='UF'
              mode='dropdown'
              style={{ color: '#2E8494' }}
            >
              <Picker.Item label='Selecionar estado' value={null} />
              {states.map((state) => (
                <Picker.Item
                  key={state.id}
                  label={state.name}
                  value={state.id}
                />
              ))}
            </Picker>
          </View>
          {isLoading && <ActivityIndicator size='large' color='#BEBEBE' />}
          {!!selectedState && cities.length !== 0 && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCity}
                onValueChange={(itemValue) => setSelectedCity(itemValue)}
                placeholder='UF'
                mode='dropdown'
                style={{ color: '#2E8494' }}
              >
                <Picker.Item label='Selecionar cidade' value={null} />
                {cities.map((city) => (
                  <Picker.Item
                    key={city.id}
                    label={city.name}
                    value={city.id}
                  />
                ))}
              </Picker>
            </View>
          )}

          <TextInput
            style={styles.input}
            placeholder='CEP'
            value={zipCode}
            onChangeText={setZipCode}
          />

          <TextInput
            style={styles.input}
            placeholder='Bairro'
            value={neighborhood}
            onChangeText={setNeighborhood}
          />

          <View style={styles.row}>
            <TextInput
              style={styles.streetInput}
              placeholder='Rua'
              value={street}
              onChangeText={setStreet}
            />

            <TextInput
              keyboardType='numeric'
              style={styles.inputHalf}
              placeholder='Número'
              value={streetNumber?.toString()}
              onChangeText={setStreetNumber}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder='Complemento'
            value={complement}
            onChangeText={setComplement}
          />
        </View>
        <Button title='Avançar' onPress={handleSubmit} color='#7ED957' />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: '5%',
  },
  divider: {
    borderBottomColor: '#2E8494',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 20,
    borderStyle: 'dashed',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E8494',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#2E8494',
    borderRadius: 5,
  },
  streetInput: {
    height: 40,
    marginBottom: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    width: '75%',
    borderWidth: 1,
    borderColor: '#2E8494',
    borderRadius: 5,
  },
  inputHalf: {
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#2E8494',
    borderRadius: 5,
  },
  uploadContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadButton: {
    backgroundColor: '#fff',
    marginLeft: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2E8494',
    textDecorationLine: 'underline',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  pickerContainer: {
    marginTop: -15,
    marginBottom: 5,
  },
});
