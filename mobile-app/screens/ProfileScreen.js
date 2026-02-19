import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
    const { logout, userInfo } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>
                        {userInfo?.name?.charAt(0).toUpperCase() || 'U'}
                    </Text>
                </View>
                <Text style={styles.name}>{userInfo?.name || 'User'}</Text>
                <Text style={styles.role}>{userInfo?.role?.toUpperCase() || 'EMPLOYEE'}</Text>
            </View>

            <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Email</Text>
                    <Text style={styles.infoValue}>{userInfo?.email || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Phone</Text>
                    <Text style={styles.infoValue}>{userInfo?.phone || 'N/A'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Status</Text>
                    <Text style={[styles.infoValue, { color: '#28a745', fontWeight: 'bold' }]}>
                        Approved
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
    header: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 4
    },
    avatarText: { fontSize: 40, color: '#fff', fontWeight: 'bold' },
    name: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    role: { fontSize: 14, color: '#666', marginTop: 5, letterSpacing: 1 },

    infoSection: { backgroundColor: '#fff', borderRadius: 15, padding: 20, elevation: 2, marginBottom: 30 },
    infoRow: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', paddingBottom: 10 },
    infoLabel: { fontSize: 14, color: '#999', marginBottom: 5 },
    infoValue: { fontSize: 16, color: '#333' },

    logoutButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 2
    },
    logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default ProfileScreen;
