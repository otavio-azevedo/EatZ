import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #eaf2f4;
  margin-top: 20%;
  margin-left: 5%;
  margin-right: 5%;
  height: 90%;
  width: 90%;
  border-radius: 20px;
`;

export const BackHeaderModal = styled.TouchableOpacity`
  margin-left: 5%;
  margin-top: 5%;
`;

export const ContainerInput = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 20px;
  padding: 10px;
  height: 60px;
  width: 92%;
  margin-left: 4%;
  margin-top: 1%;
  text-color: #2e8494;
`;
export const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
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
