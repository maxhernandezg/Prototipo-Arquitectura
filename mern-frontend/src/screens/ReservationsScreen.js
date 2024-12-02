import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import api from '../services/api'; // Axios configurado

const ReservationsScreen = () => {
    const [reservations, setReservations] = useState([]);

    const fetchReservations = async () => {
        try {
            const response = await api.get('/reservations');
            setReservations(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudieron obtener las reservas');
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reservas</Text>
            {reservations.map((reservation) => (
                <View key={reservation._id} style={styles.reservationItem}>
                <Text>
                    Libro: {reservation.book?.titulo || 'Información no disponible'}
                </Text>
                <Text>Estado: {reservation.estadoReserva}</Text>
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
    reservationItem: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
});

export default ReservationsScreen;
