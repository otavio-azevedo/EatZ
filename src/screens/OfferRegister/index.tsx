import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, FlatList, Modal, ScrollView } from 'react-native';
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
} from './styles';

import Icon from 'react-native-vector-icons/FontAwesome';
import { format, parseISO } from 'date-fns';
import { useAuthentication } from '../../contexts/authentication';
import { deleteOfferById, searchOffersByStore } from '../../services/offers';
import { OfferRegisterModal } from '../../modals/OfferRegisterModal';

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
    //TODO: get store by admin id
    // fluxo para quando usuário PJ loga na aplicação após o primeiro cadastro
    //const { userId } = useAuthentication();
    if (storeId == '' && route.params == undefined) {
      setStoreId('2c5755aa-e9f3-403d-9d0d-c5f793b8f3f6');
    } else {
      setStoreId(route.params?.storeId);
    }

    searchOffersByStoreCallback(storeId);
    setIsLoading(false);
  }, [storeId, newOfferId]);

  const searchOffersByStoreCallback = useCallback(
    async (storeId: string) => {
      const offers = await searchOffersByStore(storeId);
      setSearchResult(offers);
    },

    [storeId],
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
        transparent={true}
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
              <OfferTitle>
                {item.quantity}x - {MapTaste(item.taste)}
              </OfferTitle>

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
                <Icon name='trash' size={30} color='#D11A2A' />
              </IconWrapper>
            </OfferContainer>
          )}
          keyExtractor={(item) => item.id.toString()}
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
