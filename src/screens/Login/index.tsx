import React, { useState, useEffect } from 'react';
import { Image, Animated } from 'react-native';
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

export default function LoginScreen({ navigation }) {
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
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
  }, []);

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
        <Input placeholder='Email' autoCorrect={false} onChange={() => {}} />

        <Input placeholder='Senha' autoCorrect={false} onChange={() => {}} />

        <LoginButton>
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
