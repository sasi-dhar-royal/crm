import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
    const { logout, userInfo } = React.useContext(AuthContext);
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        converted: 0,
        followUp: 0
    });

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        setLoading(true);
                        fetchData();
                    }}
                    style={{
                        marginRight: 15,
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 5,
                    }}
                >
                    <Text style={{ color: '#007bff', fontSize: 13, fontWeight: 'bold' }}>🔄 Refresh</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });
        return unsubscribe;
    }, [navigation]);

    const fetchData = async () => {
        try {
            const { data } = await api.get('/leads');
            setLeads(data);

            // Calculate stats
            const newStats = {
                total: data.length,
                converted: data.filter(l => l.status === 'converted').length,
                followUp: data.filter(l => l.status === 'follow-up').length
            };
            setStats(newStats);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const renderLeadItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('LeadDetail', { leadId: item._id })}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={[
                    styles.statusBadge,
                    item.status === 'new' ? styles.statusNew :
                        item.status === 'converted' ? styles.statusConverted :
                            styles.statusFollowUp
                ]}>
                    {item.status.toUpperCase()}
                </Text>
            </View>
            <Text style={styles.cardPhone}>📞 {item.phone}</Text>
            <Text style={styles.cardSource}>Source: {item.source}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007bff" animating={true} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Stats Overview */}
            <View style={styles.statsContainer}>
                <View style={[styles.statBox, { backgroundColor: '#e3f2fd' }]}>
                    <Text style={[styles.statNumber, { color: '#1976d2' }]}>{stats.total}</Text>
                    <Text style={styles.statLabel}>Total</Text>
                </View>
                <View style={[styles.statBox, { backgroundColor: '#e8f5e9' }]}>
                    <Text style={[styles.statNumber, { color: '#388e3c' }]}>{stats.converted}</Text>
                    <Text style={styles.statLabel}>Converted</Text>
                </View>
                <View style={[styles.statBox, { backgroundColor: '#fff3e0' }]}>
                    <Text style={[styles.statNumber, { color: '#f57c00' }]}>{stats.followUp}</Text>
                    <Text style={styles.statLabel}>Follow-up</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>My Leads</Text>

            <FlatList
                data={leads}
                keyExtractor={(item) => item._id}
                renderItem={renderLeadItem}
                contentContainerStyle={styles.listContainer}
                refreshing={loading}
                onRefresh={fetchData}
                ListEmptyComponent={<Text style={styles.emptyText}>No leads assigned yet.</Text>}
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreateLead')}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    welcomeText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    logoutText: { color: '#ff4444', fontWeight: '600', padding: 5 },

    statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
    statBox: { flex: 1, padding: 15, borderRadius: 12, marginHorizontal: 5, alignItems: 'center', elevation: 2 },
    statNumber: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
    statLabel: { fontSize: 12, color: '#666', fontWeight: '500' },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', indent: 5, color: '#333' },
    listContainer: { paddingBottom: 80 },

    card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 12, elevation: 2 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    statusBadge: { fontSize: 10, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12, overflow: 'hidden', fontWeight: 'bold', color: '#fff' },
    statusNew: { backgroundColor: '#2196f3' },
    statusConverted: { backgroundColor: '#4caf50' },
    statusFollowUp: { backgroundColor: '#ff9800' },

    cardPhone: { fontSize: 14, color: '#666', marginBottom: 4 },
    cardSource: { fontSize: 12, color: '#999', fontStyle: 'italic' },

    emptyText: { textAlign: 'center', color: '#999', marginTop: 50 },

    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#007bff',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6
    },
    fabText: { color: '#fff', fontSize: 32, lineHeight: 32 }
});

export default HomeScreen;
