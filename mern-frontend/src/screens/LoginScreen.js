import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import api from '../services/api'; // Axios configurado

const LoginScreen = ({ navigation }) => { // Recibe la prop navigation

  // En resumen, useState te permite manejar el estado en componentes funcionales de React,
  // lo que antes solo era posible en componentes de clase.

  const [email, setEmail] = useState('');// Estado para el email
  const [password, setPassword] = useState(''); // Estado para la contraseña

  // Función para iniciar sesión
  const handleLogin = async () => {
    try {
      // Realizar la petición POST al backend
      const response = await api.post('/login', { email, password }); // Enviar email y contraseña

      // Si la respuesta es exitosa, redirigir al usuario a otra pantalla
      if (response.data.success) { 
        Alert.alert('Login exitoso', 'Bienvenido a la aplicación');
        // Redirigir a otra pantalla, por ejemplo, Dashboard
        navigation.navigate('Dashboard');

      // Si la respuesta no es exitosa, mostrar un mensaje de error
      } else {
        Alert.alert('Error', response.data.message || 'Credenciales incorrectas');
      }
    // Si hay un error, mostrar un mensaje de error
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo iniciar sesión, intenta de nuevo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default LoginScreen;
