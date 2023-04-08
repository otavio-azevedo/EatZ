import React, { useState, useEffect, useCallback } from 'react';
import { Image, Animated, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  AnimatedLoginContainer,
  Container,
  Input,
  LoginButton,
  LogoContainer,
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
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, authenticated } = useAuthentication();

  useEffect(() => {
    if (authenticated) {
      navigation.navigate('Home');
    }

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 15,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
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
    <Container>
      <LogoContainer>
        <Image source={require('../../assets/logo.png')} />
      </LogoContainer>

      <AnimatedLoginContainer
        style={{
          opacity: opacity,
          transform: [{ translateY: offset.y }],
        }}
      >
        {isLoading && (
          <ActivityIndicator
            size='large'
            color='#BEBEBE'
            style={{ marginBottom: 25 }}
          />
        )}
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
            onPress={() => navigation.navigate('Register', { role: 'user' })}
          >
            <Icon name='user' size={30} color='#f4e300' />
            <TextIcon>Usuário</TextIcon>
          </RegisterContainerIcon>

          <RegisterContainerIcon
            onPress={() => navigation.navigate('Register', { role: 'company' })}
          >
            <Icon name='building' size={28} color='#f4e300' />
            <TextIcon>Empresa</TextIcon>
          </RegisterContainerIcon>
        </RegisterContainer>
      </AnimatedLoginContainer>
    </Container>
  );
}
