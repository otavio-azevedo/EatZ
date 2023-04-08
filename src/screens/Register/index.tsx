import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { register } from '../../services/authentication';
import {
  Container,
  Input,
  RegisterButton,
  TextRegisterButton,
  LoginImageBackground,
} from './styles';

export default function RegisterScreen({ navigation, route }) {
  const { role } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setPasswordConfirmation] = useState('');

  const registerAsync = useCallback(async () => {
    setIsLoading(true);
    const result = await register({
      name,
      email,
      password,
      confirmPassword,
      role,
    });
    setIsLoading(false);

    if (result) {
      // navigation.navigate('StoreRegister');
      console.log('navigation.navigate');
    } else {
      Alert.alert('Falha ao criar conta, verifique os dados informados');
    }
  }, [name, email, password, confirmPassword, register]);

  return (
    <LoginImageBackground source={require('../../assets/login.png')}>
      <Container>
        {isLoading && <ActivityIndicator size='large' color='#BEBEBE' />}
        <Input placeholder='Nome' autoCorrect={false} onChangeText={setName} />
        <Input
          placeholder='Email'
          autoCorrect={false}
          onChangeText={setEmail}
        />
        <Input
          placeholder='Senha'
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <Input
          placeholder='Confirmação de senha'
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={setPasswordConfirmation}
        />

        <RegisterButton onPress={registerAsync}>
          <TextRegisterButton>Criar conta</TextRegisterButton>
        </RegisterButton>
      </Container>
    </LoginImageBackground>
  );
}
