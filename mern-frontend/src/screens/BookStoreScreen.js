import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import api from '../services/api'; // Axios configurado

const BookStoreScreen = ({ navigation }) => { // Recibe la prop navigation

    const [books, setBooks] = useState([]); // Estado para los libros
    
    // Función para obtener los libros
    const fetchBooks = async () => {
        try {
            // Realizar la petición GET al backend
            const response = await api.get('/books'); // Obtener los libros del backend
            // Guardar los libros en el estado
            setBooks(response.data); // Guardar los libros en el estado de la linea 7            
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo obtener los libros');
        }
    };

    // Función para reservar un libro
    const handleReservation = async (bookId) => {
        try {
            const userId = '6749ddf035ca9ba79afa407c'; // Reemplazar con un ID de usuario real o dinámico
            console.log('Datos enviados:', { book: bookId, user: userId }); // Registro para depuración
            const response = await api.post('/reservations', { book: bookId, user: userId });
            Alert.alert('Reserva exitosa', response.data.message || 'El libro ha sido reservado');
        } catch (error) {
            console.error('Error en la reserva:', error.response?.data || error.message);
            Alert.alert('Error', error.response?.data?.message || 'No se pudo reservar el libro');
        }
    };
    

    // Cargar los libros al cargar la pantalla
    useEffect(() => {
        fetchBooks();
    }, []);

        // Configuración del header
        useEffect(() => {
            navigation.setOptions({
                headerRight: () => (
                    <Button
                        title="Reservas"
                        onPress={() => navigation.navigate('Reservations')}
                        color="#007BFF" // Color opcional
                    />
                ),
            });
        }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tienda de Libros</Text>
            {books.map((book) => (
                <View key={book._id} style={styles.bookItem}>
                    <Text style={styles.bookTitle}>{book.titulo}</Text>
                    <Button title="Reservar" onPress={() => handleReservation(book._id)} />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    bookItem: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    
});

export default BookStoreScreen;