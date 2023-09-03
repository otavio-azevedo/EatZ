import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {
  OfferContainer,
  OfferTitle,
  OfferLabel,
  Container,
  OfferText,
  OfferInfoWrapper,
  IconWrapper,
  ListOffersContainer,
  ButtonNewOffer,
  TextNewOffer,
  OfferTitleWrapper,
} from './styles';

import Icon from 'react-native-vector-icons/FontAwesome';
import { format, parseISO } from 'date-fns';
import { deleteOfferById, searchOffersByStore } from '../../services/offers';
import { OfferRegisterModal } from '../../modals/OfferRegisterModal';
import { getStoreByCurrentUser } from '../../services/stores';

export default function OfferRegisterScreen({ navigation, route }) {
  const [storeId, setStoreId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchOffersResult, setSearchResult] = useState<
    SearchOffersByStoreResponse[]
  >([]);

  const [registerOfferModalVisible, setRegisterOfferModalVisible] =
    useState(false);

  const [newOfferId, setNewOfferId] = useState('');

  useEffect(() => {
    if (storeId) {
      return;
    }

    if (storeId === '') {
      const getStoreByCurrentUserAsync = async () => {
        try {
          var response = await getStoreByCurrentUser();
          setStoreId(response.id);
        } catch (error) {
          if (error.response.data[0].message === 'Loja não encontrada.')
          console.log(error.response.data[0].message);
            navigation.navigate('CompanyProfile');
        }
      };

      getStoreByCurrentUserAsync();
    } else {
      setStoreId(route.params?.storeId);
    }

    async () => {
      const offers = await searchOffersByStore(storeId);
      setSearchResult(offers);
    };
  }, []);

  useEffect(() => {
    searchOffersByStoreCallback(storeId);
    setIsLoading(false);
  }, [storeId, newOfferId]);

  const searchOffersByStoreCallback = useCallback(
    async (storeId: string) => {
      const offers = await searchOffersByStore(storeId);
      setSearchResult(offers);
    },

    [storeId, newOfferId],
  );

  const handleDeleteOffer = async (offerId) => {
    await deleteOfferById(offerId);
    const offers = await searchOffersByStore(storeId);
    setSearchResult(offers);
  };

  return (
    <Container>
      <ButtonNewOffer onPress={() => setRegisterOfferModalVisible(true)}>
        <TextNewOffer>Cadastrar nova oferta</TextNewOffer>
      </ButtonNewOffer>

      <Modal
        visible={registerOfferModalVisible}
        transparent={false}
        onRequestClose={() => setRegisterOfferModalVisible(false)}
        animationType='slide'
      >
        <OfferRegisterModal
          handleClose={() => setRegisterOfferModalVisible(false)}
          storeId={storeId}
          setNewOfferId={(newOfferId: string) => setNewOfferId(newOfferId)}
        />
      </Modal>

      {isLoading && (
        <ActivityIndicator
          size='large'
          color='#BEBEBE'
          style={{ marginTop: 25 }}
        />
      )}

      <ListOffersContainer>
        <FlatList
          data={searchOffersResult}
          renderItem={({ item }) => (
            <OfferContainer>
              <OfferTitleWrapper>
                <Icon name='tag' size={20} color='#2E8494' />
                <OfferTitle>Combo {MapTaste(item.taste)}</OfferTitle>
              </OfferTitleWrapper>

              <OfferInfoWrapper>
                <OfferLabel>Qtd. Inicial:</OfferLabel>
                <OfferText>{item.initQuantity}</OfferText>
              </OfferInfoWrapper>

              <OfferInfoWrapper>
                <OfferLabel>Qtd. Disponível:</OfferLabel>
                <OfferText>{item.quantityAvaible}</OfferText>
              </OfferInfoWrapper>

              <OfferInfoWrapper>
                <OfferLabel>Vencimento:</OfferLabel>
                <OfferText>
                  {format(parseISO(item.expirationDate), 'dd/MM/yy HH:mm')}
                </OfferText>
              </OfferInfoWrapper>

              <OfferInfoWrapper>
                <OfferLabel>Valor Unitário Original:</OfferLabel>
                <OfferText>R${item.grossUnitPrice}</OfferText>
              </OfferInfoWrapper>

              <OfferInfoWrapper>
                <OfferLabel>Valor Unitário Promocional:</OfferLabel>
                <OfferText>R${item.netUnitPrice}</OfferText>
              </OfferInfoWrapper>

              <IconWrapper onPress={() => handleDeleteOffer(item.id)}>
                <Icon name='trash' size={36} color='#BEBEBE' />
              </IconWrapper>
            </OfferContainer>
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={ListEmptyComponent}
        />
      </ListOffersContainer>
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

const ListEmptyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nenhuma oferta cadastrada</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  text: {
    color: '#BEBEBE',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
