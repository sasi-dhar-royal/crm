import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, Linking } from 'react-native';
import api from '../services/api';

const LeadDetailScreen = ({ route, navigation }) => {
    const { leadId } = route.params;
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Edit States
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');
    const [followUpDate, setFollowUpDate] = useState('');

    useEffect(() => {
        fetchLeadDetails();
    }, []);

    const fetchLeadDetails = async () => {
        try {
            const { data } = await api.get(`/leads/${leadId}`);
            setLead(data);
            setStatus(data.status);
            setNotes(data.notes || '');
            setFollowUpDate(data.followUpDate ? data.followUpDate.split('T')[0] : ''); // Basic YYYY-MM-DD
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to fetch lead details');
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        setUpdating(true);
        try {
            await api.put(`/leads/${leadId}`, {
                status,
                notes,
                followUpDate
            });
            Alert.alert('Success', 'Lead updated successfully');
            fetchLeadDetails(); // Refresh
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update lead');
        } finally {
            setUpdating(false);
        }
    };

    const handleCall = () => {
        Linking.openURL(`tel:${lead.phone}`);
    };

    const handleWhatsApp = () => {
        // Use backend API to check if it's strictly message sending or opening app
        // Here we open the app for direct messaging
        let url = `whatsapp://send?phone=${lead.phone}`;
        Linking.openURL(url).catch(() => {
            Alert.alert('Error', 'WhatsApp not installed');
        });
    };

    if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#007bff" animating={true} /></View>;
    if (!lead) return null;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>{lead.name}</Text>
                <Text style={styles.phone}>{lead.phone}</Text>
                <Text style={styles.source}>Source: {lead.source}</Text>
            </View>

            <View style={styles.actionRow}>
                <TouchableOpacity style={[styles.actionButton, styles.callButton]} onPress={handleCall}>
                    <Text style={styles.actionText}>📞 Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.waButton]} onPress={handleWhatsApp}>
                    <Text style={styles.actionText}>💬 WhatsApp</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Status</Text>
                <View style={styles.pickerContainer}>
                    {['new', 'follow-up', 'converted', 'lost'].map((s) => (
                        <TouchableOpacity
                            key={s}
                            style={[styles.option, status === s && styles.selectedOption]}
                            onPress={() => setStatus(s)}
                        >
                            <Text style={[styles.optionText, status === s && styles.selectedOptionText]}>{s.toUpperCase()}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Follow-up Date (YYYY-MM-DD)</Text>
                <TextInput
                    style={styles.input}
                    value={followUpDate}
                    onChangeText={setFollowUpDate}
                    placeholder="2023-12-31"
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Notes</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    numberOfLines={4}
                />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate} disabled={updating}>
                {updating ? <ActivityIndicator color="#fff" animating={true} /> : <Text style={styles.saveButtonText}>Save Changes</Text>}
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#f8f9fa', flexGrow: 1 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { marginBottom: 20, backgroundColor: '#fff', padding: 20, borderRadius: 10, elevation: 2 },
    name: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    phone: { fontSize: 18, color: '#666', marginTop: 5 },
    source: { fontSize: 14, color: '#999', marginTop: 5, fontStyle: 'italic' },

    actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    actionButton: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center', marginHorizontal: 5, elevation: 2 },
    callButton: { backgroundColor: '#007bff' },
    waButton: { backgroundColor: '#25D366' },
    actionText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

    section: { marginBottom: 20 },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#444' },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, backgroundColor: '#fff', fontSize: 16 },
    textArea: { height: 100, textAlignVertical: 'top' },

    pickerContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    option: { paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: '#666', borderRadius: 20, marginRight: 10, marginBottom: 10, backgroundColor: '#fff' },
    selectedOption: { backgroundColor: '#007bff', borderColor: '#007bff' },
    optionText: { color: '#666', fontSize: 13 },
    selectedOptionText: { color: '#fff' },

    saveButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, elevation: 3 },
    saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default LeadDetailScreen;
