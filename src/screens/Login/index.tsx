import React, { useState, useEffect, useCallback } from 'react';
import { Animated, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Input,
  LoginButton,
  LoginImageBackground,
  RegisterContainer,
  RegisterContainerIcon,
  TextIcon,
  TextLoginButton,
  TextRegisterButton,
} from './styles';

import { useAuthentication } from '../../contexts/authentication';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, authenticated } = useAuthentication();

  useEffect(() => {
    if (authenticated) {
      navigation.navigate('Home');
    }
  }, [authenticated]);

  const signInAsync = useCallback(async () => {
    setIsLoading(true);
    const result = await signIn(email, password);
    setIsLoading(false);

    if (result) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Usuário ou senha inválidos');
    }
  }, [email, password, signIn]);

  return (
    <LoginImageBackground source={require('../../assets/login.png')}>
      <Container>
        {isLoading && <ActivityIndicator size='large' color='#BEBEBE' />}
        <Input
          placeholder='Email'
          autoCorrect={false}
          onChangeText={setEmail}
        />
        <Input
          placeholder='Senha'
          autoCorrect={false}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <LoginButton onPress={signInAsync}>
          <TextLoginButton>Acessar</TextLoginButton>
        </LoginButton>

        <TextRegisterButton>
          Não possui uma conta? Cadastre-se!
        </TextRegisterButton>

        <RegisterContainer>
          <RegisterContainerIcon
            onPress={() =>
              navigation.navigate('Register', { role: 'consumer' })
            }
          >
            <Icon name='user' size={30} color='#fff' />
            <TextIcon>Usuário</TextIcon>
          </RegisterContainerIcon>

          <RegisterContainerIcon
            onPress={() => navigation.navigate('Register', { role: 'company' })}
          >
            <Icon name='building' size={28} color='#fff' />
            <TextIcon>Empresa</TextIcon>
          </RegisterContainerIcon>
        </RegisterContainer>
      </Container>
    </LoginImageBackground>
  );
}
