import React, { useState } from 'react';
import { Image } from 'react-native';
import { register } from '../../services/authentication';
import {
  Container,
  Input,
  RegisterButton,
  TextRegisterButton,
  LogoContainer,
} from './styles';

export default function RegisterScreen({ navigation, route }) {
  const { role } = route.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setPasswordConfirmation] = useState('');

  //TODO: utilizar o context

  return (
    <Container>
      <LogoContainer>
        <Image source={require('../../assets/logo.png')} />
      </LogoContainer>

      <Input placeholder='Name' autoCorrect={false} onChangeText={setName} />
      <Input placeholder='Email' autoCorrect={false} onChangeText={setEmail} />
      <Input
        placeholder='Password'
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Input
        placeholder='Confirm Password'
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={setPasswordConfirmation}
      />

      <RegisterButton
        onPress={() =>
          register({ name, email, password, confirmPassword, role })
        }
      >
        <TextRegisterButton>Criar conta</TextRegisterButton>
      </RegisterButton>
    </Container>
  );
}
