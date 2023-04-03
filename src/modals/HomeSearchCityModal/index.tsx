import React, { useCallback, useState } from 'react';
import {
  Container,
  ContainerInput,
  Input,
  ContainerList,
  ItemList,
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { searchCity } from '../../services/location';
import {
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

export function HomeSearchCityModal({ handleClose, setSelectedCity }) {
  const [city, setCity] = useState('');
  const [searchResult, setSearchResult] = useState<SearchCityResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchCityAsyncCallback = useCallback(async () => {
    setIsLoading(true);

    const result = await searchCity(city);
    setSearchResult(result);

    setIsLoading(false);
  }, [city]);

  const searchStoresByCityCallback = useCallback(
    async (city: SearchCityResponse) => {
      setSelectedCity(city);
      handleClose();
    },

    [city],
  );

  return (
    <Container>
      <ContainerInput>
        <Input
          placeholder='Digite a cidade desejada...'
          autoFocus={true}
          autoCorrect={false}
          onChangeText={setCity}
        />
        <TouchableOpacity
          onPress={() => searchCityAsyncCallback()}
          style={{ padding: 8 }}
        >
          <Icon name='search' size={24} color='#2E8494' />
        </TouchableOpacity>
      </ContainerInput>
      <ContainerList>
        {isLoading && (
          <ActivityIndicator
            size='large'
            color='#BEBEBE'
            style={{ marginTop: 25 }}
          />
        )}
        <FlatList
          data={searchResult}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => searchStoresByCityCallback(item)}>
              <ItemList>
                {item.cityName}, {item.stateAcronym} - {item.countryAcronym}
              </ItemList>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.cityId.toString()}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: 'white' }} />
          )}
        />
      </ContainerList>
    </Container>
  );
}
