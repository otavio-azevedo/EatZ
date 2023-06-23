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
  BackHeaderModal,
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { format, parseISO } from 'date-fns';

import { KeyboardAvoidingView, ScrollView, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CreateOrderRequest } from '../../types/orders/requests/createOrderRequest';
import { createOrder } from '../../services/orders';

export function CreateOrderModal({ navigation, handleClose, offer }) {
  const [quantitySelected, setQuantitySelected] = useState(1);

  const createOrderAsync = async () => {
    const order: CreateOrderRequest = {
      storeId: offer.storeId,
      offerId: offer.offerId,
      quantity: quantitySelected,
    };

    const orderId = await createOrder(order);

    if (orderId !== null) {
      Alert.alert(
        'Pedido reservado!',
        `Informe o Nº ${orderId} ao chegar no estabelecimento.`,
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('ConsumerOrdersScreen', {
                newOrderId: orderId,
              }),
          },
        ],
      );
    }
    handleClose();
  };

  const renderPickerItems = () => {
    const items = [];

    for (let i = 1; i <= offer.quantityAvaible; i++) {
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
            <BackHeaderModal onPress={() => handleClose()}>
              <Icon name='angle-down' size={30} color='#2E8494' />
            </BackHeaderModal>
            <Image
              source={{
                uri: `data:image/png;base64,${offer.storeLogoImage}`,
              }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 30,
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
            {offer.quantityAvaible}x Combo(s) {MapTaste(offer.taste)}(s)
          </OfferGeneralInfoText>

          <OfferGeneralInfoText>{offer.description}</OfferGeneralInfoText>

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
