import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const CreateLeadScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [source, setSource] = useState('manual');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const { userToken, userInfo } = useContext(AuthContext);

    const handleCreateLead = async () => {
        if (!name || !phone) {
            Alert.alert('Error', 'Name and Phone are required');
            return;
        }

        setLoading(true);
        try {
            const leadData = {
                name,
                phone,
                email,
                source,
                notes,
                status: 'new'
            };

            // If employee, auto-assign to themselves
            if (userInfo?.role === 'employee') {
                leadData.assignedTo = userInfo._id || userInfo.id;
                console.log('Auto-assigning to employee:', leadData.assignedTo);
            }

            console.log('Creating lead with data:', leadData);

            await api.post('/leads', leadData);
            Alert.alert('Success', 'Lead created successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Create lead error:', error);
            console.error('Error response:', error.response?.data);
            Alert.alert('Error', error.response?.data?.message || 'Failed to create lead');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Name *</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter Name" />

            <Text style={styles.label}>Phone *</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Enter Phone" />

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Enter Email" />

            <Text style={styles.label}>Source</Text>
            <View style={styles.pickerContainer}>
                {['manual', 'social', 'referral', 'other'].map((s) => (
                    <TouchableOpacity
                        key={s}
                        style={[styles.option, source === s && styles.selectedOption]}
                        onPress={() => setSource(s)}
                    >
                        <Text style={[styles.optionText, source === s && styles.selectedOptionText]}>{s.toUpperCase()}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Notes</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={4}
                placeholder="Enter any notes..."
            />

            <TouchableOpacity style={styles.button} onPress={handleCreateLead} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" animating={true} /> : <Text style={styles.buttonText}>Create Lead</Text>}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#333' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
    textArea: { height: 100, textAlignVertical: 'top' },
    pickerContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15 },
    option: { paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: '#007bff', borderRadius: 20, marginRight: 10, marginBottom: 10 },
    selectedOption: { backgroundColor: '#007bff' },
    optionText: { color: '#007bff', fontSize: 14 },
    selectedOptionText: { color: '#fff' },
    button: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default CreateLeadScreen;
