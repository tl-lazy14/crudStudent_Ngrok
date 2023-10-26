import React, { useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ScreenNavigationProp, studentInfo } from '../../Routes';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ListStudentScreen = () => {

    const navigation = useNavigation<ScreenNavigationProp>();

    const [students, setStudents] = useState([]);

    const getListStudents = async () => {
        try {
          const response = await axios.get('https://33d0-171-254-9-139.ngrok-free.app/api/students'); // url using ngrok
          setStudents(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
    };

    const deleteStudent = async (id: number) => {
        try {
            await axios.delete(`https://33d0-171-254-9-139.ngrok-free.app/api/students/${id.toString()}`); // url using ngrok
            getListStudents();
        } catch (err) {
            console.error('Error:', err);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
          getListStudents();
        }, [])
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addStudentButton} onPress={() => {navigation.navigate('AddStudent');}}>
                <Text style={styles.addButtonText}>
                    <Text style={styles.plusIcon}>+</Text> Add Student
                </Text>
            </TouchableOpacity>
            <FlatList
                data={students as studentInfo[]}
                keyExtractor={(item) => item.idPrimary.toString()}
                renderItem={({ item }) => (
                    <View style={styles.studentElements}>
                        <View style={styles.infoStudent}>
                            <View style={styles.rowInfo}>
                                <Text style={styles.label}>Id: </Text>
                                <Text style={styles.infoValue}>{item.idPrimary}</Text>
                            </View>
                            <View style={styles.rowInfo}>
                                <Text style={styles.label}>Name: </Text>
                                <Text style={styles.infoValue}>{item.name}</Text>
                            </View>
                            <View style={styles.rowInfo}>
                                <Text style={styles.label}>Address: </Text>
                                <Text style={styles.infoValue}>{item.addr}</Text>
                            </View>
                            <View style={styles.rowInfo}>
                                <Text style={styles.label}>Class: </Text>
                                <Text style={styles.infoValue}>{item.studentClass}</Text>
                            </View>
                            <View style={styles.rowInfo}>
                                <Text style={styles.label}>GPA: </Text>
                                <Text style={styles.infoValue}>{item.gpa}</Text>
                            </View>
                        </View>
                        <View style={styles.actionButton}>
                            <TouchableOpacity style={styles.editButton} onPress={() => {navigation.navigate('UpdateInfoStudent', {
                                idPrimary: item.idPrimary,
                                name: item.name,
                                addr: item.addr,
                                studentClass: item.studentClass,
                                gpa: item.gpa,
                            });}}>
                                <Text style={styles.actionText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => {deleteStudent(item.idPrimary);}}>
                                <Text style={styles.actionText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#e1e2eb',
    },
    addStudentButton: {
        backgroundColor: '#191778',
        paddingHorizontal: 20,
        paddingTop: 5,
        paddingBottom: 10,
        borderRadius: 16,
        marginTop: 30,
        width: 157,
        marginLeft: 215,
        textAlign: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 17,
        marginLeft: 3,
        fontWeight: '600',
    },
    plusIcon: {
        fontSize: 22,
    },
    studentElements: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
    },
    infoStudent: {
        width: '72%',
        marginRight: 10,
    },
    rowInfo: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 5,
    },
    label: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        width: 70,
        marginRight: 5,
    },
    infoValue: {
        color: 'black',
        fontSize: 16,
        width: 180,
    },
    actionButton: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
    },
    editButton: {
        backgroundColor: 'green',
        paddingHorizontal: 20,
        paddingTop: 8,
        borderRadius: 16,
        textAlign: 'center',
        height: 40,
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingTop: 8,
        borderRadius: 16,
        textAlign: 'center',
        height: 40,
    },
    actionText: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default ListStudentScreen;
