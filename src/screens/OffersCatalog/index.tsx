import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  CardContainer,
  CardTitleContainer,
  CardPriceContainer,
  CardTextGrossUnitPrice,
  CardTextNetUnitPrice,
  CardTextOfferTitle,
  CardTextPickUpDate,
  CardTextStoreName,
  Container,
} from './styles';

import { format, parseISO } from 'date-fns';
import { searchOffersByCity } from '../../services/offers';

export default function OffersCatalogScreen({ navigation, route }) {
  const { cityId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [searchOffersResult, setSearchResult] = useState<
    SearchOffersByCityResponse[]
  >([]);

  useEffect(() => {
    searchOffersByCityCallback(cityId);
    setIsLoading(false);
  }, [cityId]);

  const searchOffersByCityCallback = useCallback(
    async (cityId: number) => {
      const offers = await searchOffersByCity(cityId);
      setSearchResult(offers);
    },

    [cityId],
  );

  return (
    <Container>
      {isLoading && (
        <ActivityIndicator
          size='large'
          color='#BEBEBE'
          style={{ marginTop: 25 }}
        />
      )}
      <FlatList
        data={searchOffersResult}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => alert('Ir para página de detalhes da oferta')}
          >
            <CardContainer>
              <CardTitleContainer>
                <Image
                  source={{
                    uri: `data:image/png;base64,${item.storeLogoImage}`,
                  }}
                  style={{
                    marginLeft: 5,
                    marginTop: 5,
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                />
                <CardTextStoreName>{item.storeName}</CardTextStoreName>
              </CardTitleContainer>

              <CardTextOfferTitle>
                {item.quantity}x - {MapTaste(item.taste)}
              </CardTextOfferTitle>

              <CardTextPickUpDate>
                Retirada até {format(parseISO(item.pickUpDate), 'dd/MM HH:mm')}
              </CardTextPickUpDate>

              <CardPriceContainer>
                <CardTextGrossUnitPrice>
                  R${item.grossUnitPrice}
                </CardTextGrossUnitPrice>
                <CardTextNetUnitPrice>
                  R${item.netUnitPrice}
                </CardTextNetUnitPrice>
              </CardPriceContainer>
            </CardContainer>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.offerId.toString()}
      />
    </Container>
  );
}

function MapTaste(taste: string) {
  switch (taste) {
    case 'Mixed':
      return 'Misto';
    case 'Sweet':
      return 'Doce';
    case 'Salty':
      return 'Salgado';
  }
}
