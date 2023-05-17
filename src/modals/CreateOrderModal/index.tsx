import React, { useState } from 'react';
import {
  Container,
  ContainerHeader,
  ContainerButton,
  ButtonText,
  PickerContainer,
  CardTitleContainer,
  CardTitleTextStoreName,
  CardTitleReviewInfo,
  CardTitleReviewInfoText,
  OfferGeneralInfoText,
  CardPriceContainer,
  CardTextGrossUnitPrice,
  CardTextNetUnitPrice,
  Divider,
  SummaryOrderContainer,
  SummaryQuantityInfoText,
  SummaryTotalOrderText,
  SummaryContainer,
  SummaryTitleText,
  SummaryPaymentInfoText,
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format, parseISO } from 'date-fns';

import { KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CreateOrderRequest } from '../../types/orders/requests/createOrderRequest';
import { createOrder } from '../../services/orders';

export function CreateOrderModal({ handleClose, offer, setRefetchOffers }) {
  const [quantitySelected, setQuantitySelected] = useState(1);

  const createOrderAsync = async () => {
    const order: CreateOrderRequest = {
      storeId: offer.storeId,
      offerId: offer.offerId,
    };

    const orderId = await createOrder(order);

    if (orderId === null) {
      setRefetchOffers(false);
    } else {
      setRefetchOffers(true);
    }
    handleClose();
  };

  const renderPickerItems = () => {
    const items = [];

    for (let i = 1; i <= offer.quantity; i++) {
      items.push(
        <Picker.Item key={i} label={i.toString()} value={i.toString()} />,
      );
    }

    return items;
  };

  return (
    <Container>
      <KeyboardAvoidingView>
        <ScrollView>
          <ContainerHeader>
            <Image
              source={{
                uri: `data:image/png;base64,${offer.storeLogoImage}`,
              }}
              style={{
                width: '100%',
                height: 150,
              }}
            />
          </ContainerHeader>

          <CardTitleContainer>
            <Icon name='building' size={28} color='#2E8494' />
            <CardTitleTextStoreName>{offer.storeName}</CardTitleTextStoreName>

            <CardTitleReviewInfo>
              <CardTitleReviewInfoText>
                {offer.storeAverageRating}
              </CardTitleReviewInfoText>

              <Icon name='star' size={16} color='gold' />
            </CardTitleReviewInfo>
          </CardTitleContainer>

          <OfferGeneralInfoText>
            {offer.quantity}x Kit(s) {MapTaste(offer.taste)}(s)
          </OfferGeneralInfoText>

          <OfferGeneralInfoText>
            Retirada até {format(parseISO(offer.expirationDate), 'dd/MM')}
          </OfferGeneralInfoText>

          <CardPriceContainer>
            <CardTextGrossUnitPrice>
              R${offer.grossUnitPrice}
            </CardTextGrossUnitPrice>
            <CardTextNetUnitPrice>R${offer.netUnitPrice}</CardTextNetUnitPrice>
          </CardPriceContainer>

          <Divider />

          <SummaryOrderContainer>
            <SummaryContainer>
              <Icon name='cart-plus' size={30} color='#2E8494' />
              <SummaryTitleText>Pedido</SummaryTitleText>
            </SummaryContainer>
            <SummaryContainer>
              <SummaryQuantityInfoText>
                Quantas unidades você deseja?
              </SummaryQuantityInfoText>

              <PickerContainer>
                <Picker
                  selectedValue={quantitySelected}
                  onValueChange={(itemValue) => setQuantitySelected(itemValue)}
                  mode='dropdown'
                  style={{ color: '#2E8494' }}
                >
                  {renderPickerItems()}
                </Picker>
              </PickerContainer>
            </SummaryContainer>
            <SummaryContainer>
              <SummaryTotalOrderText>
                Total a pagar: R$ {quantitySelected * offer.netUnitPrice}
              </SummaryTotalOrderText>
            </SummaryContainer>
          </SummaryOrderContainer>

          <ContainerButton onPress={() => createOrderAsync()}>
            <ButtonText>Reservar</ButtonText>
          </ContainerButton>
          <SummaryPaymentInfoText>
            * O pagamento é realizado diretamente no estabelecimento mediante a
            apresentação do número do pedido.
          </SummaryPaymentInfoText>
        </ScrollView>
      </KeyboardAvoidingView>
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
