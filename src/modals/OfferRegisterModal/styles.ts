import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #eaf2f4;
  margin-top: 20%;
  margin-left: 1%;
  margin-right: 1%;
  height: 60%;
  width: 98%;
  border-radius: 20px;
  border: 1px solid #2e8494;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2%;
  margin-left: 4%;
  margin-bottom: 2%;
`;

export const ContainerHeaderText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #2e8494;
`;

export const ContainerInput = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  padding: 10px;
  height: 40px;
  width: 96%;
  margin-left: 2%;
  margin-top: 2%;
  text-color: #2e8494;
`;
export const Input = styled.TextInput`
  flex: 1;
  font-size: 14px;
`;

export const ContainerList = styled.SafeAreaView`
  height: 100%;
`;

export const ItemList = styled.Text`
  font-size: 14px;
  padding: 10px;
  font-weight: bold;
  color: #2e8494;
  text-align: center;
`;

export const ContainerButton = styled.TouchableOpacity`
  background-color: #fff;
  flex-direction: row;
  height: 10%;
  width: 100%;
  margin-top: 7%;
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
  width: 96%;
  margin-left: 2%;
  margin-top: 2%;
`;
