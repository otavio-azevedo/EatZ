import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 75%;
`;

export const LoginImageBackground = styled.ImageBackground`
  flex: 1;
  resize-mode: cover;
`;

export const Input = styled.TextInput`
  background-color: #e5e4e2;
  width: 80%;
  margin-bottom: 15px;
  color: #222;
  font-size: 17px;
  border-radius: 7px;
  padding: 10px;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: #2e8494;
  width: 90%;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  border: 1px solid #7ed957;
`;

export const TextLoginButton = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const TextRegisterButton = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
`;

export const RegisterContainer = styled.View`
  margin-top: 10%;
  flex-direction: row;
`;

export const RegisterContainerIcon = styled.TouchableOpacity`
  margin: 0 50px;
  width: 20%;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
`;

export const TextIcon = styled.Text`
  margin-top: 5px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
