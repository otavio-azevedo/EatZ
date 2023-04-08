import styled from 'styled-components/native';

export const LoginImageBackground = styled.ImageBackground`
  flex: 1;
  resize-mode: cover;
`;

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 50%;
`;

export const Input = styled.TextInput`
  background-color: #e5e4e2;
  width: 80%;
  margin-bottom: 3%;
  color: #222;
  font-size: 17px;
  border-radius: 7px;
  padding: 10px;
`;

export const RegisterButton = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: #2e8494;
  width: 90%;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  border: 1px solid #7ed957;
`;

export const TextRegisterButton = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
