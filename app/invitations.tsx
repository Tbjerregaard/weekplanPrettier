import React from 'react';
import { View, Text, ActivityIndicator, FlatList, Button, Alert } from 'react-native';
import { useInvitation } from '../hooks/useInvitations';

interface Invitation {
    id: number;
    title: string;
    description: string;
    date: string;
}

const InvitationsPage: React.FC<{userId: string}> = ({userId}) => {
    const { data: invitations, isLoading, isError, useRespondToInvitation } = useInvitation(userId);

    const handleResponse = (id: number, accepted: boolean) => {
        const action = accepted ? 'accept' : 'deny';
        Alert.alert(
            `Are you sure you want to ${action} this invitation?`,
            '',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'OK', 
                    onPress: () => useRespondToInvitation(id, accepted) 
                },
            ]
        );
    };

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading invitations...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View>
                <Text>Error loading invitations. Please try again later.</Text>
            </View>
        );
    }

    return (
        <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Invitations</Text>
            <FlatList
                data={invitations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text style={{ color: 'grey' }}>{new Date(item.date).toLocaleDateString()}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Button
                                title="Accept"
                                onPress={() => handleResponse(item.id, true)}
                                color="#28a745"
                            />
                            <Button
                                title="Deny"
                                onPress={() => handleResponse(item.id, false)}
                                color="#dc3545"
                                style={{ marginLeft: 10 }}
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text>No invitations found.</Text>}
            />
        </View>
    );
};

export default InvitationsPage;
