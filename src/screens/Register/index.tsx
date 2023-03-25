import React from 'react';
import { Image } from 'react-native';
import {
  Container,
  Input,
  LoginButton,
  TextRegisterButton,
  LogoContainer,
} from './styles';

export default function RegisterScreen({ navigation, route }) {
  const { role } = route.params;
  //TODO: setar inputs e fazer requisição
  console.log(role);
  return (
    <Container>
      <LogoContainer>
        <Image source={require('../../assets/logo.png')} />
      </LogoContainer>

      <Input placeholder='Name' autoCorrect={false} onChange={() => {}} />
      <Input placeholder='Email' autoCorrect={false} onChange={() => {}} />
      <Input
        placeholder='Password'
        autoCorrect={false}
        secureTextEntry={true}
        onChange={() => {}}
      />
      <Input
        placeholder='Confirm Password'
        autoCorrect={false}
        secureTextEntry={true}
        onChange={() => {}}
      />

      <LoginButton>
        <TextRegisterButton>Criar conta</TextRegisterButton>
      </LoginButton>
    </Container>
  );
}
