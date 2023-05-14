import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const ListOffersContainer = styled.View`
  top: 5%;
`;

export const OfferContainer = styled.View`
  background-color: #fff;
  margin-top: 2%;
  height: 90px;
  margin-horizontal: 10px;
  border-color: #2e8494;
  border-top-width: 1px;
  border-bottom-width: 1px;
`;

export const OfferTitle = styled.Text`
  font-size: 16px;
  margin-top: 1%;
  margin-bottom: 0.5%;
  font-weight: bold;
`;

export const OfferInfoWrapper = styled.View`
  flex-direction: row;
  margin-left: 2%;
`;

export const OfferLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const OfferText = styled.Text`
  font-size: 14px;
  margin-left: 1%;
`;

export const IconWrapper = styled.TouchableOpacity`
  left: 90%;
  bottom: 60%;
`;

export const ButtonNewOffer = styled.TouchableOpacity`
  align-self: center;
  background-color: #2e8494;
  top: 4%;
  width: 90%;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  border: 1px solid #7ed957;
`;

export const TextNewOffer = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
