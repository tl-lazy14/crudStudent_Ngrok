import React from 'react';
import type { RouteProp } from '@react-navigation/native';
import {
    NativeStackNavigationProp,
    createNativeStackNavigator,
} from '@react-navigation/native-stack';
import ListStudentScreen from '../Screens/ListStudent';
import AddStudentScreen from '../Screens/AddStudent';
import UpdateInfoStudentScreen from '../Screens/UpdateInfoStudent';

export type studentInfo = {
    idPrimary:  number,
    name?: string | undefined,
    addr?: string | undefined,
    studentClass?: string | undefined,
    gpa?: string | undefined,
}

export type RootStackParamList = {
    ListStudent: undefined;
    AddStudent: undefined;
    UpdateInfoStudent: studentInfo;
};

export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export type ScreenUpdateStudentInfoProp = RouteProp<RootStackParamList, 'UpdateInfoStudent'>;

const MyStack = () => {
  return (
    <Stack.Navigator
        initialRouteName="ListStudent"
    >
        <Stack.Group
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#191778',
                },
                headerTintColor: 'white',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 22,
                },
            }}
        >
            <Stack.Screen name="ListStudent" component={ListStudentScreen} options={{ title: 'List of students' } } />
            <Stack.Screen name="AddStudent" component={AddStudentScreen} options={{ title: 'Add new student' }} />
            <Stack.Screen name="UpdateInfoStudent" component={UpdateInfoStudentScreen} options={{ title: 'Update student information' }} />
        </Stack.Group>
    </Stack.Navigator>
  );
};

export default MyStack;
