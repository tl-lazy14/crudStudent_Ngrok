import React, { useState } from 'react';
import { Alert, View, Text, Keyboard, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScreenNavigationProp, ScreenUpdateStudentInfoProp } from '../../Routes';
import axios from 'axios';

const UpdateInfoStudentScreen = () => {

    const navigation = useNavigation<ScreenNavigationProp>();
    const route = useRoute<ScreenUpdateStudentInfoProp>();

    const [infoStudent, setInfoStudent] = useState({
        name: route.params.name,
        addr: route.params.addr,
        studentClass: route.params.studentClass,
        gpa: route.params.gpa,
    });

    const handleInputChange = (fieldName: string, value: string) => {
        setInfoStudent((prev) => ({
          ...prev,
          [fieldName]: value,
        }));
    };

    const handleEditStudent = async () => {
        if (infoStudent.name?.trim() === '' || infoStudent.addr?.trim() === '' || infoStudent.studentClass?.trim() === '' || infoStudent.gpa?.trim() === '') {
            Alert.alert('Please fill out all information fields');
            return;
        }
        try {
            await axios.put(`https://33d0-171-254-9-139.ngrok-free.app/api/students/${route.params.idPrimary.toString()}`, infoStudent); // url using ngrok
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
                    value={infoStudent.name}
                    onChangeText={text => handleInputChange('name', text)}
                />
                <TextInput
                    style={styles.input}
                    label="Address"
                    placeholder="Address"
                    value={infoStudent.addr}
                    onChangeText={text => handleInputChange('addr', text)}
                />
                <TextInput
                    style={styles.input}
                    label="Class"
                    placeholder="Class"
                    value={infoStudent.studentClass}
                    onChangeText={text => handleInputChange('studentClass', text)}
                />
                <TextInput
                    style={styles.input}
                    label="GPA"
                    placeholder="GPA"
                    value={infoStudent.gpa}
                    onChangeText={text => handleInputChange('gpa', text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleEditStudent}>
                    <Text style={styles.buttonText}>Update</Text>
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

export default UpdateInfoStudentScreen;
