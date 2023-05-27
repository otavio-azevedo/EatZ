import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuthentication } from '../../contexts/authentication';

const SignOutHeader = () => {
  const { signOut } = useAuthentication();
  return (
    <TouchableOpacity style={styles.button} onPress={signOut}>
      <Text style={styles.text}>Sair</Text>
      <Icon name='sign-out' size={20} color='#fff' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BEBEBE',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 40,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    marginRight: 5,
  },
});

export default SignOutHeader;
