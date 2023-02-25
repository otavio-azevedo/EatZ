import { Animated } from 'react-native';
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

export const AnimatedLoginContainer = styled(Animated.View)`
  flex: 1;
  align-items: center;
  width: 90%;
`;

export const Input = styled.TextInput`
  background-color: #e5e4e2;
  width: 90%;
  margin-bottom: 15px;
  color: #222;
  font-size: 17px;
  border-radius: 7px;
  padding: 10px;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: #f4e300;
  width: 90%;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
`;

export const TextLoginButton = styled.Text`
  color: #000000;
  font-size: 18px;
`;

export const RegisterButton = styled.TouchableOpacity`
  margintop: 10px;
`;

export const TextRegisterButton = styled.Text`
  color: #ffd766;
`;
