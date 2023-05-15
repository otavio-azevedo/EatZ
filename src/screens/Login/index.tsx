import React, { useState, useEffect, useCallback } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
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
import { RoleEnum } from '../../types/roles/roleEnum';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, authenticated, userRole } = useAuthentication();

  useEffect(() => {
    if (authenticated) {
      navigation.navigate(
        userRole == RoleEnum.Consumer ? 'Home' : 'OfferRegister',
      );
    }
  }, [authenticated, userRole]);

  const signInAsync = async () => {
    setIsLoading(true);
    const result = await signIn(email, password);
    setIsLoading(false);
    if (!result) Alert.alert('Usuário ou senha inválidos');
  };

  return (
    <LoginImageBackground source={require('../../assets/login.png')}>
      <Container>
        {isLoading && <ActivityIndicator size='large' color='#BEBEBE' />}
        <Input
          placeholder='E-mail'
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder='Senha'
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <LoginButton onPress={() => signInAsync()}>
          <TextLoginButton>Acessar</TextLoginButton>
        </LoginButton>

        <TextRegisterButton>
          Não possui uma conta? Cadastre-se!
        </TextRegisterButton>

        <RegisterContainer>
          <RegisterContainerIcon
            onPress={() =>
              navigation.navigate('Register', { role: RoleEnum.Consumer })
            }
          >
            <Icon name='user' size={30} color='#fff' />
            <TextIcon>Usuário</TextIcon>
          </RegisterContainerIcon>

          <RegisterContainerIcon
            onPress={() =>
              navigation.navigate('Register', { role: RoleEnum.Company })
            }
          >
            <Icon name='building' size={28} color='#fff' />
            <TextIcon>Empresa</TextIcon>
          </RegisterContainerIcon>
        </RegisterContainer>
      </Container>
    </LoginImageBackground>
  );
}
