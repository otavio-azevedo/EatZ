import React, { useCallback, useState } from 'react';
import {
  Container,
  ContainerInput,
  Input,
  ContainerHeaderText,
  ContainerHeader,
  ContainerButton,
  ButtonText,
  PickerContainer,
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TastesEnum } from '../../types/tastes';
import { createOffer } from '../../services/offers';

export function OfferRegisterModal({ handleClose, storeId, setNewOfferId }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [grossUnitPrice, setGrossUnitPrice] = useState<number>(0.0);
  const [netUnitPrice, setNetUnitPrice] = useState<number>(0.0);
  const [taste, setSelectedTaste] = useState<TastesEnum>(null);
  const [expirationDate, setExpirationDate] = useState('');

  const offer: CreateOfferRequest = {
    storeId,
    description,
    quantity,
    grossUnitPrice,
    netUnitPrice,
    taste,
    expirationDate,
  };

  const registerOfferCallback = useCallback(async () => {
    const offerId = await createOffer(offer);
    setNewOfferId(offerId);
    handleClose();
  }, [offer]);

  const handleMoneyValueChange = (setValue) => (value) => {
    const formattedValue = value.replace(/[^0-9]/g, '');
    setValue(formattedValue);
  };

  return (
    <Container>
      <KeyboardAvoidingView>
        <ScrollView>
          <ContainerHeader>
            <ContainerHeaderText>Cadastre a sua oferta</ContainerHeaderText>
          </ContainerHeader>

          <PickerContainer>
            <Picker
              selectedValue={taste}
              onValueChange={(itemValue) => setSelectedTaste(itemValue)}
              mode='dropdown'
              style={{ color: '#2E8494' }}
            >
              <Picker.Item
                label='Selecione a categoria da oferta'
                value={null}
              />

              {Object.keys(TastesEnum).map((key) => (
                <Picker.Item key={key} label={TastesEnum[key]} value={key} />
              ))}
            </Picker>
          </PickerContainer>

          <ContainerInput>
            <Input
              placeholder='Quantidade'
              autoCorrect={false}
              keyboardType='numeric'
              value={quantity}
              onChangeText={setQuantity}
            />
          </ContainerInput>

          <ContainerInput>
            <Input
              placeholder='Descrição da oferta'
              autoCorrect={false}
              value={description}
              onChangeText={setDescription}
            />
          </ContainerInput>

          <ContainerInput>
            <Input
              placeholder='Valor Unitário Original (R$)'
              autoCorrect={false}
              keyboardType='numeric'
              value={`R$ ${grossUnitPrice}`}
              onChangeText={handleMoneyValueChange(setGrossUnitPrice)}
            />
          </ContainerInput>

          <ContainerInput>
            <Input
              placeholder='Valor Unitário Promocional (R$)'
              autoCorrect={false}
              keyboardType='numeric'
              value={`R$ ${netUnitPrice}`}
              onChangeText={handleMoneyValueChange(setNetUnitPrice)}
            />
          </ContainerInput>

          <ContainerInput>
            <Input
              placeholder='Data de Vencimento (ex.: 2023-08-01)'
              autoCorrect={false}
              value={expirationDate}
              onChangeText={setExpirationDate}
            />
          </ContainerInput>

          <ContainerButton
            onPress={() => registerOfferCallback()}
            style={{ padding: 8 }}
          >
            <ButtonText>Finalizar</ButtonText>
            <Icon name='check' size={24} color='#2E8494' />
          </ContainerButton>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
