import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useAuthentication } from '../../contexts/authentication';
import { register } from '../../services/authentication';
import { RoleEnum } from '../../types/roles/roleEnum';
import {
  Container,
  Input,
  RegisterButton,
  TextRegisterButton,
  LoginImageBackground,
} from './styles';
import { getApiErrors } from '../../services/@axios/getApiErrors';

export default function RegisterScreen({ navigation, route }) {
  const { role } = route.params;

  const { handleTokenResponse } = useAuthentication();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setPasswordConfirmation] = useState('');

  const registerAsync = useCallback(async () => {
    setIsLoading(true);
    try {
          const registerResult = await register({
            name,
            email,
            password,
            confirmPassword,
            role,
          });
          
          const signInResult = await handleTokenResponse(registerResult);
          setIsLoading(false);
      
          if (registerResult && signInResult) {
              navigation.navigate(
                  'Register',
                  role === RoleEnum.Company ? 'StoreRegister' : 'OffersCatalog',
                );
              } 
              else
                  Alert.alert('Falha ao criar conta, verifique os dados informados');

        } catch (error) {
          setIsLoading(false);
          const content = getApiErrors(error);
          Alert.alert(content);            
        }
  }, [name, email, password, confirmPassword, register, handleTokenResponse]);

  return (
    <LoginImageBackground source={require('../../assets/login.png')}>
      <Container>
        {isLoading && <ActivityIndicator size='large' color='#BEBEBE' />}
        <Input placeholder='Nome' autoCorrect={false} onChangeText={setName} />
        <Input
          placeholder='E-mail'
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
