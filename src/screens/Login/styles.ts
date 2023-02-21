import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: #000000;
`;

export const LogoContainer = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
`;

export const AnimatedLoginContainer = styled(Animated.View)`
  flex: 1;
  alignItems: center;
  width: 90%;
`;

export const Input = styled.TextInput`
  backgroundColor: #e5e4e2;
  width: 90%;
  marginBottom: 15px;
  color: #222;
  fontSize: 17px;
  borderRadius: 7px;
  padding: 10px;
`;

export const LoginButton = styled.TouchableOpacity`
  backgroundColor: #f4e300;
  width: 90%;
  height: 45px;
  alignItems: center;
  justifyContent: center;
  borderradius: 7px;
`;

export const TextLoginButton = styled.Text`
  color: #000000;
  fontSize: 18px;
`;

export const RegisterButton = styled.TouchableOpacity`
  marginTop: 10px;
`;

export const TextRegisterButton = styled.Text`
  color: #ffd766;
`;