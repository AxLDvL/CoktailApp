
import * as React from 'react';
import {Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./view/Home";
import DetailsScreen from "./view/Detail";


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{
                    title: 'Coktails',
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    },
                }}
                />
                <Stack.Screen name="Details" component={DetailsScreen} options={{
                    headerStyle: {
                        backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    },
                    headerRight: () => (
                        <Button
                            onPress={() => alert('This is a button!')}
                            title="Info"
                            color='#f4511e'
                        />
                    ),
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

/*
function StackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'My home' }}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ route }) => ({ title: route.params.name })}
            />
        </Stack.Navigator>
    );
}*/
