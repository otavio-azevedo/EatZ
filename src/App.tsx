import React, {useState, useEffect} from 'react';
import { 
   KeyboardAvoidingView,
   View,
   Image,
   TextInput,
   TouchableOpacity,
   Text,
   StyleSheet, 
   Animated,
   } from 'react-native';

export default function App(){

  const [offset] = useState(new Animated.ValueXY({x:0, y:95}))
  const [opacity] = useState(new Animated.Value(0))

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
      })
    ]).start();
  },[]);

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.logoContainer}>
        <Image
        source={require('./assets/logo.png')}
        />
      </View>

      <Animated.View 
        style={[styles.container,
          {
            opacity: opacity,
            transform: [{translateY: offset.y}]
          }]}
        >
        <TextInput 
          style={styles.input}
          placeholder='Email'
          autoCorrect={false}
          onChange={() => {}}
        />

        <TextInput 
          style={styles.input}
          placeholder='Password'
          autoCorrect={false}
          onChange={() => {}}
        />
      
      <TouchableOpacity style={styles.buttonLogin}>
        <Text style={styles.buttonLoginText}>Acessar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRegister}>
      <Text style={styles.buttonRegisterText}>Não possui uma conta? Cadastre-se!</Text>
      </TouchableOpacity>
      
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#FFF'
  },
  logoContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  container:{
    flex:1,
    alignItems:'center',
    width:'90%',
  },
  input:{
    backgroundColor:'#E5E4E2',
    width:'90%',
    marginBottom:15,
    color:'#222',
    fontSize:17,
    borderRadius:7,
    padding:10,
  },
  buttonLogin:{
    backgroundColor:'#FFD766',
    width:'90%',
    height:45,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:7,
  },
  buttonLoginText:{
    color:'#FFF',
    fontSize:18,
  },
  buttonRegister:{
    marginTop:10,
  },
  buttonRegisterText:{
    color:'#FFD766',
  },
})