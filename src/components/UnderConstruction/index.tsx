import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UnderConstruction = () => {
  return (
    <View style={styles.container}>
      <Icon name='wrench' size={50} color='#333' />
      <Text style={styles.text}>Em construção...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '25%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default UnderConstruction;
