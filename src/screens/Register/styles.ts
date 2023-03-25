import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #000000;
`;

export const LogoContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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
  background-color: #f4e300;
  width: 80%;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  margin-bottom: 50%;
`;

export const TextRegisterButton = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: bold;
`;
