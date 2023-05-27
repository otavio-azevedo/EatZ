import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  View,
  Text,
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
  CardReviewContainer,
  ReviewRateText,
  CardReviewStarContainer,
} from './styles';

import { format, parseISO } from 'date-fns';
import { searchOffersByCity } from '../../services/offers';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CreateOrderModal } from '../../modals/CreateOrderModal';

export default function OffersCatalogScreen({ navigation, route }) {
  const cityId = route.params?.cityId ?? 4137;
  const [isLoading, setIsLoading] = useState(true);
  const [searchOffersResult, setSearchResult] = useState<
    SearchOffersByCityResponse[]
  >([]);

  const [createOrderModalVisible, setCreateOrderModalVisible] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    searchOffersByCityAsync(cityId);
    setIsLoading(false);
  }, [createOrderModalVisible]);

  useEffect(() => {
    searchOffersByCityCallback(cityId);
    setIsLoading(false);
  }, [cityId]);

  const searchOffersByCityCallback = useCallback(
    async (cityId: number) => searchOffersByCityAsync(cityId),
    [cityId],
  );

  const searchOffersByCityAsync = async (cityId: number) => {
    const offers = await searchOffersByCity(cityId);
    setSearchResult(offers);
  };

  function handleCreateOrderModal(item) {
    setSelectedOffer(item);
    setCreateOrderModalVisible(true);
  }

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
        renderItem={renderOfferItens(handleCreateOrderModal)}
        keyExtractor={(item) => item.offerId.toString()}
      />

      {selectedOffer && (
        <Modal
          visible={createOrderModalVisible}
          transparent={false}
          onRequestClose={() => setCreateOrderModalVisible(false)}
        >
          <CreateOrderModal
            navigation={navigation}
            handleClose={() => {
              setCreateOrderModalVisible(false);
            }}
            offer={selectedOffer}
          />
        </Modal>
      )}
    </Container>
  );
}

function renderOfferItens(handleCreateOrderModal: (item: any) => void) {
  return ({ item }) => (
    <TouchableOpacity onPress={() => handleCreateOrderModal(item)}>
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
          {item.quantityAvaible}x Combo(s) {MapTaste(item.taste)}(s)
        </CardTextOfferTitle>

        <CardTextPickUpDate>
          Retirada até {format(parseISO(item.expirationDate), 'dd/MM')}
        </CardTextPickUpDate>

        <CardReviewContainer>
          <ReviewRateText>{item.storeAverageRating}</ReviewRateText>
        </CardReviewContainer>
        <CardReviewStarContainer>
          <Icon name='star' size={16} color='gold' />
        </CardReviewStarContainer>

        <CardPriceContainer>
          <CardTextGrossUnitPrice>
            R${item.grossUnitPrice}
          </CardTextGrossUnitPrice>
          <CardTextNetUnitPrice>R${item.netUnitPrice}</CardTextNetUnitPrice>
        </CardPriceContainer>
      </CardContainer>
    </TouchableOpacity>
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
