import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  padding: 10px;
  align-items: center;
  margin-bottom: 5%;
`;

export const CardContainer = styled.View`
  border-radius: 10px;
  background-color: #fff;
  margin-horizontal: 10px;
  margin-vertical: 5px;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  height: 80px;
`;

export const CardTitleContainer = styled.View`
  flex-direction: row;
`;

export const CardTextStoreName = styled.Text`
  font-size: 17px;
  margin-top: 3%;
  margin-left: 2%;
  font-weight: bold;
`;

export const CardTextPickUpDate = styled.Text`
  font-size: 14px;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-bottom: 0.5%;
`;

export const CardTextOfferTitle = styled.Text`
  font-size: 14px;
  font-style: italic;
  position: absolute;
  bottom: 0;
  left: 12%;
  margin-bottom: 0.5%;
`;

export const CardReviewStarContainer = styled.View`
  position: absolute;
  right: 2%;
  margin-top: 3%;
`;

export const CardReviewContainer = styled.View`
  position: absolute;
  right: 2%;
  margin-top: 2%;
`;

export const ReviewRateText = styled.Text`
  color: gold;
  font-size: 16px;
  font-weight: bold;
  margin-right: 5%;
`;

export const CardPriceContainer = styled.View`
  position: absolute;
  bottom: 0;
  right: 2%;
  margin-bottom: 1%;
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
