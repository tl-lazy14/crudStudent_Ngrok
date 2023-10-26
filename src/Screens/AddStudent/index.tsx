import React, { useState } from 'react';
import { Alert, View, Text, Keyboard, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '../../Routes';
import axios from 'axios';

const AddStudentScreen = () => {

    const navigation = useNavigation<ScreenNavigationProp>();

    const [newStudent, setNewStudent] = useState({
        name: '',
        addr: '',
        studentClass: '',
        gpa: '',
    });

    const handleInputChange = (fieldName: string, value: string) => {
        setNewStudent((prevStudent) => ({
          ...prevStudent,
          [fieldName]: value,
        }));
    };

    const handleAddStudent = async () => {
        if (newStudent.name.trim() === '' || newStudent.addr.trim() === '' || newStudent.studentClass.trim() === '' || newStudent.gpa.trim() === '') {
            Alert.alert('Please fill out all information fields');
            return;
        }
        try {
            await axios.post('https://33d0-171-254-9-139.ngrok-free.app/api/students', newStudent); // url using ngrok
        } catch (err) {
            console.log(err);
        }
        navigation.navigate('ListStudent');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    label="Name"
                    placeholder="Name"
                    value={newStudent.name}
                    onChangeText={text => handleInputChange('name', text)}
                />
                <TextInput
                    style={styles.input}
                    label="Address"
                    placeholder="Address"
                    value={newStudent.addr}
                    onChangeText={text => handleInputChange('addr', text)}
                />
                <TextInput
                    style={styles.input}
                    label="Class"
                    placeholder="Class"
                    value={newStudent.studentClass}
                    onChangeText={text => handleInputChange('studentClass', text)}
                />
                <TextInput
                    style={styles.input}
                    label="GPA"
                    placeholder="GPA"
                    value={newStudent.gpa}
                    onChangeText={text => handleInputChange('gpa', text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleAddStudent}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#e1e2eb',
    },
    input: {
        width: '100%',
        marginTop: 50,
        backgroundColor: 'white',
        fontSize: 20,
        paddingBottom: 5,
        borderRadius: 5,
    },
    button: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191778',
        width: 150,
        padding: 10,
        borderRadius: 16,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 20,
    },
});

export default AddStudentScreen;
