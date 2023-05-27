import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #eaf2f4;
  margin-top: 15%;
  margin-left: 2%;
  margin-right: 2%;
  height: 75%;
  width: 96%;
  border-radius: 20px;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-vertical: 2%;
`;

export const ContainerHeader = styled.View`
  align-items: center;
  margin-bottom: 3%;
  text-align: center;
  justify-content: center;
`;

export const BackHeaderModal = styled.TouchableOpacity`
  margin-right: 10%;
`;

export const ContainerHeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;

export const ContainerButton = styled.TouchableOpacity`
  background-color: #fff;
  flex-direction: row;
  height: 45px;
  width: 96%;
  margin-horizontal: 2%;
  margin-top: 5%;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  border: 1px solid #7ed957;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #2e8494;
  margin-right: 2%;
`;

export const PickerContainer = styled.View`
  background-color: #fff;
  border-radius: 20px;
  height: 45px;
  width: 20%;
  margin-left: 5%;
`;

export const CardTitleContainer = styled.View`
  flex-direction: row;
  margin-bottom: 3%;
`;

export const CardTitleTextStoreName = styled.Text`
  font-size: 18px;
  margin-top: 1%;
  margin-left: 2%;
  font-weight: bold;
  color: #000;
`;

export const CardTitleReviewInfo = styled.Text`
  font-size: 16px;
  margin-top: 1%;
  position: absolute;
  right: 4%;
  color: #000;
`;

export const CardTitleReviewInfoText = styled.Text`
  font-size: 18px;
  margin-top: 3%;
  padding: 20px;
  margin-left: 2%;
  font-weight: bold;
  color: gold;
`;

export const OfferGeneralInfoText = styled.Text`
  font-size: 16px;
  margin-bottom: 1%;
  margin-left: 8%;
  font-weight: bold;
  color: #000;
`;

export const CardPriceContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 4%;
  margin-bottom: 34%;
`;
export const CardTextGrossUnitPrice = styled.Text`
  font-size: 14px;
  color: grey;
  text-decoration: line-through;
`;
export const CardTextNetUnitPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #69c94e;
`;

export const SummaryOrderContainer = styled.View`
  margin-top: 1%;
`;

export const SummaryQuantityInfoText = styled.Text`
  font-size: 16px;
  margin-bottom: 1%;
  margin-left: 9%;
  margin-top: 2%;
  font-weight: bold;
  color: #000;
`;

export const SummaryContainer = styled.View`
  flex-direction: row;
`;

export const SummaryTotalOrderText = styled.Text`
  font-size: 18px;
  margin-bottom: 1%;
  margin-left: 25%;
  margin-top: 2%;
  font-weight: bold;
  color: #2e8494;
`;

export const SummaryTitleText = styled.Text`
  font-size: 18px;
  margin-top: 1%;
  margin-left: 2%;
  margin-bottom: 3%;
  font-weight: bold;
  color: #000;
`;

export const SummaryPaymentInfoText = styled.Text`
  font-size: 12px;
  margin-left: 2%;
  margin-top: 2%;
  font-weight: bold;
  color: #69c94e;
`;
