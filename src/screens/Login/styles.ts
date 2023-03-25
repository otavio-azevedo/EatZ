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
  font-weight: bold;
`;

export const TextRegisterButton = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  color: #ffd766;
`;

export const RegisterContainer = styled.View`
  margin-top: 25px;
  margin-bottom: 10px;
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
  color: #f4e300;
  font-size: 16px;
  font-weight: bold;
`;
