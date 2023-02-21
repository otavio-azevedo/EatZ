import React, { useState, useEffect } from 'react';
import { Image, Animated } from 'react-native';
import {
    AnimatedLoginContainer,
    Container,
    Input,
    LoginButton,
    LogoContainer,
    RegisterButton,
    TextLoginButton,
    TextRegisterButton,
} from './styles';

export default function LoginScreen() {
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
                <Input placeholder="Email"
                    autoCorrect={false} onChange={() => { }} />

                <Input placeholder="Password" autoCorrect={false} onChange={() => { }} />

                <LoginButton>
                    <TextLoginButton>Acessar</TextLoginButton>
                </LoginButton>

                <RegisterButton>
                    <TextRegisterButton>
                        Não possui uma conta? Cadastre-se!
                    </TextRegisterButton>
                </RegisterButton>
            </AnimatedLoginContainer>
        </Container>
    );
}